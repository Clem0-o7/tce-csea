import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from '@/db/db';
import { adminUsers } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          if (!credentials?.username || !credentials?.password) {
            console.error('Missing credentials');
            throw new Error('Missing credentials');
          }

          console.log('Checking user:', credentials.username);

          const users = await db
            .select()
            .from(adminUsers)
            .where(eq(adminUsers.username, credentials.username))
            .limit(1);

          if (users.length === 0) {
            console.error('User not found');
            throw new Error('Invalid credentials');
          }

          const user = users[0];

          if (!user || !user.hashedPassword) {
            console.error('User has no password set');
            throw new Error('Invalid credentials');
          }

          const isValid = await bcrypt.compare(credentials.password, user.hashedPassword);

          if (!isValid) {
            console.error('Invalid password');
            throw new Error('Invalid credentials');
          }

          // Update last login
          await db
            .update(adminUsers)
            .set({ lastLogin: new Date() })
            .where(eq(adminUsers.id, user.id));

          console.log('User authenticated:', user.username);

          return {
            id: user.id.toString(),
            username: user.username,
            role: user.role,
          };
        } catch (error) {
          console.error('Authorize error:', error);
          throw new Error('Authentication failed');
        }
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
    error: '/admin/login', // Redirect errors to login page
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.username = token.username;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'production', // Enable debug logs in production
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 1 day
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const authHandler = NextAuth(authOptions);

export default async function handler(req, res) {
  try {
    if (!process.env.NEXTAUTH_SECRET) {
      console.error('NEXTAUTH_SECRET is missing in production');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    console.log(`Auth request: ${req.method} ${req.url}`);

    await authHandler(req, res);
  } catch (error) {
    console.error('NextAuth Error:', error);

    // Ensure the response is always JSON
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal authentication error' });
    }
  }
}

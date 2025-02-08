// pages/api/auth/[...nextauth].js
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
            return null;
          }

          const users = await db
            .select()
            .from(adminUsers)
            .where(eq(adminUsers.username, credentials.username))
            .limit(1);

          const user = users[0];

          if (!user || !user.hashedPassword) {
            console.error('User not found or missing password');
            return null;
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            user.hashedPassword
          );

          if (!isValid) {
            console.error('Invalid password');
            return null;
          }

          // Update last login
          await db
            .update(adminUsers)
            .set({ lastLogin: new Date() })
            .where(eq(adminUsers.id, user.id));

          return {
            id: user.id.toString(),
            username: user.username,
            role: user.role,
            email: user.email || `${user.username}@example.com`, // Default email
            name: user.username || 'Admin User', // Default name
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.username = user.username;
        token.email = user.email || `${user.username}@example.com`; // Ensure email
        token.name = user.name || user.username || 'Admin User'; // Ensure name
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const authHandler = NextAuth(authOptions);

export default async function handler(req, res) {
  try {
    await authHandler(req, res);
  } catch (error) {
    console.error('NextAuth Error:', error);
    res.status(500).json({ error: 'Internal authentication error' });
  }
};

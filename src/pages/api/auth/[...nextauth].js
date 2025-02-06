//@/pages/api/auth/[...nextauth].js

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
      async authorize(credentials) {
        try {
          if (!credentials?.username || !credentials?.password) {
            throw new Error('Please enter username and password');
          }

          // Find the user
          const users = await db
            .select()
            .from(adminUsers)
            .where(eq(adminUsers.username, credentials.username))
            .limit(1);

          const user = users[0];

          if (!user || !user.hashedPassword) {
            console.log('No user found or no password hash');
            throw new Error('Invalid credentials');
          }

          // Compare passwords
          const isValid = await bcrypt.compare(credentials.password, user.hashedPassword);

          if (!isValid) {
            console.log('Invalid password');
            throw new Error('Invalid credentials');
          }

          // Update last login
          await db
            .update(adminUsers)
            .set({ lastLogin: new Date() })
            .where(eq(adminUsers.id, user.id));

          return {
            id: user.id,
            username: user.username,
            role: user.role,
          };
        } catch (error) {
          console.error('Auth error:', error);
          throw error;
        }
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.username = token.username;
      }
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: `${process.env.NODE_ENV === 'production' ? '__Secure-' : ''}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        domain: process.env.NODE_ENV === 'production' ? '.vercel.app' : undefined
      }
    }
  },
  // Add these for better security
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
};

export default NextAuth(authOptions);

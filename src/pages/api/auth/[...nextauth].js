import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;

        // Replace this with your admin validation logic
        if (
          email === process.env.ADMIN_EMAIL &&
          password === process.env.ADMIN_PASSWORD
        ) {
          return { id: 1, name: 'Admin', email };
        }
        return null; // Return null if authentication fails
      },
    }),
  ],
  pages: {
    signIn: '/admin/login', // Custom login page
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      // Attach user ID or role to the session if needed
      session.user.id = token.sub;
      return session;
    },
  },
});

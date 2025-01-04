import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/db/db";
import { users } from "@/db/schema";
import { compare } from "bcrypt";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        // Fetch user
        const user = await db
          .select()
          .from(users)
          .where(users.email.equals(email))
          .execute();

        if (!user.length || !(await compare(password, user[0].passwordHash))) {
          throw new Error("Invalid email or password");
        }

        return { id: user[0].id, email: user[0].email };
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
});

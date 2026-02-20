import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials) return null;

        if (
          credentials.email === "admin@legacy.com" &&
          credentials.password === "admin123"
        ) {
          return {
            id: "1",
            email: credentials.email,
            role: "admin",
          };
        }

        if (
          credentials.email === "mentor@legacy.com" &&
          credentials.password === "mentor123"
        ) {
          return {
            id: "2",
            email: credentials.email,
            role: "mentor",
          };
        }

        return null;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

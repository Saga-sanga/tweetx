import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials?.email));

        console.log({ user, credentials });

        const isEqual = await compare(
          credentials?.password ?? "",
          user.password
        );

        if (isEqual) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          } satisfies User;
        }
        return null;
      },
    }),
  ],
};

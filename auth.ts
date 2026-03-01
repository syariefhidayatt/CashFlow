import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import NextAuth from "next-auth";
import { prisma } from "./lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    GitHub,
    Credentials({
      credentials: {
        email: { label: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });
        if (!user) return null;
        if (!user.password) return null;
        const isPasswordMatch = await bcrypt.compare(
          credentials.password as string,
          user.password,
        );
        if (!isPasswordMatch) return null;
        return { id: user.id.toString(), email: user.email, name: user.name };
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
});

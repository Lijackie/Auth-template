import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from '../../../lib/prisma';
import { compare } from "bcryptjs";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
        async authorize(credentials, req) {
            const user = await prisma.user.findUnique({
                where: {
                    email: credentials.email
                }
            })

            if (!user) {
                throw new Error('信箱未註冊');
            }

            const isValid = await compare(credentials.password, user.password);

            if (!isValid) {
                throw new Error('密碼錯誤');
            }

            return { email: user.email };
        }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});

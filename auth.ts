import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GitHub from 'next-auth/providers/github';
import prisma from '@/lib/prisma';
// import authConfig from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: 'jwt',
	},
	providers: [
		GitHub({
			clientId: process.env.AUTH_GITHUB_ID,
			clientSecret: process.env.AUTH_GITHUB_SECRET,
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		async session({ token, session }) {
			if (session.user) {
				session.user.id = token.id as string;
				session.user.name = token.name as string;
			}
			return session;
		},
	},
});

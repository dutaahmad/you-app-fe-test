import { env } from "@/env";
import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import * as jose from 'jose';

interface LoginResponse {
    message: string;
    access_token: string;
}

// 2. Define the User object you'll work with in NextAuth
interface AppUser extends User {
    accessToken: string;
    expiration: number;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                username: {},
                password: {}
            },
            async authorize(credentials) {
                const loginRequestBody = JSON.stringify({
                    email: credentials.email,
                    username: credentials.username,
                    password: credentials.password
                });
                const loginFetch = await fetch(env.NEXT_PUBLIC_YOU_APP_API_URL + '/login', {
                    method: 'POST',
                    body: loginRequestBody,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const loginResponse = await loginFetch.json() as LoginResponse;

                console.log(loginResponse);

                if (!loginFetch.ok) throw new Error(loginResponse.message);

                const decodedToken = jose.decodeJwt(loginResponse.access_token) as {
                    iat: number;
                    exp: number;
                    id: string;
                    email: string;
                    username: string;
                };

                console.log({ decodedToken });

                // return user object with their profile data
                return {
                    id: decodedToken.id,
                    email: decodedToken.email,
                    username: decodedToken.username,
                    accessToken: loginResponse.access_token,
                    expiration: decodedToken.exp
                } as AppUser;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            console.log({
                message: "auth.js - jwt",
                token,
                user,
                account
            });

            // Initial signin contains a 'User' object from authorize method
            if (user && account) {
                console.debug("Initial signin");
                return { ...token, data: user };
            }

            // The current access token is still valid
            // @ts-expect-error token.data is considered unknown
            if (Date.now() < token.data.expiration * 1000) {
                console.debug("Access token is still valid");
                return token;
            }

            // The current access token and refresh token have both expired
            // This should not really happen unless you get really unlucky with
            // the timing of the token expiration because the middleware should
            // have caught this case before the callback is called
            console.debug("Both tokens have expired");
            return { ...token, error: "RefreshTokenExpired" } as JWT;
        },

        async session({ session, token }) {
            // @ts-expect-error token.data is considered unknown
            session.user = token.data;
            // @ts-expect-error token.data is considered unknown
            const tokenExpire = token.data.expiration as number;
            // @ts-expect-error session.expires cannot accept Date, must be Date & string
            session.expires = new Date(tokenExpire * 1000);
            console.log({ message: "auth.js - session", session });
            return session;
        }
    }
});
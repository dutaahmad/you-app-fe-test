import { env } from "@/env";
import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import * as jose from 'jose';

interface LoginResponse {
    message: string;
    access_token: string;
}

// 2. Define the User object you'll work with in NextAuth
interface AppUser extends User {
    accessToken: string;
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

                // return user object with their profile data
                return {
                    id: decodedToken.id,
                    email: decodedToken.email,
                    username: decodedToken.username,
                    accessToken: loginResponse.access_token,
                } as AppUser;
            }
        })
    ],
});
"use server";

import { env } from "@/env";
import { signIn } from "@/lib/auth";
import { LoginFormInterface, RegisterFormInterface, RegisterResponseInterface } from "@/zod/auth-schemas";

export async function loginAction(data: LoginFormInterface) {
    try {
        await signIn("credentials", {...data, redirect: false});
        return { message: "Login Successful", status: true };
    } catch (error) {
        console.error({
            message: "Login Failed",
            error
        });
        return { message: "Login Failed", status: false };
    }
}

export async function registerAction(params: RegisterFormInterface) {
    let error: Error | null = null;
    let data: RegisterResponseInterface | null = null;
    try {
        const registerRequest = await fetch(env.NEXT_PUBLIC_YOU_APP_API_URL + '/register', {
            method: 'POST',
            body: JSON.stringify(params)
        });
        data = await registerRequest.json() as RegisterResponseInterface;
        error = null;
        return {
            data,
            error
        };
    } catch (error) {
        error = error as Error;
        return {
            data: null,
            error
        };
    }
}
"use server";

import { ApiPaths, HttpMethods, InternalApiPaths } from "@/lib/generic-types";
import { youAppFetch } from "@/lib/utils";
import { getSession } from "./auth-actions";
import { GetProfileResponseData, UpdateAndCreateProfileRequestData, UpdateProfileResponseData } from "@/zod/profile-schemas";
import { env } from "@/env";

export async function getProfile() {
    const session = await getSession();
    const token = session.user.accessToken;
    return await youAppFetch<GetProfileResponseData>({
        method: HttpMethods.GET,
        path: ApiPaths.GET_PROFILE,
        token
    });
}

export async function updateProfile(data: UpdateAndCreateProfileRequestData) {
    const session = await getSession();
    const token = session.user.accessToken;
    return await youAppFetch<UpdateProfileResponseData>({
        method: HttpMethods.PUT,
        path: ApiPaths.UPDATE_PROFILE,
        token,
        data
    });
}

export async function uploadProfilePicture(file: File) {
    const url = env.NEXT_PUBLIC_INTERNAL_APP_API_URL + "/" + InternalApiPaths.PROFILE_PICTURE;
    const data = await fetch(url, {
        method: HttpMethods.POST,
        body: file,
        credentials: 'include'
    });

    return await data.json();
}

export async function getProfilePicture() {
    const url = env.NEXT_PUBLIC_INTERNAL_APP_API_URL + "/" + InternalApiPaths.PROFILE_PICTURE;
    const data = await fetch(url, {
        method: HttpMethods.GET,
        credentials: 'include'
    });

    return await data.json();
}
"use server";

import { ApiPaths, HttpMethods } from "@/lib/generic-types";
import { youAppFetch } from "@/lib/utils";
import { getSession } from "./auth-actions";
import { GetProfileResponseData, UpdateAndCreateProfileRequestData, UpdateProfileResponseData } from "@/zod/profile-schemas";

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
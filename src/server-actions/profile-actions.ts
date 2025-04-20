"use server";

import { ApiPaths, HttpMethods } from "@/lib/generic-types";
import { youAppFetch } from "@/lib/utils";
import { getSession } from "./auth-actions";
import { GetProfileResponseData } from "@/zod/profile-schemas";

export async function getProfile() {
    const session = await getSession();
    const token = session.user.accessToken;
    return await youAppFetch<GetProfileResponseData>({
        method: HttpMethods.GET,
        path: ApiPaths.GET_PROFILE,
        token
    });
}
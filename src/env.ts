import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        AUTH_SECRET: z.string(),
    },
    client: {
        NEXT_PUBLIC_YOU_APP_API_URL: z.string().url(),
        NEXT_PUBLIC_INTERNAL_APP_API_URL: z.string().url(),
    },
    runtimeEnv: {
        NEXT_PUBLIC_YOU_APP_API_URL: process.env.NEXT_PUBLIC_YOU_APP_API_URL,
        NEXT_PUBLIC_INTERNAL_APP_API_URL: process.env.NEXT_PUBLIC_INTERNAL_APP_API_URL,
        AUTH_SECRET: process.env.AUTH_SECRET
    }
});
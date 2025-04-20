import { type MiddlewareConfig } from "next/server";

export { auth as middleware } from "@/lib/auth";

export const config: MiddlewareConfig = {
    /**
     * Middleware will affect all request except:
     * - _next/static
     * - _next/image
     * - favicon.ico
     * - common image files
     * - /
     * - /login
     * - /register
     */
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|^$|^login$|^register$).*)',
    ],
};
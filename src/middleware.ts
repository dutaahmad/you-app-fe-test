import { type MiddlewareConfig } from "next/server";

export { auth as middleware } from "@/lib/auth";

export const config: MiddlewareConfig = {
    /**
     * Middleware will affect all request except:
    */
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
        '/login',
        '/register',
        '/api'
    ],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    const isAdminPage = pathname === "/admin";
    const isAdminSubPage = pathname.startsWith("/admin/");
    const isLoginPage = pathname === "/admin/login";

    const token = req.cookies.get("admin_token")?.value;
    const authed = !!token;

    if ((isAdminPage || isAdminSubPage) && !isLoginPage && !authed) {
        const url = req.nextUrl.clone();
        url.pathname = "/admin/login";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*", "/admin"] };




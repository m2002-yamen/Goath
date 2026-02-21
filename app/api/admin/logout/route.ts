

import { NextResponse } from "next/server";

function clearCookie() {
    const res = NextResponse.json({ ok: true });
    res.cookies.set("admin_token", "", { path: "/", maxAge: 0 });
    return res;
}

export async function POST() {
    return clearCookie();
}

export async function GET() {
    return clearCookie();
}

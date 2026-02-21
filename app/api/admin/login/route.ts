

import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { password } = await req.json();

    if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_TOKEN) {
        return NextResponse.json({ error: "Admin env not set" }, { status: 500 });
    }

    if (password !== process.env.ADMIN_PASSWORD) {
        return NextResponse.json({ error: "كلمة المرور غير صحيحة" }, { status: 401 });
    }

    const res = NextResponse.json({ ok: true });
    res.cookies.set({
        name: "admin_token",
        value: process.env.ADMIN_TOKEN!,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
    });

   

    return res;
}

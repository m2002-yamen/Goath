

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    const cookie = req.headers.get("cookie") || "";
    const token = cookie
        .split(";")
        .map((c) => c.trim())
        .find((c) => c.startsWith("admin_token="))
        ?.split("=")[1];

    if (!token || token !== process.env.ADMIN_TOKEN) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const regs = await prisma.registration.findMany({
        orderBy: { createdAt: "desc" },
        take: 200,
    });

    return NextResponse.json({ regs });
}



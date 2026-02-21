

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
    req: Request,
    ctx: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await ctx.params;

        await prisma.registration.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json(
            { error: "Failed to delete", details: error?.message },
            { status: 500 }
        );
    }
}
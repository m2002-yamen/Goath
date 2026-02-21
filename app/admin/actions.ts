

"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteRegistration(formData: FormData) {
    const id = String(formData.get("id") || "");
    if (!id) return;

    await prisma.registration.delete({ where: { id } });

    revalidatePath("/admin");
}


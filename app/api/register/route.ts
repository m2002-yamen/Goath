

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const arabicFieldName: Record<string, string> = {
    nationalId: "رقم الهوية",
    firstName: "الاسم الأول",
    fatherName: "اسم الأب",
    grandfatherName: "اسم الجد",
    familyName: "اسم العائلة",
    gender: "الجنس",
    dobISO: "تاريخ الميلاد",
    phonePrimary: "رقم الهاتف الأساسي",
    paymentMethod: "طريقة استلام المساعدة",
    paymentIdentifier: "رقم الحساب/المحفظة",
};

function requiredMsg(key: string) {
    return `${arabicFieldName[key] ?? key} مطلوب`;
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // تنظيف بسيط
        const nationalId = String(body?.nationalId ?? "").replace(/\D/g, "").slice(0, 9);
        const phonePrimary = String(body?.phonePrimary ?? "").replace(/\D/g, "").slice(0, 10);

        // المطلوب
        const required = [
            "nationalId",
            "firstName",
            "fatherName",
            "grandfatherName",
            "familyName",
            "gender",
            "dobISO",
            "phonePrimary",
        ];

        for (const key of required) {
            const v = body?.[key];
            if (!v || String(v).trim() === "") {
                return NextResponse.json({ error: requiredMsg(key) }, { status: 400 });
            }
        }

        // تحقق طول الهوية/الهاتف
        if (nationalId.length !== 9) {
            return NextResponse.json({ error: "رقم الهوية يجب أن يكون 9 أرقام" }, { status: 400 });
        }
        if (phonePrimary.length !== 10) {
            return NextResponse.json({ error: "رقم الهاتف يجب أن يكون 10 أرقام" }, { status: 400 });
        }

        // منع التكرار (بالهوية أو الهاتف)
        const existing = await prisma.registration.findFirst({
            where: {
                OR: [{ nationalId }, { phonePrimary }],
            },
            select: { id: true },
        });

        if (existing) {
            return NextResponse.json(
                { error: "تم تسجيل طلب سابقًا بنفس رقم الهوية أو رقم الهاتف", id: existing.id },
                { status: 409 }
            );
        }

        // إنشاء الطلب
        const created = await prisma.registration.create({
            data: {
                nationalId,
                firstName: String(body.firstName ?? "").trim(),
                fatherName: String(body.fatherName ?? "").trim(),
                grandfatherName: String(body.grandfatherName ?? "").trim(),
                familyName: String(body.familyName ?? "").trim(),
                gender: String(body.gender ?? "").trim(),
                dobISO: String(body.dobISO ?? "").trim(),
                age:
                    body.age !== undefined && body.age !== null && body.age !== ""
                        ? Number(body.age)
                        : null,

                phonePrimary,
                phoneAlternative: body.phoneAlternative
                    ? String(body.phoneAlternative).replace(/\D/g, "").slice(0, 10)
                    : null,

                paymentMethod: body.paymentMethod ?? null,
                paymentIdentifier: body.paymentIdentifier ? String(body.paymentIdentifier).trim() : null,

                breadwinnerJob: body.breadwinnerJob ? String(body.breadwinnerJob) : null,
                housingStatus: body.housingStatus ? String(body.housingStatus) : null,

                priorityNeedsJson: body.priorityNeedsJson ?? null,
                otherNeeds: body.otherNeeds ?? null,

                wifeId: body.wifeId ? String(body.wifeId).replace(/\D/g, "").slice(0, 9) : null,
                wifeName: body.wifeName ?? null,
                wifeDobISO: body.wifeDobISO ?? null,

                governorate: body.governorate ?? null,
                region: body.region ?? null,
                neighborhood: body.neighborhood ?? null,
                residenceType: body.residenceType ?? null,
            },
            select: { id: true },
        });

        // ✅ نرجع فقط id و ok (عشان صفحة success)
        return NextResponse.json({ ok: true, id: created.id }, { status: 201 });
    } catch (error: any) {
        console.error("REGISTER ERROR:", error);

        return NextResponse.json(
            process.env.NODE_ENV === "production"
                ? { error: "حدث خطأ أثناء حفظ البيانات" }
                : { error: "حدث خطأ أثناء حفظ البيانات", details: String(error?.message || error) },
            { status: 500 }
        );
    }
}


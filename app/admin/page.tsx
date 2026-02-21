

// app/admin/page.tsx

import { prisma } from "@/lib/prisma";
import AdminTable from "./AdminTable";
import AutoLogout from "./AutoLogout";




export const dynamic = "force-dynamic"; // اختياري: يمنع الكاش ويخلي البيانات دايمًا محدثة

export default async function AdminPage() {
    const regs = await prisma.registration.findMany({
        orderBy: { createdAt: "desc" },
    });


    return (
        <main className="min-h-screen bg-white px-4 py-6">
            <AutoLogout />
            {/* العنوان فوق طبيعي */}
            <div className="mx-auto w-full max-w-6xl">
                <h1 className="text-3xl font-extrabold text-gray-900 text-center">
                    لوحة الأمن
                </h1>

                <p className="mt-2 text-center text-sm font-bold text-black">
                    عدد الطلبات: {regs.length}
                </p>

                {/* خلي الجدول يبدأ مباشرة */}
                <div className="mt-4">
                    <AdminTable regs={regs as any} />
                </div>
            </div>
        </main>
    );


    
}






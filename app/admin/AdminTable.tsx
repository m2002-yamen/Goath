

"use client";

import { useMemo, useState, useEffect } from "react";
import { deleteRegistration } from "./actions";

type Reg = {
    id: string;
    createdAt: Date | string;
    nationalId: string;
    firstName: string;
    fatherName: string;
    grandfatherName: string;
    familyName: string;
    gender: string;
    age: number | null;
    phonePrimary: string;
    priorityNeedsJson: string | null;
    paymentMethod: string | null;
    paymentIdentifier: string | null;
    wifeId?: string | null;
    wifeName?: string | null;
    wifeDobISO?: string | null;

    governorate?: string | null;
    region?: string | null;
    neighborhood?: string | null;
    residenceType?: string | null;

    breadwinnerJob?: string | null;
    housingStatus?: string | null;
};

function formatPriorities(jsonStr?: string | null) {
    if (!jsonStr) return "—";
    try {
        const arr = JSON.parse(jsonStr);

        if (Array.isArray(arr) && arr.length && typeof arr[0] === "string") {
            return arr.join("، ");
        }

        if (Array.isArray(arr) && arr.length && typeof arr[0] === "object") {
            return (
                arr
                    .map((x: any) => x?.label || x?.name || x?.value)
                    .filter(Boolean)
                    .join("، ") || "—"
            );
        }

        return "—";
    } catch {
        return "—";
    }
}

function formatPaymentLabel(method?: string | null) {
    if (!method) return "—";
    if (method === "bank") return "حساب بنكي";
    if (method === "wallet") return "محفظة";
    return method;
}

function ClientDate({ value }: { value: Date | string }) {
    const d = new Date(value as any);
    return (
        <span suppressHydrationWarning>
            {d.toLocaleString("ar")}
        </span>
    );
}


export default function AdminTable({ regs }: { regs: Reg[] }) {
    const [q, setQ] = useState("");
    const [data, setData] = useState<Reg[]>(regs);

    useEffect(() => {
        let alive = true;

        const tick = async () => {
            if (document.visibilityState !== "visible") return;

            try {
                const res = await fetch("/api/admin/registrations", { cache: "no-store" });
                if (!res.ok) return;
                const json = await res.json();
                if (!alive) return;
                setData(json.regs ?? []);
            } catch { }
        };

        tick(); // أول مرة فورًا
        const id = setInterval(tick, 5000); // كل 5 ثواني

        return () => {
            alive = false;
            clearInterval(id);
        };
    }, []);

    const filtered = useMemo(() => {
        const query = q.trim().toLowerCase();
        if (!query) return data;

        return data.filter((r) => {
            const fullName =
                `${r.firstName} ${r.fatherName} ${r.grandfatherName} ${r.familyName}`.toLowerCase();
            const nationalId = String(r.nationalId || "").toLowerCase();
            const phone = String(r.phonePrimary || "").toLowerCase();
            return (
                fullName.includes(query) || nationalId.includes(query) || phone.includes(query)
            );
        });
    }, [q, data]);

    return (
        <>
            <div className="mt-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="ابحث برقم الهوية / الاسم / الهاتف"
                    className="w-full md:w-96 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-gray-500 outline-none focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                    dir="rtl"                />
                <div className="text-sm font-bold text-gray-900">
                    النتائج: {filtered.length} / {data.length}
                </div>

            </div>

            <div className="mt-4 overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
                <table className="min-w-[1100px] w-full text-center" dir="rtl">
                    <thead className="bg-gray-100 border-b border-gray-200">
                        <tr className="text-sm font-bold text-gray-900">
                            <th className="px-4 py-3 whitespace-nowrap">التاريخ</th>
                            <th className="px-4 py-3 whitespace-nowrap">رقم الهوية</th>
                            <th className="px-4 py-3 whitespace-nowrap">الاسم الرباعي</th>
                            <th className="px-4 py-3 whitespace-nowrap">الجنس</th>
                            <th className="px-4 py-3 whitespace-nowrap">العمر</th>
                            <th className="px-4 py-3 whitespace-nowrap">رقم الهاتف</th>
                            <th className="px-4 py-3 whitespace-nowrap">أولوية احتياجات الأسرة</th>
                            <th className="px-4 py-3 whitespace-nowrap">طريقة الاستلام</th>
                            <th className="px-4 py-3 whitespace-nowrap">رقم المحفظة / الحساب</th>
                            <th className="px-4 py-3 whitespace-nowrap">اسم الزوجة</th>
                            <th className="px-4 py-3 whitespace-nowrap">المحافظة</th>
                            <th className="px-4 py-3 whitespace-nowrap">المنطقة</th>
                            <th className="px-4 py-3 whitespace-nowrap">مكان الإقامة</th>
                            <th className="px-4 py-3 whitespace-nowrap">معيل الأسرة</th>
                            <th className="px-4 py-3 whitespace-nowrap">حالة المسكن</th>
                            <th className="px-4 py-3 whitespace-nowrap">إجراء</th>
                            
                        </tr>
                    </thead>

                    <tbody>
                        {filtered.map((r) => (
                            <tr
                                key={r.id}
                                className="border-t text-sm text-gray-900 hover:bg-gray-50 transition"
                            >
                                <td className="px-4 py-3 whitespace-nowrap">
                                    <ClientDate value={r.createdAt} />
                                </td>

                                <td className="px-4 py-3 whitespace-nowrap">{r.nationalId}</td>

                                <td className="px-4 py-3 whitespace-nowrap">
                                    {r.firstName} {r.fatherName} {r.grandfatherName} {r.familyName}
                                </td>

                                <td className="px-4 py-3 whitespace-nowrap">{r.gender}</td>

                                <td className="px-4 py-3 whitespace-nowrap">{r.age ?? "—"}</td>

                                <td className="px-4 py-3 whitespace-nowrap">{r.phonePrimary}</td>

                                <td className="px-4 py-3 whitespace-nowrap">
                                    {formatPriorities(r.priorityNeedsJson)}
                                </td>

                                <td className="px-4 py-3 whitespace-nowrap">
                                    {formatPaymentLabel(r.paymentMethod)}
                                </td>

                              

                                <td className="px-4 py-3 whitespace-nowrap max-w-[220px] truncate">
                                    {r.paymentIdentifier ?? "—"}
                                </td>

                                <td className="px-4 py-3 whitespace-nowrap">{r.wifeName ?? "—"}</td>
                                <td className="px-4 py-3 whitespace-nowrap">{r.governorate ?? "—"}</td>
                                <td className="px-4 py-3 whitespace-nowrap">{r.region ?? "—"}</td>
                                <td className="px-4 py-3 whitespace-nowrap">{r.residenceType ?? "—"}</td>
                                <td className="px-4 py-3 whitespace-nowrap">{r.breadwinnerJob ?? "—"}</td>
                                <td className="px-4 py-3 whitespace-nowrap">{r.housingStatus ?? "—"}</td>

                                <td className="px-4 py-3 whitespace-nowrap">
                                    <form action={deleteRegistration}>
                                        <input type="hidden" name="id" value={r.id} />
                                        <button
                                            type="submit"
                                            style={{ color: "#dc2626", fontWeight: 700 }}
                                            className="text-sm hover:underline cursor-pointer"
                                        >
                                            حذف
                                        </button>

                                    </form>
                                </td>
                            </tr>
                        ))}

                        {filtered.length === 0 && (
                            <tr>
                                <td className="p-6 text-center text-gray-700" colSpan={10}>
                                    لا يوجد بيانات مطابقة للبحث
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}


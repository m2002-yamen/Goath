

"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


import { useState } from "react";

export default function AdminLoginPage() {
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function onLogin(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setMsg(null);

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
                credentials: "include",
            });


            let data: any = null;
            try {
                data = await res.json();
            } catch {
                data = null;
            }

            if (!res.ok) {
                setMsg(data?.error || `فشل تسجيل الدخول (status ${res.status})`);
                return;
            }

            window.location.assign("/admin");
        } catch (err: any) {
            setMsg("تعذر الاتصال بالسيرفر");
        } finally {
            setLoading(false);
        }
    }



    return (
        <main className="min-h-screen bg-white px-4 py-10">
            <div className="mx-auto w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h1 className="text-2xl font-extrabold text-gray-900 text-center">دخول الأدمن</h1>

                <form onSubmit={onLogin} className="mt-6 space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-900">كلمة المرور</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none focus:border-gray-400"
                            placeholder="أدخل كلمة المرور"
                            required
                        />
                    </div>

                    {msg && <div className="text-sm text-red-600">{msg}</div>}

                    <button
                        disabled={loading}
                        className="w-full rounded-xl bg-gray-900 px-5 py-3 text-white font-semibold hover:bg-gray-800 transition disabled:opacity-60"
                    >
                        {loading ? "جاري الدخول..." : "دخول"}
                    </button>
                </form>
            </div>
        </main>
    );
}



export default function RegisterSuccessPage({
    searchParams,
}: {
    searchParams: { id?: string };
}) {
    const id = searchParams?.id;

    return (
        <main className="min-h-screen bg-white px-4 py-10">
            <div className="mx-auto w-full max-w-lg rounded-2xl border border-gray-100 bg-white p-8 shadow-sm text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <span className="text-3xl">✅</span>
                </div>

                <h1 className="text-2xl font-extrabold text-gray-900">
                    تم تسجيل طلبك بنجاح
                </h1>

                <p className="mt-2 text-sm text-gray-600">
                    شكرًا لك. سيتم مراجعة الطلب والتواصل معك عند الحاجة.
                </p>

                {id ? (
                    <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                        <div className="text-sm font-bold text-gray-900">رقم الطلب</div>
                        <div className="mt-1 text-lg font-extrabold text-gray-900">{id}</div>
                    </div>
                ) : null}

                <div className="mt-7 flex flex-col gap-3">
                    <a
                        href="/register"
                        className="w-full rounded-xl bg-gray-900 px-5 py-3 text-white font-semibold hover:bg-gray-800 transition"
                    >
                        تسجيل طلب جديد
                    </a>

                
                </div>
            </div>
        </main>
    );
}
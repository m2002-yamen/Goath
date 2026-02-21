
"use client";



import { useMemo, useState } from "react";
import Select from "react-select";


function Field({
    id,
    label,
    required,
    placeholder,
    hint,
    type = "text",
    value,
    onChange,
    readOnly,
    inputMode,
    maxLength,
}: {
    id?: string;
    label: string;
    required?: boolean;
    placeholder?: string;
    hint?: string;
    type?: string;
    value?: string;
    onChange?: (v: string) => void;
    readOnly?: boolean;
    inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
    maxLength?: number;
}) {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900">
                {label} {required ? <span className="text-red-500">*</span> : null}
            </label>
            <input
                type={type}
                id={id}
                value={value ?? ""}
                onChange={(e) => onChange?.(e.target.value)}
                placeholder={placeholder}
                readOnly={readOnly}
                inputMode={inputMode}
                maxLength={maxLength}
                className={`w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200 ${readOnly ? "bg-gray-100" : "bg-white"
                    }`}
            />
            {hint ? <p className="text-sm text-gray-500">{hint}</p> : null}
        </div>
    );
}

function SelectField({
    label,
    required,
    hint,
    value,
    onChange,
    options,
}: {
    label: string;
    required?: boolean;
    hint?: string;
    value?: string;
    onChange?: (v: string) => void;
    options: { value: string; label: string }[];
}) {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900">
                {label} {required ? <span className="text-red-500">*</span> : null}
            </label>
            <select
                value={value ?? ""}
                onChange={(e) => onChange?.(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
            >
                <option value="" disabled>
                    اختر...
                </option>
                {options.map((o) => (
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                ))}
            </select>
            {hint ? <p className="text-sm text-gray-500">{hint}</p> : null}
        </div>
    );
}

function SearchableSelect({
    label,
    required,
    hint,
    value,
    onChange,
    options,
    placeholder = "Type to search",
}: {
    label: string;
    required?: boolean;
    hint?: string;
    value?: string;
    onChange?: (v: string) => void;
    options: { value: string; label: string }[];
    placeholder?: string;
}) {
    const selected = options.find((o) => o.value === value) ?? null;

    return (
        <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900">
                {label} {required ? <span className="text-red-500">*</span> : null}
            </label>

            <Select
                instanceId={label}
                isClearable
                isSearchable
                placeholder={placeholder}
                noOptionsMessage={() => "لا توجد نتائج"}
                value={selected}
                onChange={(opt) => onChange?.(opt ? (opt as any).value : "")}
                options={options}
                menuPortalTarget={typeof document !== "undefined" ? document.body : null}
                menuPosition="fixed"
                styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    control: (base, state) => ({
                        ...base,
                        minHeight: "52px",
                        borderRadius: "14px",
                        borderWidth: "2px",
                        borderColor: state.isFocused ? "#111827" : "#9ca3af",
                        boxShadow: state.isFocused
                            ? "0 0 0 3px rgba(17,24,39,0.15)"
                            : "none",
                        direction: "rtl",
                        backgroundColor: "#ffffff",
                        cursor: "text",
                        
                    }),
                    menu: (base) => ({
                        ...base,
                        direction: "rtl",
                        borderRadius: "12px",
                        border: "1px solid #d1d5db",
                        boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
                    }),
                    option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isFocused
                            ? "#f3f4f6"
                            : state.isSelected
                                ? "#e5e7eb"
                                : "#ffffff",
                        color: "#111827",
                        cursor: "pointer",
                    }),
                    input: (base) => ({ ...base, direction: "rtl" }),
                    placeholder: (base) => ({
                        ...base,
                        color: "#6b7280",
                        fontSize: "14px",
                    }),
                    singleValue: (base) => ({
                        ...base,
                        color: "#111827",
                        fontWeight: 500,
                    }),
                }}

                theme={(theme) => ({
                    ...theme,
                    borderRadius: 12,
                    colors: {
                        ...theme.colors,
                        primary: "#111827",
                        primary25: "#f3f4f6",
                    },
                })}
            />

            {hint ? <p className="text-sm text-gray-500">{hint}</p> : null}
        </div>
    );
}



function MultiSearchableSelect({
    label,
    required,
    hint,
    value,
    onChange,
    options,
    placeholder = "Type to search",
    maxSelected = 2,
}: {
    label: string;
    required?: boolean;
    hint?: string;
    value: { value: string; label: string }[];
    onChange: (v: { value: string; label: string }[]) => void;
    options: { value: string; label: string }[];
    placeholder?: string;
    maxSelected?: number;
}) {
    const canSelectMore = value.length < maxSelected;

    return (
        <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">
                {label} {required ? <span className="text-red-500">*</span> : null}
            </label>

            <Select
                menuPortalTarget={typeof document !== "undefined" ? document.body : null}
                menuPosition="fixed"
                instanceId={label}
                isClearable
                isSearchable
                isMulti
                closeMenuOnSelect={false}
                placeholder={placeholder}
                noOptionsMessage={() => "لا توجد نتائج"}
                value={value}
                options={options}
                isOptionDisabled={() => !canSelectMore}
                onChange={(opts) => onChange((opts as any) ?? [])}
                styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    control: (base, state) => ({
                        ...base,
                        minHeight: "52px",
                        borderRadius: "14px",
                        borderWidth: "2px",
                        borderColor: state.isFocused ? "#111827" : "#9ca3af",
                        boxShadow: state.isFocused
                            ? "0 0 0 3px rgba(17,24,39,0.15)"
                            : "none",
                        direction: "rtl",
                        backgroundColor: "#ffffff",
                    }),
                    menu: (base) => ({
                        ...base,
                        direction: "rtl",
                        borderRadius: "12px",
                        border: "1px solid #d1d5db",
                        boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
                    }),
                    option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isFocused
                            ? "#f3f4f6"
                            : state.isSelected
                                ? "#e5e7eb"
                                : "#ffffff",
                        color: "#111827",
                        cursor: "pointer",
                    }),
                    placeholder: (base) => ({
                        ...base,
                        color: "#6b7280",
                        fontSize: "14px",
                    }),
                    multiValue: (base) => ({
                        ...base,
                        borderRadius: "10px",
                        backgroundColor: "#f3f4f6",
                    }),
                    multiValueLabel: (base) => ({
                        ...base,
                        color: "#111827",
                        fontWeight: 600,
                    }),
                    multiValueRemove: (base) => ({
                        ...base,
                        cursor: "pointer",
                    }),
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 12,
                    colors: {
                        ...theme.colors,
                        primary: "#111827",
                        primary25: "#f3f4f6",
                    },
                })}
            />

            <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{hint ?? ""}</span>
                <span>
                    {value.length}/{maxSelected}
                </span>
            </div>
        </div>
    );
}




function CheckboxRow({
    label,
    checked,
    onChange,
}: {
    label: string;
    checked: boolean;
    onChange: (v: boolean) => void;
}) {
    return (
        <label className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 hover:bg-gray-50 cursor-pointer">
            <span className="text-gray-900">{label}</span>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="h-5 w-5 accent-gray-900"
            />
        </label>
    );
}



function NumberField({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900">{label}</label>
            <input
                inputMode="numeric"
                pattern="[0-9]*"
                value={value}
                onChange={(e) => onChange(e.target.value.replace(/[^\d]/g, ""))}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
            />
        </div>
    );
}


function TextAreaField({
    label,
    required,
    hint,
    placeholder,
    value,
    onChange,
}: {
    label: string;
    required?: boolean;
    hint?: string;
    placeholder?: string;
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-900">
                {label} {required ? <span className="text-red-500">*</span> : null}
            </label>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                rows={4}
                className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
            />
            {hint ? <p className="pt-1 text-sm leading-6 text-gray-500">{hint}</p> : null}
        </div>
    );
}




function calcAge(dobISO: string) {
    // dobISO expected: YYYY-MM-DD
    if (!dobISO) return "";
    const dob = new Date(dobISO);
    if (Number.isNaN(dob.getTime())) return "";
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;

    if (age < 0) return "";
    return String(age);
}

function onlyLetters(v: string) {
    // يسمح: حروف عربية + إنجليزية + مسافة
    // يمنع: أرقام + رموز
    return v
        .replace(/[^A-Za-z\u0600-\u06FF\s]/g, "")
        .replace(/\s+/g, " ")
        .trimStart(); // يمنع مسافات بالبداية
}

export default function RegisterPage() {
    const [firstName, setFirstName] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [grandfatherName, setGrandfatherName] = useState("");
    const [familyName, setFamilyName] = useState("");

    const [nationalId, setNationalId] = useState("");


    const [dobDay, setDobDay] = useState("");
    const [dobMonth, setDobMonth] = useState("");
    const [dobYear, setDobYear] = useState("");

    const [gender, setGender] = useState("");

    const [wifeId, setWifeId] = useState("");
    const [wifeName, setWifeName] = useState("");
    const [wifeDobDay, setWifeDobDay] = useState("");
    const [wifeDobMonth, setWifeDobMonth] = useState("");
    const [wifeDobYear, setWifeDobYear] = useState("");

    const [primaryPhone, setPrimaryPhone] = useState("");
    const [secondaryPhone, setSecondaryPhone] = useState("");

    const [currentGovernorate, setCurrentGovernorate] = useState("");
    const [currentArea, setCurrentArea] = useState("");
    const [currentNeighborhood, setCurrentNeighborhood] = useState("");
    const [currentResidence, setCurrentResidence] = useState("");

    const governorateOptions = [
        { value: "غزة", label: "غزة" },
        { value: "شمال غزة", label: "شمال غزة" },
        { value: "الوسطى", label: "الوسطى" },
        { value: "خانيونس", label: "خانيونس" },
        { value: "رفح", label: "رفح" },
    ];

    const areaOptions = [
        { value: "غزة", label: "غزة" },
        { value: "شمال غزة", label: "شمال غزة" },
        { value: "الشاطئ", label: "الشاطئ" },
        { value: "المغراقة", label: "المغراقة" },
        { value: "مدينة الزهراء", label: "مدينة الزهراء" },
        { value: "النصيرات", label: "النصيرات" },
        { value: "الزوايدة", label: "الزوايدة" },
        { value: "دير البلح", label: "دير البلح" },
        { value: "خانيونس", label: "خانيونس" },
        { value: "رفح", label: "رفح" },



    ];

    const residenceOptions = [
        { value: "الملاجئ الحكومية", label: "الملاجئ الحكومية" },
        { value: "في بيت أقارب / أصدقاء", label: "في بيت أقارب / أصدقاء" },
        { value: "غير نازح", label: "غير نازح" },
        { value: "خيمة", label: "خيمة" },
        { value: "مستشفى", label: "مستشفى" },
        { value: "دور عبادة", label: "دور عبادة" },
    ];

    // Family counts (all as strings for now)
    const [dependents_0_2, setDependents_0_2] = useState("");
    const [dependents_3_5, setDependents_3_5] = useState("");
    const [dependents_6_18, setDependents_6_18] = useState("");
    const [dependents_19_59, setDependents_19_59] = useState("");
    const [dependents_60_plus, setDependents_60_plus] = useState("");

    const [males_0_2, setMales_0_2] = useState("");
    const [males_3_5, setMales_3_5] = useState("");
    const [males_6_18, setMales_6_18] = useState("");
    const [males_19_59, setMales_19_59] = useState("");
    const [males_60_plus, setMales_60_plus] = useState("");

    const [chronicCount, setChronicCount] = useState("");
    const [disabilityCount, setDisabilityCount] = useState("");

    const [breadwinnerJob, setBreadwinnerJob] = useState("");
    const [housingStatus, setHousingStatus] = useState("");

    // Payment info
    const [paymentMethod, setPaymentMethod] = useState(""); // bank | wallet
    const [paymentIdentifier, setPaymentIdentifier] = useState(""); // account or wallet number


    const [priorityNeeds, setPriorityNeeds] = useState<
        { value: string; label: string }[]
    >([]);

    const [otherNeeds, setOtherNeeds] = useState("");






    const dobISO = useMemo(() => {
        if (!dobYear || !dobMonth || !dobDay) return "";
        const mm = String(dobMonth).padStart(2, "0");
        const dd = String(dobDay).padStart(2, "0");
        return `${dobYear}-${mm}-${dd}`;
    }, [dobYear, dobMonth, dobDay]);

    const wifeDobISO = useMemo(() => {
        if (!wifeDobYear || !wifeDobMonth || !wifeDobDay) return "";
        const mm = String(wifeDobMonth).padStart(2, "0");
        const dd = String(wifeDobDay).padStart(2, "0");
        return `${wifeDobYear}-${mm}-${dd}`;
    }, [wifeDobYear, wifeDobMonth, wifeDobDay]);

    const age = useMemo(() => calcAge(dobISO), [dobISO]);

    const [isSaving, setIsSaving] = useState(false);
    const [saveMsg, setSaveMsg] = useState<string | null>(null);

    const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [progress, setProgress] = useState(0);

    function showToast(type: "success" | "error", text: string) {
        setToast({ type, text });

        // ❌ للأخطاء: لا شريط ولا تحميل، فقط رسالة وتختفي بعد شوي
        if (type === "error") {
            setProgress(0);
            setTimeout(() => setToast(null), 2500);
            return;
        }

        // ✅ للنجاح: شريط تحميل وبعدها تختفي
        setProgress(0);

        const start = Date.now();
        const duration = 2200;

        const tick = () => {
            const p = Math.min(100, ((Date.now() - start) / duration) * 100);
            setProgress(p);

            if (p < 100) {
                requestAnimationFrame(tick);
            } else {
                setTimeout(() => setToast(null), 2000);
            }
        };

        requestAnimationFrame(tick);
    }


    function resetForm() {
        setFirstName("");
        setFatherName("");
        setGrandfatherName("");
        setFamilyName("");
        setNationalId("");

        setDobDay("");
        setDobMonth("");
        setDobYear("");
        setGender("");

        setWifeId("");
        setWifeName("");
        setWifeDobDay("");
        setWifeDobMonth("");
        setWifeDobYear("");

        setPrimaryPhone("");
        setSecondaryPhone("");

        setCurrentGovernorate("");
        setCurrentArea("");
        setCurrentNeighborhood("");
        setCurrentResidence("");

        setDependents_0_2("");
        setDependents_3_5("");
        setDependents_6_18("");
        setDependents_6_18("");
        setDependents_19_59("");
        setDependents_60_plus("");

        setMales_0_2("");
        setMales_3_5("");
        setMales_6_18("");
        setMales_19_59("");
        setMales_60_plus("");

        setChronicCount("");
        setDisabilityCount("");

        setBreadwinnerJob("");
        setHousingStatus("");

        setPriorityNeeds([]);
        setOtherNeeds("");

        setPaymentMethod("");
        setPaymentIdentifier("");
    }




    const requiredMsgs: Record<string, string> = {
        nationalId: "رقم الهوية مطلوب",
        firstName: "الاسم الأول مطلوب",
        fatherName: "اسم الأب مطلوب",
        grandfatherName: "اسم الجد مطلوب",
        familyName: "اسم العائلة مطلوب",

        dob: "تاريخ الميلاد مطلوب",
        gender: "الجنس مطلوب",

        phonePrimary: "رقم الهاتف الأساسي مطلوب",

        currentGovernorate: "المحافظة الحالية مطلوبة",
        currentArea: "المنطقة الحالية مطلوبة",
        currentNeighborhood: "اسم الحي مطلوب",
        currentResidence: "مكان الإقامة مطلوب",

        breadwinnerJob: "حقل معيل الأسرة مطلوب",
        housingStatus: "حالة المسكن مطلوبة",

        priorityNeeds: "اختر أولويتين كحد أقصى (حقل مطلوب)",
        paymentMethod: "طريقة استلام المساعدة مطلوبة",
        paymentIdentifier: "رقم الحساب/المحفظة مطلوب",
    };

    type ValidationResult = { key: string; msg: string } | null;
    function validateBeforeSend(): ValidationResult {        // ملاحظة: عدّل/احذف أي شرط إذا في حقول أنت مش معتبرها إلزامية
        const missing: string[] = [];

        if (!nationalId) missing.push("nationalId");
        if (!firstName) missing.push("firstName");
        if (!fatherName) missing.push("fatherName");
        if (!grandfatherName) missing.push("grandfatherName");
        if (!familyName) missing.push("familyName");

        if (!dobYear || !dobMonth || !dobDay) missing.push("dob");
        if (!gender) missing.push("gender");

        if (!primaryPhone) missing.push("phonePrimary");

        if (!currentGovernorate) missing.push("currentGovernorate");
        if (!currentArea) missing.push("currentArea");
        if (!currentNeighborhood) missing.push("currentNeighborhood");
        if (!currentResidence) missing.push("currentResidence");

        if (!breadwinnerJob) missing.push("breadwinnerJob");
        if (!housingStatus) missing.push("housingStatus");

        if (!priorityNeeds || priorityNeeds.length === 0) missing.push("priorityNeeds");

        if (!paymentMethod) missing.push("paymentMethod");
        if (!paymentIdentifier) missing.push("paymentIdentifier");

        // لو ذكر: معلومات الزوجة مطلوبة (حسب كودك أنت عاملها required)
        if (gender === "ذكر") {
            if (!wifeId) return { key: "wifeId", msg: "رقم هوية الزوجة مطلوب" };
            if (!wifeName) return { key: "wifeName", msg: "اسم الزوجة مطلوب" };
            if (!wifeDobYear || !wifeDobMonth || !wifeDobDay) return { key: "wifeDob", msg: "تاريخ ميلاد الزوجة مطلوب" };
        }

        if (missing.length > 0) {
            const key = missing[0];
            const msg = requiredMsgs[key] || "يرجى تعبئة الحقول المطلوبة";
            return { key, msg };
        }
        return null;
    }




    async function saveToDb() {
        setIsSaving(true);
        setSaveMsg(null);
        const v = validateBeforeSend();
        if (v) {
            showToast("error", v.msg);

            setTimeout(() => {
                document.getElementById(v.key)?.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 50);

            setIsSaving(false);
            return false;
        }

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nationalId,
                    firstName,
                    fatherName,
                    grandfatherName,
                    familyName,
                    gender,
                    dobISO,
                    age,

                    phonePrimary: primaryPhone,
                    phoneAlternative: secondaryPhone,

                    wifeId,
                    wifeName,
                    wifeDobISO,

                    governorate: currentGovernorate,
                    region: currentArea,
                    neighborhood: currentNeighborhood,
                    residenceType: currentResidence,

                    breadwinnerJob: breadwinnerJob || null,
                    housingStatus: housingStatus || null,

                    priorityNeedsJson: JSON.stringify(priorityNeeds.map((x: any) => x.label)),
                    otherNeeds,

                    paymentMethod,
                    paymentIdentifier,
                }),
            });

            const data = await res.json().catch(() => ({}));

            // ✅ إذا الطلب مكرر (409)
            if (res.status === 409) {
                showToast("error", data?.error || "تم تسجيل طلب سابقًا بنفس رقم الهوية ");
                return false;
            }

            if (!res.ok) {
                const msg = data?.error || data?.details || "فشل الحفظ";
                showToast("error", msg);
                return false;
            }

            resetForm();
            window.location.assign(`/register/success?id=${encodeURIComponent(data.id)}`);
            return true;

        } catch (e) {
            showToast("error", "حدث خطأ أثناء الحفظ. حاول مرة أخرى");
            return false;
        } finally {
            setIsSaving(false);
        }
    }



    return (
        <main className="min-h-screen bg-white px-4 py-6">
            <div className="mb-10 flex flex-col items-center justify-center">
                <img
                    src="/logo3.png"
                    alt="شعار المؤسسة"
                    className="w-48 md:w-70 object-contain"
                />
            </div>

            <div className="mx-auto w-full max-w-3xl bg-white">
                <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                    {/* Section 1 */}
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-extrabold text-gray-900">
                            معلومات رب الأسرة
                        </h1>
                        <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-gray-900" />
                    </div>






                    <div className="mt-8 space-y-6">

                        <Field id="nationalId"
                            label="رقم الهوية"
                            required
                            placeholder="أدخل رقم الهوية"
                            hint="يرجى إدخال رقم الهوية كما ورد في بطاقة الهوية الخاصة بك"
                            value={nationalId}
                            inputMode="numeric"
                            maxLength={9}
                            onChange={(v) => setNationalId(v.replace(/\D/g, "").slice(0, 9))}
                        />

                        <Field 
                            
                            label="الاسم الأول"
                            required
                            hint="يرجى إدخال الاسم الأول كما ورد في بطاقة الهوية الخاصة بك"
                            value={firstName}
                            onChange={(v) => setFirstName(onlyLetters(v))}
                        />
                        <Field id="fatherName"
                            label="اسم الأب"
                            required
                            hint="يرجى إدخال اسم الأب كما ورد في بطاقة الهوية الخاصة بك"
                            value={fatherName}
                            onChange={(v) => setFatherName(onlyLetters(v))}
                        />
                        <Field id="grandfatherName"
                            label="اسم الجد"
                            required
                            hint="يرجى إدخال اسم الجد كما ورد في بطاقة الهوية الخاصة بك"
                            value={grandfatherName}
                            onChange={(v) => setGrandfatherName(onlyLetters(v))}
                        />
                        <Field id="familyName"
                            label="اسم العائلة"
                            required
                            hint="يرجى إدخال اسم العائلة كما ورد في بطاقة الهوية الخاصة بك"
                            value={familyName}
                            onChange={(v) => setFamilyName(onlyLetters(v))}
                        />
                    </div>






                    {/* Divider */}
                    <div className="my-10 h-px w-full bg-gray-200" />

                    {/* Section 2 */}
                    <div className="mb-8 mt-2 text-center">
                        <h2 className="text-2xl font-extrabold text-gray-900">
                            بيانات شخصية
                        </h2>
                        <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gray-900" />
                    </div>


                    <div className="mt-8 grid grid-cols-1 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-900">
                                تاريخ الميلاد <span className="text-red-500">*</span>
                            </label>

                            <div className="grid grid-cols-3 gap-3">
                                <select
                                    value={dobDay}
                                    onChange={(e) => setDobDay(e.target.value)}
                                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
                                >
                                    <option value="" disabled>اليوم</option>
                                    {Array.from({ length: 31 }, (_, i) => {
                                        const d = String(i + 1);
                                        return (
                                            <option key={d} value={d}>
                                                {d}
                                            </option>
                                        );
                                    })}
                                </select>

                                <select
                                    value={dobMonth}
                                    onChange={(e) => setDobMonth(e.target.value)}
                                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
                                >
                                    <option value="" disabled>الشهر</option>
                                    {[
                                        "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"
                                    ].map((m) => (
                                        <option key={m} value={m}>
                                            {m}
                                        </option>
                                    ))}
                                </select>

                                <select
                                    value={dobYear}
                                    onChange={(e) => setDobYear(e.target.value)}
                                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
                                >
                                    <option value="" disabled>السنة</option>
                                    {Array.from({ length: 127 }, (_, i) => {
                                        const year = String(new Date().getFullYear() - i);
                                        return (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>

                            <p className="text-sm text-gray-500">
                                يرجى اختيار تاريخ الميلاد بشكل صحيح
                            </p>
                        </div>


                        <Field label="العمر" required value={age} readOnly />

                        <SelectField
                            label="الجنس"
                            required
                            value={gender}
                            onChange={setGender}
                            options={[
                                { value: "ذكر", label: "ذكر" },
                                { value: "أنثى", label: "أنثى" },
                            ]}
                        />


                        {gender === "ذكر" && (
                            <div className="mt-8">
                                <div className="mb-6 text-center">
                                    <h3 className="text-xl font-extrabold text-slate-800">معلومات الزوجة</h3>
                                    <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-slate-800" />
                                </div>

                                <div className="space-y-6">
                                    <Field id="wifeId"
                                        label="رقم هوية الزوجة"
                                        required
                                        placeholder="أدخل رقم هوية الزوجة"
                                        hint="يرجى إدخال رقم الهوية كما ورد في بطاقة الهوية"
                                        value={wifeId}
                                        inputMode="numeric"
                                        maxLength={9}
                                        onChange={(v) => setWifeId(v.replace(/\D/g, "").slice(0, 9))}                                    />




                                    <Field id="wifeName"
                                        label="اسم الزوجة"
                                        placeholder="أدخل اسم الزوجة"
                                        hint="يرجى إدخال الاسم كما ورد في بطاقة الهوية"
                                        required
                                        value={wifeName}
                                        onChange={(v) => setWifeName(onlyLetters(v))}
                                    />

                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-gray-900">
                                            تاريخ ميلاد الزوجة <span className="text-red-500">*</span>
                                        </label>

                                        <div className="grid grid-cols-3 gap-3">
                                            <select
                                                value={wifeDobDay}
                                                onChange={(e) => setWifeDobDay(e.target.value)}
                                                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
                                            >
                                                <option value="" disabled>اليوم</option>
                                                {Array.from({ length: 31 }, (_, i) => {
                                                    const d = String(i + 1);
                                                    return (
                                                        <option key={d} value={d}>
                                                            {d}
                                                        </option>
                                                    );
                                                })}
                                            </select>

                                            <select
                                                value={wifeDobMonth}
                                                onChange={(e) => setWifeDobMonth(e.target.value)}
                                                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
                                            >
                                                <option value="" disabled>الشهر</option>
                                                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].map((m) => (
                                                    <option key={m} value={m}>{m}</option>
                                                ))}
                                            </select>

                                            <select
                                                value={wifeDobYear}
                                                onChange={(e) => setWifeDobYear(e.target.value)}
                                                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
                                            >
                                                <option value="" disabled>السنة</option>
                                                {Array.from({ length: 80 }, (_, i) => {
                                                    const year = String(new Date().getFullYear() - i);
                                                    return (
                                                        <option key={year} value={year}>
                                                            {year}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>

                                        <p className="pt-1 text-sm leading-6 text-gray-500">
                                            الرجاء اختيار تاريخ الميلاد بشكل صحيح
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}



                        {/* Divider */}
                        <div className="my-6 h-px w-full bg-gray-200" />

                        {/* Section 3 */}
                        <div className="mb-0t-1 text-center">
                            <h2 className="text-2xl font-extrabold text-gray-900">
                                أرقام التواصل
                            </h2>
                            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gray-900" />
                        </div>


                        <div className="mt-8 space-y-6">
                            <Field id="phonePrimary"
                                label="رقم الهاتف الأساسي"
                                required
                                placeholder="مثال: 059xxxxxxx"
                                value={primaryPhone}
                                inputMode="tel"
                                maxLength={10}
                                onChange={(v) => setPrimaryPhone(v.replace(/\D/g, "").slice(0, 10))}                            />

                            <Field
                                label="رقم الهاتف البديل"
                                placeholder="مثال: 056xxxxxxx"
                                hint="يرجى إدراج رقم هاتف بديل يمكننا التواصل معك من خلاله"
                                value={secondaryPhone}
                                inputMode="tel"
                                maxLength={10}
                                onChange={(v) => setSecondaryPhone(v.replace(/\D/g, "").slice(0, 10))}                            />
                            {/* Divider */}
                            <div className="my-10 h-px w-full bg-gray-200" />

                            {/* Section 4 */}
                            <div className="mb-8 mt-2 text-center">
                                <h2 className="text-2xl font-extrabold text-gray-900">
                                    الموقع الحالي (مكان النزوح)
                                </h2>
                                <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-gray-900" />
                            </div>


                            <div className="mt-8 space-y-6">
                                <SearchableSelect
                                    label="المحافظة الحالية"
                                    required
                                    hint="يرجى اختيار المحافظة الحالية"
                                    value={currentGovernorate}
                                    onChange={setCurrentGovernorate}
                                    options={governorateOptions}
                                />


                                <SearchableSelect
                                    label="المنطقة الحالية"
                                    required
                                    hint="يرجى اختيار موقعك الحالي"
                                    value={currentArea}
                                    onChange={setCurrentArea}
                                    options={areaOptions}
                                />


                                <Field id="currentNeighborhood"
                                    label="الحي المتواجد فيه حاليًا أو أقرب حي لك"
                                    required
                                    placeholder="اسم الحي مع اقرب معلم"

                                    hint="يرجى إدخال اسم الحي المتواجد فيه أو أقرب حي لك"
                                    value={currentNeighborhood}
                                    onChange={setCurrentNeighborhood}


                                />

                                <SearchableSelect
                                    label="مكان الإقامة أو النزوح"
                                    required
                                    hint="يرجى اختيار مكان اقامتك الحالي"
                                    value={currentResidence}
                                    onChange={setCurrentResidence}
                                    options={residenceOptions}
                                />

                            </div>

                        </div>

                    </div>


                    {/* Divider */}
                    <div className="my-10 h-px w-full bg-gray-200" />

                    {/* Section 5 */}
                    <div className="mb-8 mt-2 text-center">
                        <h2 className="text-2xl font-extrabold text-gray-900">معلومات الأسرة</h2>
                        <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-gray-900" />
                    </div>

                    <div className="space-y-8">
                        {/* Dependents */}
                        <div>
                            <h3 className="mb-4 text-lg font-bold text-gray-900">عدد الأفراد الإناث</h3>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                                <NumberField label="0-2 سنوات" value={dependents_0_2} onChange={setDependents_0_2} />
                                <NumberField label="3-5 سنوات" value={dependents_3_5} onChange={setDependents_3_5} />
                                <NumberField label="6-18 سنوات" value={dependents_6_18} onChange={setDependents_6_18} />
                                <NumberField label="19-59 سنوات" value={dependents_19_59} onChange={setDependents_19_59} />
                                <NumberField label="60 فما فوق" value={dependents_60_plus} onChange={setDependents_60_plus} />
                            </div>
                        </div>

                        {/* Males */}
                        <div>
                            <h3 className="mb-4 text-lg font-bold text-gray-900">عدد الأفراد الذكور</h3>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                                <NumberField label="0-2 سنوات" value={males_0_2} onChange={setMales_0_2} />
                                <NumberField label="3-5 سنوات" value={males_3_5} onChange={setMales_3_5} />
                                <NumberField label="6-18 سنوات" value={males_6_18} onChange={setMales_6_18} />
                                <NumberField label="19-59 سنوات" value={males_19_59} onChange={setMales_19_59} />
                                <NumberField label="60 فما فوق" value={males_60_plus} onChange={setMales_60_plus} />
                            </div>
                        </div>

                        {/* Chronic + Disability */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <NumberField
                                label="عدد الأفراد ذوي الأمراض المزمنة"
                                value={chronicCount}
                                onChange={setChronicCount}
                            />
                            <NumberField
                                label="عدد الأفراد ذوي الإعاقة"
                                value={disabilityCount}
                                onChange={setDisabilityCount}
                            />
                        </div>

                        {/* Breadwinner job + housing */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <SelectField
                                label="معيل الأسرة"
                                required
                                value={breadwinnerJob}
                                onChange={setBreadwinnerJob}
                                options={[
                                    { value: "لا يعمل", label: "لا يعمل" },
                                    { value: "عامل", label: "عامل" },
                                    { value: "موظف", label: "موظف" },
                                    { value: "مزارع", label: "مزارع" },
                                    { value: "صياد", label: "صياد" },
                                ]}
                            />

                            <SelectField
                                label="حالة المسكن"
                                required
                                value={housingStatus}
                                onChange={setHousingStatus}
                                options={[
                                    { value: "سيء", label: "سيء" },
                                    { value: "جيد", label: "جيد" },
                                    { value: "ممتاز", label: "ممتاز" },
                                    { value: "هدم كلي", label: "هدم كلي" },
                                    { value: "هدم جزئي", label: "هدم جزئي" },
                                ]}
                            />
                        </div>
                    </div>


                    {/* Divider */}
                    <div className="my-10 h-px w-full bg-gray-200" />

                    {/* Priorities */}
                    <div className="mb-8 mt-2 text-center">
                        <h2 className="text-2xl font-extrabold text-gray-900">
                            أولويات احتياجات الأسرة
                        </h2>
                        <div className="mx-auto mt-3 h-1 w-28 rounded-full bg-gray-900" />
                    </div>

                    <MultiSearchableSelect
                        label="اختر أولويتين كحد أقصى"
                        required
                        hint="يمكنك اختيار خيارين فقط"
                        value={priorityNeeds}
                        onChange={setPriorityNeeds}
                        options={[
                            { value: "cash", label: "مساعدة نقدية" },
                            { value: "food", label: "طرود غذائية" },
                            { value: "food", label: "قسائم شرائية" },
                            { value: "cleaning", label: "مواد تنظيف" },
                            { value: "tent", label: "خيمة" },
                            { value: "milk", label: "حليب و حفاضات" },

                        ]}
                        placeholder="Type to search"
                        maxSelected={2}
                    />


                    <div className="my-10 h-px w-full bg-gray-200" />



                    <TextAreaField
                        label="اذكر احتياجات أخرى (اختياري)"
                        placeholder="اكتب هنا ما تحتاجه الأسرة..."
                        hint="مثال: أدوية، فرشات، بطانيات، احتياجات خاصة للأطفال..."
                        value={otherNeeds}
                        onChange={setOtherNeeds}
                    />


                    {/* Divider */}
                    <div className="my-10 h-px w-full bg-gray-200" />

                    {/* Section 6
                    <div className="mb-8 mt-2 text-center">
                        <h2 className="text-2xl font-extrabold text-gray-900">بيانات التحويل</h2>
                        <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-gray-900" />
                    </div> */}

                    <div className="space-y-6">
                        <SelectField
                            label="طريقة استلام المساعدة"
                            required
                            value={paymentMethod}
                            onChange={(v) => {
                                setPaymentMethod(v);
                                setPaymentIdentifier("");
                            }}
                            options={[
                                { value: "bank", label: "حساب بنكي" },
                                { value: "wallet", label: "محفظة إلكترونية" },
                            ]}
                        />

                        <Field id="paymentIdentifier"
                            label={paymentMethod === "wallet" ? "رقم المحفظة" : "رقم الحساب البنكي"}
                            required
                            placeholder={
                                paymentMethod === "wallet"
                                    ? "أدخل رقم المحفظة"
                                    : "أدخل رقم الحساب البنكي"
                            }
                            value={paymentIdentifier}
                            onChange={setPaymentIdentifier}
                        />
                    </div>










                    <div className="mt-6 flex flex-col gap-2">
                        <button
                            type="button"
                            onClick={saveToDb}
                            disabled={isSaving}
                            className="w-full cursor-pointer rounded-xl bg-gray-900 px-5 py-3 text-white font-semibold shadow-sm hover:bg-gray-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isSaving ? "جاري الإرسال..." : "إرسال الطلب"}
                        </button>

                        {toast ? (
                            <div className="w-full">
                                <div
                                    className={`rounded-xl border px-4 py-2 text-sm font-bold ${toast.type === "success"
                                            ? "border-green-200 bg-green-50 text-green-900"
                                            : "border-red-200 bg-red-50 text-red-900"
                                        }`}
                                    style={{ opacity: 1 }}
                                    dir="rtl"
                                >
                                    {/* الشريط يظهر فقط للنجاح */}
                                    {toast.type === "success" && (
                                        <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                                            <div
                                                className="h-full rounded-full transition-[width] duration-100"
                                                style={{
                                                    width: `${progress}%`,
                                                    opacity: 1,
                                                    background:
                                                        "linear-gradient(90deg, #16a34a 0%, #22c55e 55%, #86efac 100%)",
                                                    boxShadow: "0 0 12px rgba(34,197,94,0.45)",
                                                }}
                                            />
                                        </div>
                                    )}

                                    <div className="text-center font-extrabold text-black">
                                        {toast.text}
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </main>
    );
}





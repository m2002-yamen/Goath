"use client";
import { useEffect } from "react";

export default function AutoLogout() {
    useEffect(() => {
        const logout = () => {
            navigator.sendBeacon?.("/api/admin/logout");
            fetch("/api/admin/logout", { method: "POST" }).catch(() => { });
        };

        window.addEventListener("pagehide", logout);
        window.addEventListener("beforeunload", logout);

        return () => {
            window.removeEventListener("pagehide", logout);
            window.removeEventListener("beforeunload", logout);
        };
    }, []);

    return null;
}

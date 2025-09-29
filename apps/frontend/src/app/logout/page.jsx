"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

export default function LogoutPage() {
    const router = useRouter();
    const { logout } = useAuth();

    useEffect(() => {
        // perform logout then redirect
        let cancelled = false;
        (async () => {
            try {
                await logout();
            } finally {
                if (!cancelled) router.replace("/login");
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [logout, router]);

    return (
        <div className="container py-4">
            <p>signing you out…</p>
        </div>
    );
}

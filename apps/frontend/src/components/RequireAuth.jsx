"use client";
import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import useSWR from "swr";

export default function RequireAuth({ children }) {
    const router = useRouter();
    const pathname = usePathname();

    // allow public pages through without auth
    const publicPaths = ["/login", "/signup", "/logout"];
    if (pathname && publicPaths.some((p) => pathname.startsWith(p))) {
        return children;
    }

    // opt out of global suspense for this check so layout doesn't need Suspense
    const { data, error, isLoading } = useSWR("/api/auth/me", {
        suspense: false,
    });

    console.log(data ? data : error);

    useEffect(() => {
        if (!isLoading) {
            // redirect to login when not authenticated
            const email = data?.email ?? data?.user?.email;
            if (error || !email) {
                router.replace("/login");
            }
        }
    }, [isLoading, data, error, router]);

    if (isLoading) return <p>Authenticating...</p>;
    // when redirecting due to missing auth, avoid showing error flicker
    const email = data?.email ?? data?.user?.email;
    if (error || !email) return null;
    return children;
}

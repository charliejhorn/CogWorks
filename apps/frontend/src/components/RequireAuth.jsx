"use client";
import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import useSWR from "swr";

export default function RequireAuth({ children }) {
    const router = useRouter();
    const pathname = usePathname();

    // allow public pages through without auth
    const publicPaths = ["/login", "/signup"];
    if (pathname && publicPaths.some((p) => pathname.startsWith(p))) {
        return children;
    }

    // opt out of global suspense for this check so layout doesn't need Suspense
    const { data, error, isLoading } = useSWR("/api/auth/me", {
        suspense: false,
    });

    useEffect(() => {
        if (!isLoading) {
            // redirect to login when not authenticated
            if (error || (data && !data.user)) {
                router.replace("/login");
            }
        }
    }, [isLoading, data, error, router]);

    if (isLoading) return <p>Authenticating...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!data?.user) return null;
    return children;
}

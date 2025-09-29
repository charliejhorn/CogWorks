"use client";
import React from "react";
import { SWRConfig } from "swr";
import { useAuth } from "./AuthProvider";

function makeFetcher(getTokens, refresh) {
    return async function fetcher(url, opts = {}) {
        const tokens = getTokens();
        const token = tokens?.accessToken || null;
        const headers = { ...(opts.headers || {}) };
        if (token) headers.Authorization = `Bearer ${token}`;

        // resolve full endpoint (support absolute URLs or relative keys)
        const resolveEndpoint = (u) => {
            if (!u) return u;
            if (u.startsWith("http://") || u.startsWith("https://")) return u;
            return `${process.env.NEXT_PUBLIC_API_BASE}${
                u.startsWith("/") ? u : `/${u}`
            }`;
        };

        const endpoint = resolveEndpoint(url);
        let res = await fetch(endpoint, {
            credentials: "include",
            ...opts,
            headers,
        });

        if (res.status === 401) {
            // attempt a single refresh if we have a refresh token and this isn't the refresh call
            const hasRefresh = !!getTokens()?.refreshToken;
            const isRefreshCall = String(url).includes("/api/auth/refresh");
            if (hasRefresh && !isRefreshCall) {
                try {
                    console.log("SWR attempting token refresh");
                    const refreshed = await refresh();
                    if (refreshed?.accessToken) {
                        const retryHeaders = {
                            ...(opts.headers || {}),
                            Authorization: `Bearer ${refreshed.accessToken}`,
                        };
                        const retryEndpoint = resolveEndpoint(url);
                        res = await fetch(retryEndpoint, {
                            credentials: "include",
                            ...opts,
                            headers: retryHeaders,
                        });
                    }
                } catch (e) {
                    // swallow error and let non-ok handling throw below
                }
            }
        }

        // if request was not successful and was not unauthorised
        if (!res.ok) {
            const err = new Error("request failed");
            err.status = res.status;
            err.info = await res.json().catch(() => ({}));
            throw err;
        }
        return res.json();
    };
}

export default function SwrProvider({ children }) {
    const { tokens, refresh, logout } = useAuth();
    const getTokens = () => tokens || { accessToken: null, refreshToken: null };
    return (
        <SWRConfig
            value={{
                fetcher: makeFetcher(getTokens, refresh),
                suspense: true,
                revalidateOnFocus: true,
                shouldRetryOnError: (err) => err?.status >= 500,
                errorRetryCount: 3,
                // clear auth on 401; navigation is handled by RequireAuth
                onError: (err) => {
                    if (err?.status === 401 && typeof window !== "undefined") {
                        if (!window.__cogworks_loggingOut) {
                            window.__cogworks_loggingOut = true;
                            Promise.resolve()
                                .then(() => logout())
                                .finally(() => {
                                    // release the gate on the next tick
                                    setTimeout(() => {
                                        window.__cogworks_loggingOut = false;
                                    }, 0);
                                });
                        }
                    }
                },
            }}
        >
            {children}
        </SWRConfig>
    );
}

"use client";
import React from "react";
import { SWRConfig } from "swr";
import { useLocalStorage } from "./hooks/useLocalStorage";

function makeFetcher(getTokens, setTokens) {
    return async function fetcher(url, opts = {}) {
        const tokens = getTokens();
        const token = tokens?.accessToken || null;
        const headers = { ...(opts.headers || {}) };
        if (token) headers.Authorization = `Bearer ${token}`;

        let res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}${url}`, {
            credentials: "include",
            ...opts,
            headers,
        });
        if (res.status === 401) {
            // try refresh once
            try {
                console.log("SWR attempting token refresh");
                const refreshToken = tokens?.refreshToken;
                if (refreshToken) {
                    const r = await fetch(
                        `${process.env.NEXT_PUBLIC_API_BASE}/api/auth/refresh`,
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ refreshToken }),
                        }
                    );
                    if (r.ok) {
                        const data = await r.json();
                        setTokens({
                            accessToken: data.accessToken,
                            refreshToken: data.refreshToken,
                        });
                        // retry original request with new token
                        const newHeaders = {
                            ...(opts.headers || {}),
                            Authorization: `Bearer ${data.accessToken}`,
                        };
                        res = await fetch(url, {
                            credentials: "include",
                            ...opts,
                            headers: newHeaders,
                        });
                    } else {
                        // redirect to /login if refresh fails
                        window.location.href = "/login";
                    }
                } else {
                    // redirect to /login if no refresh token
                    window.location.href = "/login";
                }
            } catch (e) {}
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
    // read token from local storage using the shared hook
    const [tokens, setTokens] = useLocalStorage("cogworks_tokens", {
        accessToken: null,
        refreshToken: null,
    });
    const getTokens = () => tokens || { accessToken: null, refreshToken: null };

    console.log("tokens:", tokens);
    return (
        <SWRConfig
            value={{
                fetcher: makeFetcher(getTokens, setTokens),
                suspense: true,
                revalidateOnFocus: true,
                shouldRetryOnError: (err) => err?.status >= 500,
                errorRetryCount: 3,
                fallback: {
                    "/api/auth/me": { user: null },
                },
            }}
        >
            {children}
        </SWRConfig>
    );
}

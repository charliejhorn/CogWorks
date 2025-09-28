"use client";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import useSWR from "swr";

const AuthCtx = createContext(null);
export function useAuth() { return useContext(AuthCtx); }

export default function AuthProvider({ children }) {
	// store tokens in localStorage via provided hook
	const [tokens, setTokens] = useLocalStorage("cogworks_tokens", { accessToken: null, refreshToken: null });
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);

	const login = useCallback(async (email, password) => {
		setLoading(true);
		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/auth/login`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});
			if (!res.ok) {
				const info = await res.json().catch(() => ({}));
				throw new Error(info?.message || "login failed");
			}
			const data = await res.json();
			setTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken });
			setUser(data.user || null);
			return data;
		} finally {
			setLoading(false);
		}
	}, [setTokens]);

	const logout = useCallback(async () => {
		// call backend to revoke refresh token if available
		try {
			if (tokens?.refreshToken) {
				await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/auth/logout`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ refreshToken: tokens.refreshToken }),
				}).catch(() => {});
			}
		} finally {
			setTokens({ accessToken: null, refreshToken: null });
			setUser(null);
		}
	}, [tokens, setTokens]);

	const refresh = useCallback(async () => {
		if (!tokens?.refreshToken) return null;
		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/auth/refresh`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ refreshToken: tokens.refreshToken }),
			});
			if (!res.ok) return null;
			const data = await res.json();
			setTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken });
			setUser(data.user || user);
			return data;
		} catch (err) {
			return null;
		}
	}, [tokens, setTokens, user]);

	useEffect(() => {
		// on mount, optionally validate token or fetch user
		let mounted = true;
		(async () => {
			if (tokens?.accessToken) {
				try {
					// const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/auth/me`, {
					// 	headers: { Authorization: `Bearer ${tokens.accessToken}` },
					// });
					// if (res.ok) {
					// 	const u = await res.json();
					// 	if (mounted) setUser(u);
					// }

					const meKey = tokens?.accessToken ? "/api/auth/me" : null;
					const { data: me } = useSWR(meKey, async () => {
						const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/auth/me`, {
							headers: { Authorization: `Bearer ${tokens.accessToken}` },
						});
						if (!res.ok) throw new Error("failed to load user");
						return res.json();
					}, { revalidateOnFocus: true });

					useEffect(() => { if (me) setUser(me); }, [me]);

				} catch (e) {
					// ignore
				}
			}
		})();
		return () => { mounted = false; };
	}, []);

	const value = { tokens, user, login, logout, refresh, loading, setTokens };
	return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";

export default function RequireAuth({ children }) {
	const { tokens, user } = useAuth();
	const router = useRouter();
	useEffect(() => {
		if (!tokens?.accessToken) {
			router.replace('/login');
		}
	}, [tokens, router]);
	if (!tokens?.accessToken) return null;
	return children;
}

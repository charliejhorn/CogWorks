"use client";
import React from "react";
import { SWRConfig } from "swr";

function fetcher(url, opts = {}) {
	// forward cookies (jwt) with same-site backend; if cross-origin, ensure CORS+credentials
	return fetch(url, { credentials: "include", ...opts }).then(async (res) => {
		if (!res.ok) {
			const err = new Error("request failed");
			err.status = res.status;
			err.info = await res.json().catch(() => ({}));
			throw err;
		}
		return res.json();
	});
}

export default function SwrProvider({ children }) {
	return (
		<SWRConfig
			value={{
				fetcher,
				suspense: true,
				revalidateOnFocus: true,
				shouldRetryOnError: (err) => err?.status >= 500,
				errorRetryCount: 3,
			}}
		>
			{children}
		</SWRConfig>
	);
}

"use client";
import { useSyncExternalStore } from "react";

let source;
let listeners = new Set();
let last = [];

function ensureSource(baseUrl) {
	if (!source) {
		const url = `${baseUrl}/api/events`;
		source = new EventSource(url, { withCredentials: true });
		source.addEventListener("job_status", (e) => {
			try { last = [JSON.parse(e.data), ...last].slice(0, 100); } catch {}
			listeners.forEach((l) => l());
		});
		source.onmessage = (e) => {
			// handle heartbeat comments or generic messages
			if (e?.data?.startsWith(":")) return;
		};
		source.onerror = () => {
			// let the browser reconnect automatically
		};
	}
}

export function useJobStatusStream(baseUrl) {
	ensureSource(baseUrl);
	return useSyncExternalStore(
		(cb) => { listeners.add(cb); return () => listeners.delete(cb); },
		() => last,
		() => []
	);
}

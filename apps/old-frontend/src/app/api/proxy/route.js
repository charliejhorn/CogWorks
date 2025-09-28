// example server-side proxy route for fetching protected data on the server
import { NextResponse } from "next/server";

export async function GET(request) {
  // this is a simple example; in production you'd validate cookies or headers
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE + "/api/protected/data";
  const res = await fetch(apiUrl, { cache: "no-store" });
  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}

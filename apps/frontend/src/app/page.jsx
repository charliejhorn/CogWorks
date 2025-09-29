"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
    const router = useRouter();
    return (
        <>
            <div className="container mt-5">
                <h1>Home Page</h1>
                <button
                    type="button"
                    className="mt-3 btn btn-primary"
                    onClick={(e) => {
                        router.push("/logout");
                    }}
                >
                    Logout
                </button>
            </div>
        </>
    );
}

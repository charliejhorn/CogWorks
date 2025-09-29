import AuthProvider from "@/components/AuthProvider";
import BootstrapProvider from "@/components/BootstrapProvider";
import RequireAuth from "@/components/RequireAuth";
import SwrProvider from "@/components/SwrProvider";
import React from "react";

export default function RootLayout({ children }) {
    return (
        <html lang="en" data-scroll-behavior="smooth">
            <body>
                <BootstrapProvider>
                    <AuthProvider>
                        <SwrProvider>
                            {/* <React.Suspense
                                fallback={
                                    <div className="p-3">authenticating…</div>
                                }
                            > */}
                            <RequireAuth>{children}</RequireAuth>
                            {/* </React.Suspense> */}
                        </SwrProvider>
                    </AuthProvider>
                </BootstrapProvider>
            </body>
        </html>
    );
}

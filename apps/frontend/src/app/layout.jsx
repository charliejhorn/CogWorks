import AuthProvider from "@/components/AuthProvider";
import BootstrapProvider from "@/components/BootstrapProvider";
import RequireAuth from "@/components/RequireAuth";
import SwrProvider from "@/components/SwrProvider";
import React from "react";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <BootstrapProvider>
                    <SwrProvider>
                        <AuthProvider>
                            {/* <React.Suspense
                                fallback={
                                    <div className="p-3">authenticating…</div>
                                }
                            > */}
                            <RequireAuth>{children}</RequireAuth>
                            {/* </React.Suspense> */}
                        </AuthProvider>
                    </SwrProvider>
                </BootstrapProvider>
            </body>
        </html>
    );
}

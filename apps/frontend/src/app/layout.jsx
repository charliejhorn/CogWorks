import React from 'react';
import BootstrapProvider from "../components/BootstrapProvider";
import SwrProvider from "../components/SwrProvider";
import ActivityProvider from "../components/ActivityProvider";
import Sidebar from "../components/Sidebar";

const Layout = ({ children }) => {
    return (
        <div className="d-flex" style={{ minHeight: '100vh' }}>
            <Sidebar />
            <div className="flex-grow-1">
                <header className="border-bottom p-3">
                    <h1 className="h4 m-0">CogWorks Workshop Management</h1>
                </header>
                <main className="p-3">{children}</main>
            </div>
        </div>
    );
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <BootstrapProvider>
                    <SwrProvider>
                        <ActivityProvider>
                            <Layout>{children}</Layout>
                        </ActivityProvider>
                    </SwrProvider>
                </BootstrapProvider>
            </body>
        </html>
    );
}
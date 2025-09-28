import BootstrapProvider from "@/components/BootstrapProvider";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <BootstrapProvider>{children}</BootstrapProvider>
            </body>
        </html>
    );
}

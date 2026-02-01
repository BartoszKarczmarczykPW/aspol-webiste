
export const metadata = {
    title: "Sanity Studio",
    description: "Content Management System",
};

import ConsolePatch from "./ConsolePatch"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body style={{ margin: 0 }}>
                <ConsolePatch>{children}</ConsolePatch>
            </body>
        </html>
    )
}

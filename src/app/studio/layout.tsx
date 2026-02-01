
export const metadata = {
    title: "Sanity Studio",
    description: "Content Management System",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body style={{ margin: 0 }}>{children}</body>
        </html>
    )
}

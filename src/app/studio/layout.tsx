
export const metadata = {
    title: "Sanity Studio",
    description: "Content Management System",
};

import Script from "next/script"
import ConsolePatch from "./ConsolePatch"

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body style={{ margin: 0 }}>
                <Script
                    id="studio-console-patch"
                    strategy="beforeInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
(() => {
  const originalError = console.error;
  console.error = (...args) => {
    const message = typeof args[0] === 'string' ? args[0] : '';
    if (message.includes('disableTransition')) return;
    originalError(...args);
  };
})();
`,
                    }}
                />
                <ConsolePatch>{children}</ConsolePatch>
            </body>
        </html>
    )
}

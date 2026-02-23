"use client";

import { useEffect, useRef } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        // Respect reduced motion preference
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            el.style.opacity = "1";
            return;
        }
        // CSS-only fade-in, no framer-motion needed
        requestAnimationFrame(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        });
    }, []);

    return (
        <div
            ref={ref}
            style={{
                opacity: 0,
                transform: "translateY(8px)",
                transition: "opacity 0.4s ease-out, transform 0.4s ease-out",
            }}
        >
            {children}
        </div>
    );
}

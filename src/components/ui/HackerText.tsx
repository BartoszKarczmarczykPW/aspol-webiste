"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface HackerTextProps {
    text: string;
    className?: string;
    speed?: number;
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

export default function HackerText({ text, className, speed = 30 }: HackerTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const [isHovering, setIsHovering] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startScramble = () => {
        setIsHovering(true);
        let iteration = 0;

        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplayText((prev) =>
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                if (intervalRef.current) clearInterval(intervalRef.current);
            }

            iteration += 1 / 3; // Controls how fast it reveals (lower = slower reveal but fast scramble)
        }, speed);
    };

    const stopScramble = () => {
        setIsHovering(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text); // Reset to original instantly on mouse leave, or could let it finish
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    return (
        <span
            className={cn("inline-block cursor-default", className)}
            onMouseEnter={startScramble}
            onMouseLeave={stopScramble}
        >
            {displayText}
        </span>
    );
}

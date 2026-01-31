"use client";

import React, { useEffect, useRef } from 'react';

interface ConstellationPointsProps {
    color?: string;
    width?: string;
    height?: string;
}

export default function ConstellationPoints({
    color = '15, 23, 42', // dark navy RGB
    width = '100%',
    height = '100%'
}: ConstellationPointsProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let points: { x: number; y: number; vx: number; vy: number; size: number }[] = [];

        // Configuration
        const pointCount = 60; // Number of points
        const connectionDistance = 150; // Max distance for connection
        const baseSize = 2; // Base size of points

        const resizeCanvas = () => {
            if (!canvas) return;
            canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
            canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
            initPoints();
        };

        const initPoints = () => {
            points = [];
            for (let i = 0; i < pointCount; i++) {
                points.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5, // Velocity X
                    vy: (Math.random() - 0.5) * 0.5, // Velocity Y
                    size: Math.random() * baseSize + 1
                });
            }
        };

        const animate = () => {
            if (!canvas || !ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw points
            points.forEach((point, i) => {
                // Move points
                point.x += point.vx;
                point.y += point.vy;

                // Bounce off edges
                if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
                if (point.y < 0 || point.y > canvas.height) point.vy *= -1;

                // Draw point
                ctx.beginPath();
                ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${color}, 0.6)`;
                ctx.fill();

                // Draw connections
                for (let j = i + 1; j < points.length; j++) {
                    const p2 = points[j];
                    const dist = Math.hypot(point.x - p2.x, point.y - p2.y);

                    if (dist < connectionDistance) {
                        const opacity = 1 - dist / connectionDistance;
                        ctx.beginPath();
                        ctx.moveTo(point.x, point.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(${color}, ${opacity * 0.2})`; // Faint lines
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        // Initialize
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [color]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ width, height }}
        />
    );
}

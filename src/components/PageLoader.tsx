"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Wait for page to be fully loaded
    const handleLoad = () => {
      // Small delay to ensure smooth experience
      setTimeout(() => {
        setFadeOut(true);
        // Remove loader after fade animation
        setTimeout(() => setIsLoading(false), 500);
      }, 800);
    };

    if (typeof window !== 'undefined') {
      if (document.readyState === "complete") {
        handleLoad();
      } else {
        window.addEventListener("load", handleLoad);
        return () => window.removeEventListener("load", handleLoad);
      }
    }
  }, []);

  if (typeof window === 'undefined') return null;
  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-9999 flex items-center justify-center bg-white transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="text-center">
        {/* Animated Logo Container */}
        <div className="relative mb-8 flex justify-center">
          {/* Outer spinning rings */}
          <div className="absolute w-32 h-32">
            <div className="absolute inset-0 border-4 border-red-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-red-600 rounded-full animate-spin"></div>
          </div>
          <div className="absolute w-32 h-32">
            <div className="absolute inset-2 border-4 border-transparent border-t-red-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>

          {/* Center logo/icon */}
          <div className="relative z-10 w-32 h-32 flex items-center justify-center">
            <div className="w-20 h-20 bg-linear-to-br from-red-600 to-red-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* ASPOL Text */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold bg-linear-to-r from-red-600 to-red-500 bg-clip-text text-transparent animate-pulse">
            ASPOL
          </h1>
        </div>

        {/* Loading dots */}
        <div className="flex justify-center gap-2">
          <span
            className="w-3 h-3 bg-red-600 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></span>
          <span
            className="w-3 h-3 bg-red-600 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></span>
          <span
            className="w-3 h-3 bg-red-600 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></span>
        </div>

        {/* Loading text */}
        <p className="mt-6 text-gray-600 text-sm font-medium">
          Loading your community...
        </p>
      </div>
    </div>
  );
}

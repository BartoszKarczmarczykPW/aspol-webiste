"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 via-white to-gray-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className={`max-w-2xl w-full text-center transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Animated 404 */}
        <div className="mb-8">
          <h1 className="text-8xl sm:text-9xl md:text-[10rem] font-bold bg-linear-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-4 animate-pulse">
            404
          </h1>
          <div className="flex justify-center gap-2 mb-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-red-600 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>
        <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed px-4">
          Oops! The page you&apos;re looking for doesn&apos;t exist. It might have been moved or deleted.
        </p>

        {/* Navigation Options */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 px-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-4 bg-red-600 text-white text-lg font-semibold rounded-full hover:bg-red-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl touch-manipulation active:scale-95"
          >
            Go to Homepage
          </Link>
          <Link
            href="/blog"
            className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 text-lg font-semibold rounded-full border-2 border-gray-300 hover:border-red-600 hover:text-red-600 transition-all duration-200 touch-manipulation active:scale-95"
          >
            Visit Blog
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl mx-4">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
            Looking for something specific?
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm sm:text-base">
            <Link
              href="/#about"
              className="text-gray-600 hover:text-red-600 transition-colors font-medium py-2 hover:bg-red-50 rounded-lg"
            >
              About Us
            </Link>
            <Link
              href="/#team"
              className="text-gray-600 hover:text-red-600 transition-colors font-medium py-2 hover:bg-red-50 rounded-lg"
            >
              Our Team
            </Link>
            <Link
              href="/#events"
              className="text-gray-600 hover:text-red-600 transition-colors font-medium py-2 hover:bg-red-50 rounded-lg"
            >
              Events
            </Link>
            <Link
              href="/#contact"
              className="text-gray-600 hover:text-red-600 transition-colors font-medium py-2 hover:bg-red-50 rounded-lg"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

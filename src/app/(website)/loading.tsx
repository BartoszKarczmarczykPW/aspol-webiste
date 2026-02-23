"use client";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-6">
        {/* Elegant pulsing logo placeholder */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Outer Glow */}
          <div className="absolute inset-0 rounded-full bg-aspol-navy/5 animate-pulse" />

          {/* Core Circle */}
          <div className="w-16 h-16 rounded-2xl bg-white border border-aspol-navy/10 shadow-xl flex items-center justify-center relative z-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-aspol-navy/5 to-transparent"></div>

            {/* Minimalist Accent */}
            <div className="w-3 h-3 rounded-full bg-aspol-red animate-pulse" />
          </div>
        </div>

        <div className="space-y-2 text-center">
          <p className="text-aspol-navy font-serif font-medium tracking-[0.2em] text-xs uppercase opacity-80">
            <span aria-hidden="true">Loading</span>
            <span className="sr-only">Loading page content, please wait</span>
          </p>
        </div>
      </div>
    </div>
  );
}

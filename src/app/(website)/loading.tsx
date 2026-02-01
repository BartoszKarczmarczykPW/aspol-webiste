"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        className="flex flex-col items-center gap-6"
      >
        {/* Elegant pulsing logo placeholder */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Outer Glow */}
          <motion.div
            className="absolute inset-0 rounded-full bg-aspol-navy/5"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Core Circle */}
          <div className="w-16 h-16 rounded-2xl bg-white border border-aspol-navy/10 shadow-xl flex items-center justify-center relative z-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-aspol-navy/5 to-transparent"></div>

            {/* Minimalist Accent */}
            <motion.div
              className="w-3 h-3 rounded-full bg-aspol-red"
              animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>

        <div className="space-y-2 text-center">
          <p className="text-aspol-navy font-serif font-medium tracking-[0.2em] text-xs uppercase opacity-80">
            Loading
          </p>
        </div>
      </motion.div>
    </div>
  );
}

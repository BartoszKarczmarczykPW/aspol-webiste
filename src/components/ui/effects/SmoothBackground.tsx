"use client";

import React from "react";

export default function SmoothBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Mesh Gradient Overlay */}
      <div className="absolute inset-0 opacity-60 mix-blend-multiply bg-linear-to-br from-aspol-blue/15 via-transparent to-aspol-red/10 animate-gradient-xy"></div>
      
      {/* Moving Blobs for subtle movement */}
      <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-aspol-blue/10 blur-[100px] animate-blob mix-blend-multiply"></div>
      <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-aspol-red/10 blur-[100px] animate-blob animation-delay-2000 mix-blend-multiply"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[70%] h-[70%] rounded-full bg-blue-100/30 blur-[100px] animate-blob animation-delay-4000 mix-blend-multiply"></div>

      {/* Grid Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#12234805_1px,transparent_1px),linear-gradient(to_bottom,#12234805_1px,transparent_1px)] bg-size-[40px_40px] opacity-20"></div>
    </div>
  );
}

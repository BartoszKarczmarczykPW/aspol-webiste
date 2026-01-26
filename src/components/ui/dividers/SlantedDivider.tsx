"use client";

interface SlantedDividerProps {
  position?: "top" | "bottom";
  color?: string;
  angle?: number; // degrees, simplified to height control for now
  height?: string;
  opacity?: number;
}

export default function SlantedDivider({ 
  position = "bottom", 
  color = "#ffffff",
  height = "80px",
  opacity = 1
}: SlantedDividerProps) {
  
  return (
    <div 
      className={`absolute left-0 w-full overflow-hidden pointer-events-none ${position === "top" ? "top-0" : "bottom-0"}`} 
      style={{ 
        height: height,
        transform: position === "top" ? "rotate(180deg)" : "none",
        opacity: opacity
      }}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute top-0 left-0 w-full h-full block"
      >
        <polygon 
          points="0,0 100,100 0,100" 
          fill={color} 
        />
      </svg>
    </div>
  );
}

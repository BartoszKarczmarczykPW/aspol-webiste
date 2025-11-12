import Image from "next/image";

interface AspolLogoProps {
  className?: string;
  variant?: "default" | "white";
}

export default function AspolLogo({ 
  className = "h-10", 
  variant = "default" 
}: AspolLogoProps) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="/aspol-logo.png"
        alt="ASPOL - Association des Étudiants Polonais en France"
        width={200}
        height={60}
        className={`w-auto h-full object-contain ${
          variant === "white" ? "brightness-0 invert" : ""
        }`}
        priority
        quality={100}
      />
    </div>
  );
}

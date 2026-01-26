export function ChevronDownIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      fill="none" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="2" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
    </svg>
  );
}

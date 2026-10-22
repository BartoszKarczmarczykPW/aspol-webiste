"use client";

import { ReactNode } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { SiteContentProvider } from "@/contexts/SiteContentContext";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <LanguageProvider>
      <SiteContentProvider>{children}</SiteContentProvider>
    </LanguageProvider>
  );
}

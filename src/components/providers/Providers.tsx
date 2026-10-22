"use client";

import { ReactNode } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { SiteContentProvider } from "@/contexts/SiteContentContext";
import { SanityPrefetchProvider, type Prefetch } from "@/contexts/SanityPrefetchContext";

interface ProvidersProps {
  children: ReactNode;
  prefetch?: Prefetch;
}

export default function Providers({ children, prefetch = {} }: ProvidersProps) {
  return (
    <LanguageProvider>
      <SanityPrefetchProvider value={prefetch}>
        <SiteContentProvider>{children}</SiteContentProvider>
      </SanityPrefetchProvider>
    </LanguageProvider>
  );
}

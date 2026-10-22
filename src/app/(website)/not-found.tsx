"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import Pill from "@/components/ui/Pill";

export default function NotFound() {
  const { t } = useLanguage();

  const helpers = [
    { href: "/#about", label: t.notFound.links.about },
    { href: "/#team", label: t.notFound.links.team },
    { href: "/#events", label: t.notFound.links.events },
    { href: "/#contact", label: t.notFound.links.contact },
  ];

  return (
    <div className="on-dark relative flex min-h-screen items-center bg-aspol-navy px-4 pb-16 pt-36 text-white sm:px-6">
      <div className="container-x">
        <p className="display text-[clamp(7rem,28vw,24rem)] leading-[0.78]" aria-hidden="true">
          404
        </p>
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h1 className="display display-lg">{t.notFound.title}</h1>
            <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-white/85">{t.notFound.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Pill href="/">{t.notFound.homeCta}</Pill>
              <Pill href="/blog" variant="ghost" noChip className="px-7">
                {t.notFound.blogCta}
              </Pill>
            </div>
          </div>

          <nav className="lg:col-span-5" aria-label={t.notFound.helperTitle}>
            <h2 className="display display-sm mb-4">{t.notFound.helperTitle}</h2>
            <ul className="border-b border-white/25">
              {helpers.map((link) => (
                <li key={link.href} className="border-t border-white/25">
                  <Link
                    href={link.href}
                    className="flex items-center justify-between py-4 font-display text-lg font-bold transition-[padding] duration-500 ease-(--ease-out-expo) hover:pl-3"
                  >
                    {link.label}
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

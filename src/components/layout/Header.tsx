"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { trackEvent } from "@/lib/analytics";
import Pill from "@/components/ui/Pill";

const LANGS = ["en", "fr", "pl"] as const;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [typing, setTyping] = useState(false);
  const [atFooter, setAtFooter] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { joinUrl } = useSiteContent();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const links = [
    { href: "/#about", label: t.nav.about },
    { href: "/#team", label: t.nav.team },
    { href: "/events", label: t.nav.events },
    { href: "/blog", label: t.nav.blog || "Blog" },
    { href: "/partners", label: t.nav.partners || "Partners" },
    { href: "/#contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      setPastHero(window.scrollY > window.innerHeight * 0.9);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const isField = (el: EventTarget | null) => el instanceof HTMLElement && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName);
    const on = (e: FocusEvent) => isField(e.target) && setTyping(true);
    const off = () => setTyping(false);
    document.addEventListener("focusin", on);
    document.addEventListener("focusout", off);
    return () => {
      document.removeEventListener("focusin", on);
      document.removeEventListener("focusout", off);
    };
  }, []);

  // The footer carries its own Join button, so the floating one steps aside there.
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const io = new IntersectionObserver(([entry]) => setAtFooter(entry.isIntersecting), { threshold: 0.15 });
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    hamburgerRef.current?.focus();
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) closeMobileMenu();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen, closeMobileMenu]);

  // Focus trap for mobile menu (the hamburger stays reachable as the first stop)
  useEffect(() => {
    if (!isMobileMenuOpen || !mobileMenuRef.current) return;

    const menu = mobileMenuRef.current;
    const selector = "a[href], button:not([disabled])";
    const first = menu.querySelector<HTMLElement>(selector);
    first?.focus();

    const handleTabTrap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusable = [hamburgerRef.current, ...Array.from(menu.querySelectorAll<HTMLElement>(selector))].filter(
        (el): el is HTMLElement => !!el,
      );
      if (focusable.length === 0) return;
      const firstEl = focusable[0];
      const lastEl = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };

    document.addEventListener("keydown", handleTabTrap);
    return () => document.removeEventListener("keydown", handleTabTrap);
  }, [isMobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const switchLanguage = (lang: (typeof LANGS)[number], source: string) => {
    setLanguage(lang);
    trackEvent("language_switch", { language: lang, source });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4 pointer-events-none">
      <nav
        className={`pointer-events-auto mx-auto flex max-w-352 items-center justify-between gap-4 rounded-full bg-white py-2 pl-5 pr-2 ring-1 ring-aspol-navy/10 transition-shadow duration-500 ${
          isScrolled ? "shadow-[0_12px_40px_-12px_rgba(18,35,72,0.35)]" : "shadow-none"
        }`}
        aria-label="Main navigation"
      >
        {/* Logo (unmodified brand asset) */}
        <Link href="/" className="flex shrink-0 items-center rounded-full" aria-label="ASPOL home">
          <Image
            src="/aspol-logo-official.png"
            alt="ASPOL - Association of Polish Students in France"
            width={120}
            height={40}
            style={{ width: "auto", height: "auto" }}
            className="h-8 w-auto sm:h-9"
            priority
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 xl:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="nav-link relative block rounded-full px-3.5 py-2 font-display text-[0.8rem] font-extrabold uppercase tracking-[0.04em] whitespace-nowrap text-aspol-dark transition-colors duration-300 hover:text-aspol-red"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* Language switcher */}
          <div
            className="hidden items-center rounded-full bg-aspol-mist p-1 md:flex"
            role="group"
            aria-label="Language switcher"
          >
            {LANGS.map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => switchLanguage(lang, "header_desktop")}
                aria-pressed={language === lang}
                className={`rounded-full px-3 py-1.5 font-display text-[0.7rem] font-extrabold uppercase tracking-wider transition-colors duration-300 ${
                  language === lang
                    ? "bg-aspol-dark text-white"
                    : "text-aspol-dark/70 hover:text-aspol-red"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <Pill
            href={joinUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="dark"
            className="hidden sm:inline-flex"
            onClick={() => trackEvent("join_click", { source: "header_desktop" })}
          >
            {t.nav.join}
          </Pill>

          {/* Mobile menu button */}
          <button
            ref={hamburgerRef}
            type="button"
            className="relative grid size-11 place-items-center rounded-full bg-aspol-dark text-white xl:hidden touch-manipulation active:scale-95 transition-transform"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="relative block h-3 w-5" aria-hidden="true">
              <span
                className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-all duration-500 ease-out ${
                  isMobileMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-5 rounded bg-current transition-all duration-500 ease-out ${
                  isMobileMenuOpen ? "bottom-1/2 translate-y-1/2 -rotate-45" : "bottom-0"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Phones: the header Join pill is hidden, so a thumb-reach button appears after the hero */}
      <div
        className={`pointer-events-none fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 transition-[transform,opacity] duration-500 ease-(--ease-out-expo) sm:hidden ${
          pastHero && !isMobileMenuOpen && !typing && !atFooter ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
        aria-hidden={!(pastHero && !isMobileMenuOpen && !typing && !atFooter)}
      >
        <Pill
          href={joinUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="dark"
          tabIndex={pastHero && !isMobileMenuOpen && !typing && !atFooter ? 0 : -1}
          onClick={() => trackEvent("join_click", { source: "floating_mobile" })}
          className="pointer-events-auto ring-2 ring-white shadow-[0_16px_40px_-12px_rgba(18,35,72,0.6)]"
        >
          {t.nav.join}
        </Pill>
      </div>

      {/* Mobile menu: full-screen brand-blue sheet that opens as a circle from the button */}
      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        inert={!isMobileMenuOpen}
        className={`on-dark pointer-events-auto fixed inset-0 -z-10 flex flex-col bg-aspol-navy px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-28 text-white transition-[clip-path,visibility] duration-700 ease-(--ease-out-expo) xl:hidden ${
          isMobileMenuOpen
            ? "visible [clip-path:circle(150%_at_calc(100%-2.75rem)_2.75rem)]"
            : "invisible [clip-path:circle(0%_at_calc(100%-2.75rem)_2.75rem)]"
        }`}
      >
        <ul className="flex flex-1 flex-col justify-center gap-1">
          {links.map((link, i) => (
            <li key={link.href} className="overflow-hidden">
              <Link
                href={link.href}
                onClick={closeMobileMenu}
                style={{ transitionDelay: isMobileMenuOpen ? `${150 + i * 60}ms` : "0ms" }}
                className={`display display-md block py-2 transition-all duration-700 ease-(--ease-out-expo) hover:text-aspol-white/70 ${
                  isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2" role="group" aria-label="Language switcher">
            {LANGS.map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => {
                  switchLanguage(lang, "header_mobile");
                  closeMobileMenu();
                }}
                aria-pressed={language === lang}
                className={`min-h-11 flex-1 rounded-full font-display text-sm font-extrabold uppercase tracking-wider transition-colors ${
                  language === lang ? "bg-white text-aspol-navy" : "bg-white/12 text-white hover:bg-white/20"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
          <Pill
            href={joinUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackEvent("join_click", { source: "header_mobile" });
              closeMobileMenu();
            }}
            className="justify-between"
          >
            {t.nav.join}
          </Pill>
        </div>
      </div>
    </header>
  );
}

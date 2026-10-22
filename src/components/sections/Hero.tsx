"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteContent } from "@/contexts/SiteContentContext";
import Pill from "@/components/ui/Pill";
import Reveal from "@/components/ui/Reveal";
import { ChevronDownIcon } from "@/components/icons/ChevronDownIcon";
import { PHOTOS, photoAlt } from "@/lib/photos";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { t, language } = useLanguage();
  const { settings, home, text, image, joinUrl } = useSiteContent();
  const heroImg = image(home.heroImage);
  const photo = PHOTOS.hallWide;

  // Scroll-linked "rising dome": the photo dome widens from ~62% to full width
  // while the hero scrolls away. One rAF-throttled listener, no layout reads
  // beyond window.scrollY. Reduced-motion users get the final (wide) state.
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.style.setProperty("--p", "1");
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const p = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * 0.7)));
      el.style.setProperty("--p", p.toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="on-dark relative flex min-h-svh flex-col overflow-hidden bg-aspol-navy text-white"
      style={{ ["--p" as string]: 0 }}
    >
      <div className="container-x relative z-10 flex flex-1 flex-col pt-28 sm:pt-36">
        <p className="mb-6 flex items-center gap-4 font-display text-sm font-bold tracking-wide text-white/85 sm:mb-8">
          <span className="h-px w-12 bg-white/60" aria-hidden="true" />
          {settings.foundedLabel || "Est. 2016 • Paris, France"}
        </p>

        <Reveal
          as="h1"
          immediate
          className="display display-xl max-w-[16ch]"
          text={`${text(home.heroWelcome, t.hero.welcome)} ASPOL`}
        />
        <span className="sr-only"> — {text(home.heroSubtitle, t.hero.subtitle)}</span>

        <div className="mt-8 grid gap-8 sm:mt-12 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-16">
          <div className="max-w-xl">
            <p className="font-display text-xl font-bold leading-snug text-white sm:text-2xl">
              {text(home.heroSubtitle, t.hero.subtitle)}
            </p>
            <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
              {text(home.heroDescription, t.hero.description)}
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center lg:justify-end">
            <Pill href={joinUrl} target="_blank" rel="noopener noreferrer">
              {text(home.heroJoinLabel, t.hero.joinButton)}
            </Pill>
            <Pill href="/partners" variant="ghost" noChip className="px-7">
              {text(home.heroPartnerLabel, t.hero.partnerButton || "Become a Partner")}
            </Pill>
          </div>
        </div>

        <button
          type="button"
          className="mt-10 hidden w-fit items-center gap-3 rounded-full py-2 pr-4 text-sm font-semibold text-white/80 transition-colors hover:text-white sm:inline-flex"
          onClick={() => heroRef.current?.nextElementSibling?.scrollIntoView({ behavior: "smooth" })}
          aria-label={t.hero.scrollDown}
        >
          <span className="grid size-9 place-items-center rounded-full ring-1 ring-white/40" aria-hidden="true">
            <ChevronDownIcon className="size-4 motion-safe:animate-bounce" />
          </span>
          {t.hero.scrollDown}
        </button>
      </div>

      {/* Rising dome photograph */}
      <div className="relative mt-10 flex justify-center sm:mt-6">
        <div
          className="relative aspect-[1.18/1] w-full overflow-hidden bg-aspol-dark [border-radius:50%_50%_0_0/calc(150px_-_70px*var(--p))_calc(150px_-_70px*var(--p))_0_0] sm:aspect-[2.3/1] sm:w-[calc(78%+22%*var(--p))] sm:[border-radius:50%_50%_0_0/100%_100%_0_0]"
        >
          <Image
            src={heroImg?.src ?? photo.src}
            alt={heroImg?.alt || photoAlt("hallWide", language)}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_45%]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-aspol-dark/40 via-transparent to-aspol-blue/30" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

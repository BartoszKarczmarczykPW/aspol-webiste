import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type Tone = "blue" | "dark" | "red";

interface PageHeroProps {
  /** Short label above the title (plain text with a rule, no pill). */
  badge?: string;
  title: string;
  subtitle?: string;
  /** Buttons / links shown under the subtitle. */
  actions?: ReactNode;
  /** Optional right-hand column (photo, summary card…). */
  aside?: ReactNode;
  /** Full-width content under the title block (e.g. a photo strip). */
  children?: ReactNode;
  tone?: Tone;
  className?: string;
  /** Override the headline size (long article titles). */
  titleClassName?: string;
}

const toneClass: Record<Tone, string> = {
  blue: "bg-aspol-navy",
  dark: "bg-aspol-dark",
  red: "bg-aspol-red",
};

/**
 * Shared hero for inner pages: a flat brand-colour field, poster-weight
 * headline with the word-mask reveal, and a convex curved bottom edge that
 * echoes the home page's dome transitions. Inner pages keep their own body
 * content untouched below it.
 */
export default function PageHero({ badge, title, subtitle, actions, aside, children, tone = "blue", className, titleClassName }: PageHeroProps) {
  return (
    <section
      className={cn(
        "on-dark relative overflow-hidden pb-20 pt-32 text-white sm:pb-28 sm:pt-40",
        "[border-radius:0_0_50%_50%/0_0_clamp(40px,7vw,110px)_clamp(40px,7vw,110px)]",
        toneClass[tone],
        className,
      )}
    >
      <div className="container-x">
        <div className={cn("grid gap-12", aside && "lg:grid-cols-12 lg:items-center lg:gap-14")}>
          <div className={cn(aside && "lg:col-span-7")}>
            {badge && (
              <p className="mb-6 flex items-center gap-4 font-display text-sm font-bold tracking-wide text-white/85">
                <span className="h-px w-12 bg-white/60" aria-hidden="true" />
                {badge}
              </p>
            )}
            <Reveal
              as="h1"
              immediate
              className={cn("display text-[clamp(2.5rem,7.4vw,6.75rem)] leading-[0.92] [overflow-wrap:anywhere]", titleClassName)}
              text={title}
            />
            {subtitle && (
              <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-white/85 sm:mt-8 sm:text-xl">{subtitle}</p>
            )}
            {actions && <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">{actions}</div>}
          </div>
          {aside && <div className="lg:col-span-5">{aside}</div>}
        </div>
        {children}
      </div>
    </section>
  );
}

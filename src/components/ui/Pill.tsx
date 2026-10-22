import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "light" | "dark" | "red" | "blue" | "ghost";

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  /** Hide the arrow chip (label-only pill). */
  noChip?: boolean;
}

type PillLinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

type PillButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

const variantClass: Record<Variant, string> = {
  light: "",
  dark: "pill--dark",
  red: "pill--red",
  blue: "pill--blue",
  ghost: "pill--ghost",
};

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function Chip() {
  return (
    <span className="pill__chip" aria-hidden="true">
      <Arrow />
      <Arrow />
    </span>
  );
}

/**
 * Non-interactive pill face, for use inside a parent link/card (a link must
 * not contain another link). Hover state follows the nearest `.group`.
 */
export function PillFace({ children, variant = "light", className }: CommonProps) {
  return (
    <span className={cn("pill pill--face", variantClass[variant], className)}>
      <span>{children}</span>
      <Chip />
    </span>
  );
}

/**
 * Pill CTA: bold label + circular arrow chip. The arrow swaps on hover/focus
 * (CSS only, see `.pill` in globals.css). Renders a Next <Link> for internal
 * hrefs, a plain <a> for external ones, and a <button> without href.
 */
export default function Pill(props: PillLinkProps | PillButtonProps) {
  const { children, variant = "light", className, noChip, ...rest } = props;
  const classes = cn("pill", variantClass[variant], noChip && "pill--nochip", className);
  const content = (
    <>
      <span>{children}</span>
      {!noChip && <Chip />}
    </>
  );

  if ("href" in rest && rest.href) {
    const { href, ...anchor } = rest as PillLinkProps;
    const external = /^(https?:)?\/\//.test(href) || href.startsWith("mailto:");
    if (external) {
      return (
        <a href={href} className={classes} {...(anchor as AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...(anchor as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </Link>
    );
  }

  const button = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={button.type ?? "button"} className={classes} {...button}>
      {content}
    </button>
  );
}

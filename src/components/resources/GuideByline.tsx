import Image from "next/image";

type Lang = "pl" | "en" | "fr";

const LABEL: Record<Lang, { by: string; team: string }> = {
  pl: { by: "Autor poradnika", team: "Zespół ASPOL" },
  en: { by: "Guide written by", team: "The ASPOL team" },
  fr: { by: "Guide rédigé par", team: "L'équipe ASPOL" },
};

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

/**
 * "Written by" signature for a PDF guide. Falls back to the ASPOL team when the
 * editor left the Author field empty in Studio, so every guide is signed.
 */
export default function GuideByline({
  author,
  lang,
  tone = "light",
  className = "",
}: {
  author?: string | null;
  lang: Lang;
  tone?: "light" | "dark";
  className?: string;
}) {
  const l = LABEL[lang];
  const name = author?.trim() || l.team;
  const isTeam = !author?.trim();
  const dark = tone === "dark";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span
        className={`grid size-11 shrink-0 place-items-center overflow-hidden rounded-full font-display text-sm font-extrabold ${
          dark ? "bg-white text-aspol-navy" : "bg-aspol-navy text-white"
        }`}
        aria-hidden="true"
      >
        {isTeam ? <Image src="/aspol-circle.png" alt="" width={44} height={44} className="size-full object-cover" /> : initials(name)}
      </span>
      <p className="leading-tight">
        <span className={`block text-xs font-semibold ${dark ? "text-white/70" : "text-aspol-ink-soft"}`}>{l.by}</span>
        <span className={`block font-display text-base font-bold ${dark ? "text-white" : "text-aspol-dark"}`}>{name}</span>
      </p>
    </div>
  );
}

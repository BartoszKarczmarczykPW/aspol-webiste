"use client";

import { memo } from "react";
import Image from "next/image";
import HackerText from "../ui/HackerText";
import Reveal from "@/components/ui/Reveal";
import Pill from "@/components/ui/Pill";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { useSanityData } from "@/hooks/useSanityData";
import { TeamMember } from "@/types";
import { getTeamMembers } from "@/lib/sanity";
import { urlFor } from "@/sanity/lib/image";

const LEGACY_PHOTO_MAP: Readonly<Record<string, string>> = {
  "Kacper Pabisz": "/KacperPabisz.jpg",
  "Zofia Gostkowska": "/ZosiaGostkowska.jpg",
  "Amelia Ogiela": "/AmeliaOgiela.jpg",
  "Klara Winiarczyk": "/KlaraWiniarczyk.jpg",
  "Aleksandra Kobyłecka": "/AleksandraKobylecka.jpg",
  "Wiktor Dżaman": "/WiktorDzaman.jpg",
  "Marianna Maciąg": "/MariannaMaciag.jpg",
  "Eliza Freret": "/ElizaFreret.jpg",
  "Julianna Ramatowska": "/JuliannaRamatowska.jpg",
  "Alicja Łukasik": "/AlicjaLukasik.png",
  "Bartosz Karczmarczyk": "/BartoszKarczmarczyk.jpg",
  "Wojciech Wiejak": "/WojciechWiejak.jpg",
  "Weronika Sadownik": "/WeronikaSadownik.jpg",
  "Aleksandra Borecka": "/AleksandraBorecka.jpg",
};

interface SanityTeamMember {
  name: string;
  role?: { en?: string; fr?: string; pl?: string };
  linkedin?: string | null;
  photo?: { asset?: { metadata?: { lqip?: string } } };
}

interface MappedTeamMember {
  name: string;
  role: string;
  photoUrl: string;
  linkedin: string | null;
  lqip?: string;
}

const Team = memo(function Team() {
  const { t, language } = useLanguage();
  const { settings, home, text, joinUrl } = useSiteContent();

  const fallbackBoardMembers: TeamMember[] = [
    {
      name: "Zofia Gostkowska",
      role: t.team.coPresident,
      photo: "/ZosiaGostkowska.jpg",
      linkedin: "https://www.linkedin.com/in/zofia-gostkowska-688b4b1a0/",
    },
    {
      name: "Kacper Pabisz",
      role: t.team.coPresident,
      photo: "/KacperPabisz.jpg",
      linkedin: "https://www.linkedin.com/in/kacperpabisz02/",
    },
    {
      name: "Amelia Ogiela",
      role: t.team.partnerships,
      photo: "/AmeliaOgiela.jpg",
      linkedin: "https://www.linkedin.com/in/amelia-zofia-ogiela/",
    },
    {
      name: "Wojciech Wiejak",
      role: t.team.partnershipCoordinator,
      photo: "/WojciechWiejak.jpg",
      linkedin: "https://www.linkedin.com/in/wojciech-wiejak-212a89177/",
    },
    {
      name: "Marianna Maciąg",
      role: t.team.finance,
      photo: "/MariannaMaciag.jpg",
      linkedin: "https://www.linkedin.com/in/marianna-maci%C4%85g-93285632b/",
    },
    {
      name: "Wiktor Dżaman",
      role: t.team.communications,
      photo: "/WiktorDzaman.jpg",
      linkedin: "https://www.linkedin.com/in/wiktor-dzaman/",
    },
    {
      name: "Aleksandra Kobyłecka",
      role: t.team.mentorship,
      photo: "/AleksandraKobylecka.jpg",
      linkedin: "https://www.linkedin.com/in/aleksandra-izabela-koby%C5%82ecka/",
    },
    {
      name: "Klara Winiarczyk",
      role: t.team.communityAmbassador,
      photo: "/KlaraWiniarczyk.jpg",
      linkedin: "https://www.linkedin.com/in/klarawiniarczyk/",
    },
    {
      name: "Alicja Łukasik",
      role: t.team.operations,
      photo: "/AlicjaLukasik.png",
      linkedin: null,
    },
    {
      name: "Eliza Freret",
      role: t.team.culturalEvents,
      photo: "/ElizaFreret.jpg",
      linkedin: "https://www.linkedin.com/in/eliza-freret-a4627028a/",
    },
    {
      name: "Julianna Ramatowska",
      role: t.team.graphicDesign,
      photo: "/JuliannaRamatowska.jpg",
      linkedin: "https://www.linkedin.com/in/julianna-ramatowska-2bb251329/",
    },
    {
      name: "Aleksandra Borecka",
      role: t.team.graphicDesignTeam,
      photo: "/AleksandraBorecka.jpg",
      linkedin: null,
    },
    {
      name: "Weronika Sadownik",
      role: t.team.socialMedia,
      photo: "/WeronikaSadownik.jpg",
      linkedin: "https://www.linkedin.com/in/weronika-sadownik-b6719b258/",
    },
    {
      name: "Bartosz Karczmarczyk",
      role: t.team.webDevelopment,
      photo: "/BartoszKarczmarczyk.jpg",
      linkedin: "https://www.linkedin.com/in/bartosz-karczmarczyk-4a747432b/",
    },
  ];

  const { data: boardMembers } = useSanityData<MappedTeamMember[]>(
    async () => {
      const data = await getTeamMembers();
      if (!Array.isArray(data) || data.length === 0) return null;
      return (data as SanityTeamMember[]).map((member) => ({
        name: member.name,
        role: member.role?.[language] || member.role?.en || "",
        linkedin: member.linkedin || null,
        photoUrl: member.photo
          ? urlFor(member.photo).width(640).height(800).fit("crop").url()
          : LEGACY_PHOTO_MAP[member.name] || "/default-avatar.svg",
        lqip: member.photo?.asset?.metadata?.lqip,
      }));
    },
    { fallback: [], deps: [language] },
  );

  const membersToRender: MappedTeamMember[] =
    boardMembers.length > 0
      ? boardMembers
      : fallbackBoardMembers.map((member) => ({
          name: member.name,
          role: member.role,
          photoUrl: member.photo,
          linkedin: member.linkedin,
          lqip: undefined,
        }));

  return (
    <section
      id="team"
      className="section-pad dome-gap relative overflow-hidden bg-aspol-mist text-aspol-dark"
      aria-label={language === "en" ? "Our team" : language === "fr" ? "Notre équipe" : "Nasz zespół"}
    >
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <Reveal as="h2" className="display display-lg lg:col-span-7" text={text(home.teamTitle, t.team.title)} />
          <p className="max-w-[48ch] text-base leading-relaxed text-aspol-ink-soft sm:text-lg lg:col-span-5">
            {text(home.teamSubtitle, t.team.subtitle)}
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:mt-16 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
          {membersToRender.map((member, index) => (
            <li key={`${member.name}-${index}`} className="group">
              <div className="photo-card relative aspect-4/5 overflow-hidden rounded-[1.75rem] bg-aspol-line transition-[border-radius] duration-700 ease-(--ease-out-expo) group-hover:rounded-[3rem]">
                <Image
                  src={member.photoUrl}
                  alt={`${member.name}, ${member.role} of ASPOL`}
                  fill
                  className="object-cover object-[50%_20%]"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  loading="lazy"
                  placeholder={member.lqip ? "blur" : "empty"}
                  blurDataURL={member.lqip}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/default-avatar.svg";
                  }}
                />
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-3 right-3 grid size-11 place-items-center rounded-full bg-aspol-white text-aspol-dark transition-colors duration-300 hover:bg-aspol-navy hover:text-white"
                    aria-label={`${member.name}'s LinkedIn profile`}
                  >
                    <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                )}
              </div>
              <h3 className="display display-sm mt-4 text-[1.0625rem] sm:text-[length:clamp(1.25rem,2vw,1.625rem)]">
                {member.name === "Bartosz Karczmarczyk" ? <HackerText text={member.name} /> : member.name}
              </h3>
              <p className="mt-1.5 text-sm font-semibold text-aspol-red sm:text-base">{member.role}</p>
              <p className="mt-0.5 text-sm text-aspol-ink-soft">
                {t.team.board} {settings.boardSeason || "2026/27"}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 sm:mt-24 sm:flex-row sm:items-center">
          <p className="display display-md max-w-[24ch]">{text(home.teamJoinText, t.team.joinTeam)}</p>
          <Pill href={joinUrl} target="_blank" rel="noopener noreferrer" variant="red">
            {text(home.teamJoinButton, t.team.becomeVolunteer)}
          </Pill>
        </div>
      </div>
    </section>
  );
});

export default Team;

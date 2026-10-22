"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteContent } from "@/contexts/SiteContentContext";
import { FacebookIcon } from "@/components/icons/FacebookIcon";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { trackEvent } from "@/lib/analytics";
import Pill from "@/components/ui/Pill";
import Reveal from "@/components/ui/Reveal";

const footerDescription: Record<string, string> = {
  en: "Building a prosperous future through Polish-French cooperation since 2016.",
  fr: "Construire un avenir prospère grâce à la coopération polono-française depuis 2016.",
  pl: "Budujemy wspólną przyszłość poprzez współpracę polsko-francuską od 2016 roku.",
};

const linkClass =
  "group relative inline-block py-2.5 text-base sm:py-1 text-white/75 transition-colors duration-300 hover:text-white";
const linkUnderline =
  "absolute inset-x-0 -bottom-0.5 h-px origin-right scale-x-0 bg-current transition-transform duration-500 ease-(--ease-out-expo) group-hover:origin-left group-hover:scale-x-100";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t, language } = useLanguage();
  const { settings, text, joinUrl } = useSiteContent();

  const social = [
    { key: "facebook", label: "Facebook", href: settings.facebookUrl || "https://www.facebook.com/aspologne", Icon: FacebookIcon },
    { key: "instagram", label: "Instagram", href: settings.instagramUrl || "https://www.instagram.com/aspolska/", Icon: InstagramIcon },
    { key: "linkedin", label: "LinkedIn", href: settings.linkedinUrl || "https://www.linkedin.com/company/aspolscpo/", Icon: LinkedInIcon },
  ];

  return (
    <footer
      className="on-dark dome-top relative overflow-hidden bg-aspol-dark pb-28 text-white sm:pb-10"
      role="contentinfo"
    >
      <div className="container-x">
        {/* Statement + join */}
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/15 pb-14 sm:pb-20 lg:flex-row lg:items-end">
          <Reveal
            as="p"
            className="display text-[clamp(1.9rem,4.4vw,4rem)] max-w-[22ch]"
            text={text(settings.footerStatement, footerDescription[language] || footerDescription.en)}
          />
          <Pill
            href={joinUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("join_click", { source: "footer" })}
          >
            {t.nav.join}
          </Pill>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-12 py-14 sm:py-16 md:grid-cols-4">
          {/* Brand: the official logo, unmodified, on its own light chip */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex rounded-2xl bg-aspol-white px-5 py-3.5" aria-label="ASPOL home">
              <Image
                src="/aspol-logo-official.png"
                alt="ASPOL"
                width={120}
                height={40}
                style={{ width: "auto", height: "auto" }}
                className="h-9 w-auto"
              />
            </Link>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer navigation">
            <h4 className="display display-sm mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-0 sm:space-y-1.5">
              <li>
                <Link href="/#about" className={linkClass}>
                  {t.nav.about}
                  <span className={linkUnderline} aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link href="/events" className={linkClass}>
                  {t.nav.events}
                  <span className={linkUnderline} aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link href="/#contact" className={linkClass}>
                  {t.nav.contact}
                  <span className={linkUnderline} aria-hidden="true" />
                </Link>
              </li>
              <li>
                <a
                  href={joinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("join_click", { source: "footer" })}
                  className={linkClass}
                >
                  {t.nav.join}
                  <span className={linkUnderline} aria-hidden="true" />
                </a>
              </li>
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Legal navigation">
            <h4 className="display display-sm mb-4">{t.footer.legal}</h4>
            <ul className="space-y-1.5">
              <li>
                <Link href="/legal-notice" className={linkClass}>
                  {t.footer.legalNotice}
                  <span className={linkUnderline} aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className={linkClass}>
                  {t.footer.privacy}
                  <span className={linkUnderline} aria-hidden="true" />
                </Link>
              </li>
              <li>
                <Link href="/terms-of-use" className={linkClass}>
                  {t.footer.terms}
                  <span className={linkUnderline} aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </nav>

          {/* Social Media */}
          <div>
            <h4 className="display display-sm mb-4">{t.footer.follow}</h4>
            <div className="flex gap-3">
              {social.map(({ key, label, href, Icon }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("social_click", { platform: key, source: "footer" })}
                  className="grid size-12 place-items-center rounded-full bg-white/10 text-white transition-[background-color,color,transform] duration-300 hover:-translate-y-1 hover:bg-white hover:text-aspol-dark touch-manipulation"
                  aria-label={label}
                >
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-start justify-between gap-2 border-t border-white/15 pt-8 text-sm text-white/70 md:flex-row md:items-center">
          <p>
            © {currentYear} ASPOL. {t.footer.rights}
          </p>
          <p>
            Designed & Built by{" "}
            <a
              href="https://www.linkedin.com/in/bartosz-karczmarczyk-4a747432b/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white underline-offset-4 hover:underline"
            >
              Bartosz Karczmarczyk
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

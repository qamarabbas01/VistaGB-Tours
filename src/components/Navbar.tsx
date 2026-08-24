"use client";

import Link from "next/link";
import { useState } from "react";
import LanguageToggle from "@/components/LanguageToggle";
import ThemeToggle from "@/components/ThemeToggle";
import { usePreferences } from "@/components/PreferencesProvider";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t, wishlist, compare } = usePreferences();

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/destinations", label: t.nav.destinations },
    { href: "/tools", label: t.nav.tools },
    { href: "/assistant", label: t.nav.assistant },
    { href: "/about", label: t.nav.about },
    { href: "/blog", label: t.nav.blog },
    { href: "/news", label: t.nav.news },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-teal/20 bg-night/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 md:px-10">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-xl font-semibold tracking-wide text-glacier md:text-2xl">
            VistaGB
          </span>
          <span className="coord-label hidden md:inline">Tours</span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-body text-sm font-medium text-ice transition-colors hover:text-apricot"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/wishlist"
            aria-label={t.nav.wishlist}
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-teal/30 text-ice hover:border-apricot hover:text-apricot"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <path d="M12 21s-6.2-4.35-9.15-8.4C.9 10.05 1.2 6.6 3.75 5.1 6.05 3.75 8.55 4.5 12 7.35 15.45 4.5 17.95 3.75 20.25 5.1c2.55 1.5 2.85 4.95.9 7.5C18.2 16.65 12 21 12 21z" />
            </svg>
            {wishlist.length > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-apricot px-1 text-[0.6rem] font-semibold text-ink">
                {wishlist.length}
              </span>
            ) : null}
          </Link>
          <Link
            href="/compare"
            aria-label="Compare destinations"
            className="relative hidden h-9 w-9 items-center justify-center rounded-full border border-teal/30 text-ice hover:border-apricot hover:text-apricot sm:inline-flex"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <path d="M7 4v16M17 4v16M4 8h6M14 16h6" strokeLinecap="round" />
            </svg>
            {compare.length > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-apricot px-1 text-[0.6rem] font-semibold text-ink">
                {compare.length}
              </span>
            ) : null}
          </Link>
          <ThemeToggle />
          <LanguageToggle />
          <Link
            href="/book"
            className="hidden rounded-full border border-apricot px-5 py-2 text-sm font-medium text-apricot transition-colors hover:bg-apricot hover:text-ink md:inline-flex"
          >
            {t.nav.planTrip}
          </Link>
          <button
            aria-label={t.nav.menu}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span className={`h-px w-6 bg-glacier transition-all ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`h-px w-6 bg-glacier transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`h-px w-6 bg-glacier transition-all ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-teal/20 bg-night px-6 py-4 lg:hidden">
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-body text-base text-ice transition-colors hover:text-apricot"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/wishlist"
                onClick={() => setOpen(false)}
                className="font-body text-base text-ice hover:text-apricot"
              >
                {t.nav.wishlist}
              </Link>
            </li>
            <li>
              <Link
                href="/book"
                onClick={() => setOpen(false)}
                className="inline-block rounded-full border border-apricot px-5 py-2 text-sm font-medium text-apricot"
              >
                {t.nav.planTrip}
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}

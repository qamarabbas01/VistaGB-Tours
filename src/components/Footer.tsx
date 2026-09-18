import Link from 'next/link';
import type { ReactNode } from 'react';
import { FOOTER_COLUMNS } from '@/components/footer/nav';
import { contact } from '@/config/contact';
import { getSocialLinks } from '@/config/site';

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const className = 'text-sm text-ice transition-colors hover:text-apricot';

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export default function Footer() {
  const social = getSocialLinks();

  return (
    <footer className="border-t border-teal/20 bg-slate">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 md:px-10 md:py-16">
        <div className="flex flex-col gap-8 xl:flex-row xl:gap-16">
          <div className="xl:w-56 xl:shrink-0">
            <Link href="/" className="inline-block">
              <p className="font-display text-xl font-semibold tracking-wide text-glacier">
                VistaGB
              </p>
            </Link>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-ice md:mt-3">
              Discover Gilgit-Baltistan.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid min-w-0 flex-1 grid-cols-2 gap-x-6 gap-y-8 sm:gap-10 md:grid-cols-3 lg:grid-cols-5"
          >
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title} className="min-w-0">
                <p className="coord-label mb-3 md:mb-4">{column.title}</p>
                <ul className="flex flex-col gap-2">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <FooterLink href={link.href} external={link.external}>
                        {link.label}
                      </FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="col-span-2 min-w-0 md:col-span-1">
              <p className="coord-label mb-3 md:mb-4">Follow</p>
              <ul className="flex flex-row flex-wrap gap-x-5 gap-y-2 lg:flex-col lg:gap-2">
                <li>
                  <FooterLink href={social.instagram} external>
                    Instagram
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href={social.facebook} external>
                    Facebook
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href={social.youtube} external>
                    YouTube
                  </FooterLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="altitude-line my-8" />

        <div className="flex flex-col items-start justify-between gap-3 text-xs text-ice md:flex-row md:items-center md:gap-4">
          <p>
            &copy; {new Date().getFullYear()} VistaGB Tours. All rights
            reserved.
          </p>
          <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-1">
            {contact.location.label ? (
              <p className="break-words">{contact.location.label}</p>
            ) : null}
            {contact.email ? (
              <a
                href={`mailto:${contact.email}`}
                className="break-all hover:text-apricot"
              >
                {contact.email}
              </a>
            ) : (
              <Link href="/contact" className="hover:text-apricot">
                Contact
              </Link>
            )}
            {contact.location.coords ? (
              <p className="coord-label break-words">
                {contact.location.coords}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
}

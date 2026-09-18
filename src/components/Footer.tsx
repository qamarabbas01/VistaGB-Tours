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
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-16">
        <div className="flex flex-col gap-12 xl:flex-row xl:gap-16">
          <div className="xl:w-56 xl:shrink-0">
            <Link href="/" className="inline-block">
              <p className="font-display text-xl font-semibold tracking-wide text-glacier">
                VistaGB
              </p>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ice">
              Discover Gilgit-Baltistan.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid flex-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
          >
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                <p className="coord-label mb-4">{column.title}</p>
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

            <div>
              <p className="coord-label mb-4">Follow</p>
              <ul className="flex flex-col gap-2">
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

        <div className="flex flex-col items-start justify-between gap-4 text-xs text-ice md:flex-row md:items-center">
          <p>
            &copy; {new Date().getFullYear()} VistaGB Tours. All rights
            reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {contact.location.label ? <p>{contact.location.label}</p> : null}
            {contact.email ? (
              <a
                href={`mailto:${contact.email}`}
                className="hover:text-apricot"
              >
                {contact.email}
              </a>
            ) : (
              <Link href="/contact" className="hover:text-apricot">
                Contact
              </Link>
            )}
            {contact.location.coords ? (
              <p className="coord-label">{contact.location.coords}</p>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
}

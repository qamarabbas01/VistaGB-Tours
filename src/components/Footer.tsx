import Link from "next/link";
import { contact } from "@/config/contact";

export default function Footer() {
  return (
    <footer className="border-t border-teal/20 bg-slate">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="font-display text-xl font-semibold text-glacier">
              VistaGB
            </p>
            <p className="coord-label mt-1">Tours</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ice">
              Curated journeys through the Karakoram, Hunza, Skardu and the
              high valleys of Gilgit-Baltistan.
            </p>
          </div>

          <div>
            <p className="coord-label mb-4">Explore</p>
            <ul className="flex flex-col gap-2 text-sm text-ice">
              <li><Link href="/" className="hover:text-apricot">Home</Link></li>
              <li><Link href="/destinations" className="hover:text-apricot">Destinations</Link></li>
              <li><Link href="/blog" className="hover:text-apricot">Blog</Link></li>
              <li><Link href="/news" className="hover:text-apricot">News</Link></li>
            </ul>
          </div>

          <div>
            <p className="coord-label mb-4">Company</p>
            <ul className="flex flex-col gap-2 text-sm text-ice">
              <li><Link href="/contact" className="hover:text-apricot">Contact</Link></li>
              <li><Link href="/about" className="hover:text-apricot">About Us</Link></li>
              <li><Link href="/privacy" className="hover:text-apricot">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-apricot">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <p className="coord-label mb-4">Reach Us</p>
            <ul className="flex flex-col gap-2 text-sm text-ice">
              <li>Skardu, Gilgit-Baltistan, Pakistan</li>
              <li>
                <a href={`mailto:${contact.email}`} className="hover:text-apricot">
                  {contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${contact.phone.tel}`} className="hover:text-apricot">
                  {contact.phone.display}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="altitude-line my-8" />

        <div className="flex flex-col items-center justify-between gap-4 text-xs text-ice md:flex-row">
          <p>&copy; {new Date().getFullYear()} VistaGB Tours. All rights reserved.</p>
          <p className="coord-label">35.8°N · 75.5°E · ALT 2228M</p>
        </div>
      </div>
    </footer>
  );
}

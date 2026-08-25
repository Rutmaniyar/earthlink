import { Link } from "@tanstack/react-router";
import { COMPANY } from "@/content/company";
import { DESTINATIONS } from "@/content/destinations";
import { SERVICES } from "@/content/company";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/lead";
import { openCookieSettings } from "@/lib/cookie-consent";
import logoUrl from "@/assets/earthlink-logo-small.png";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-navy-deep text-white">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 font-serif text-2xl text-white">
            <img
              src={logoUrl}
              alt="Earthlink Consultants UK"
              width={40}
              height={40}
              loading="lazy"
              className="h-10 w-10 object-contain"
            />
            Earthlink Consultants
          </div>
          <p className="mt-4 max-w-sm text-sm text-white/70">
            Incorporated in {COMPANY.founded} and continuously trading since then. Worldwide
            education, non-UK visa, and job-search support from Harrow. Stonebridge alone handles UK
            immigration.
          </p>
          <div className="mt-6 space-y-2 text-sm text-white/80">
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-gold" />
              {COMPANY.address.line1}, {COMPANY.address.line2}, {COMPANY.address.city}{" "}
              {COMPANY.address.postcode}
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gold" />
              <a href={`tel:${COMPANY.phoneHref}`} className="hover:text-gold">
                {COMPANY.phone}
              </a>
            </p>
            <p className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-gold" />
              <a
                href={whatsappLink({}, "Footer")}
                target="_blank"
                rel="noopener"
                className="hover:text-gold"
              >
                WhatsApp {COMPANY.phone}
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gold" />
              <a href={`mailto:${COMPANY.email}`} className="hover:text-gold">
                {COMPANY.email}
              </a>
            </p>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-base text-gold">Featured destinations</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {DESTINATIONS.slice(0, 6).map((d) => (
              <li key={d.slug}>
                <Link to="/destination/$slug" params={{ slug: d.slug }} className="link-lime">
                  {d.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/destinations" className="link-lime font-medium">
                All destinations →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-base text-gold">Services</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {SERVICES.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link to="/service/$slug" params={{ slug: s.slug }} className="link-lime">
                  {s.title}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/services" className="link-lime font-medium">
                All services →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-serif text-base text-gold">Company</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/about" className="link-lime">
                About
              </Link>
            </li>
            <li>
              <Link to="/scholarships" className="link-lime">
                Scholarships
              </Link>
            </li>
            <li>
              <Link to="/testimonials" className="link-lime">
                Google reviews
              </Link>
            </li>
            <li>
              <Link to="/faq" className="link-lime">
                FAQ
              </Link>
            </li>

            <li>
              <Link to="/contact" className="link-lime">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="link-lime">
                Privacy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="link-lime">
                Terms
              </Link>
            </li>
            <li>
              <button type="button" onClick={openCookieSettings} className="link-lime text-left">
                Cookie settings
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved.
          </p>
          <p>
            UK education consultancy · UK immigration handled by:{" "}
            <a
              href="https://stonebridgelegal.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-lime"
            >
              {COMPANY.solicitors.name}
            </a>{" "}
            · Made by{" "}
            <a
              href="https://www.aangiart.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="link-lime"
            >
              Aangi Art
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

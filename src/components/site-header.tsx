import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { NAV, COMPANY } from "@/content/company";
import { callLink } from "@/lib/lead";
import logoUrl from "@/assets/earthlink-logo-small.png";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b hairline bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="container-page flex h-16 items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 font-serif text-xl tracking-tight text-navy"
        >
          <img
            src={logoUrl}
            alt="Earthlink Consultants UK"
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
          />
          <span>Earthlink</span>
        </Link>
        <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: "text-navy after:scale-x-100" }}
              inactiveProps={{
                className: "text-muted-foreground hover:text-brand active:text-navy-deep",
              }}
              className="relative rounded-sm text-[13px] font-medium transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:scale-x-0 after:origin-left after:bg-brand after:transition-transform hover:after:scale-x-100 xl:text-sm"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={callLink()}
            className="hidden items-center gap-2 rounded-sm text-sm text-navy transition-colors hover:text-brand active:text-navy-deep xl:flex"
          >
            <Phone className="h-4 w-4" />
            {COMPANY.phone}
          </a>
          <Link to="/contact" className="btn-primary rounded-sm px-4 py-2 text-sm font-medium">
            Book consultation
          </Link>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="rounded-sm p-2 text-navy transition-all duration-150 hover:bg-secondary hover:text-brand active:scale-95 active:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" className="border-t hairline bg-background lg:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: n.to === "/" }}
                activeProps={{
                  className:
                    "bg-secondary/60 text-navy-deep border-l-2 border-brand pl-[calc(0.5rem-2px)]",
                }}
                inactiveProps={{ className: "text-navy" }}
                className="rounded-sm px-2 py-2 text-base transition-colors hover:bg-secondary hover:text-brand active:bg-brand/15 active:text-navy-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 rounded-sm px-4 py-3 text-center text-sm font-medium"
            >
              Book free consultation
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

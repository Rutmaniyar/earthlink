import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { ScrollProgress } from "@/components/scroll-progress";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ScrollDepth } from "@/components/scroll-depth";
import { ThemeProvider, themeInitScript } from "@/components/theme-provider";
import { COMPANY } from "@/content/company";
import { absUrl } from "@/lib/site-config";
import logoUrl from "@/assets/earthlink-logo.png";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4">
      <div className="max-w-md text-center">
        <p className="font-serif text-7xl text-navy">404</p>
        <h1 className="mt-4 font-serif text-2xl text-navy">Page not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          That link may be old. Head back home or contact us if you were expecting to land somewhere
          specific.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <a href="/" className="rounded-sm bg-secondary px-4 py-2 text-sm text-foreground">
            Go home
          </a>
          <a href="/contact" className="rounded-sm border hairline px-4 py-2 text-sm text-navy">
            Contact us
          </a>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-2xl text-navy">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. Try again or head home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-sm bg-secondary px-4 py-2 text-sm text-foreground"
          >
            Try again
          </button>
          <a href="/" className="rounded-sm border hairline px-4 py-2 text-sm text-navy">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => {
    const homeUrl = absUrl("/");
    const logoAbsUrl = absUrl(logoUrl);
    const organizationId = absUrl("/#organization");
    const websiteId = absUrl("/#website");

    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: "Earthlink Consultants — UK Study, Visa & Recruitment" },
        {
          name: "description",
          content:
            "Earthlink Consultants is a UK-based international education, visa, and recruitment consultancy operating from Harrow since 2018.",
        },
        { name: "author", content: COMPANY.legalName },
        { property: "og:site_name", content: COMPANY.name },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "theme-color", content: "#0B1633" },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "icon", type: "image/png", href: logoUrl },
        { rel: "apple-touch-icon", href: logoUrl },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap",
        },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["Organization", "EducationalOrganization"],
            "@id": organizationId,
            name: COMPANY.legalName,
            alternateName: COMPANY.name,
            url: homeUrl,
            logo: { "@type": "ImageObject", url: logoAbsUrl },
            image: logoAbsUrl,
            email: COMPANY.email,
            telephone: COMPANY.phoneHref,
            foundingDate: String(COMPANY.founded),
            slogan: COMPANY.tagline,
            areaServed: [
              { "@type": "Country", name: "United Kingdom" },
              { "@type": "Place", name: "Worldwide" },
            ],
            address: {
              "@type": "PostalAddress",
              streetAddress: `${COMPANY.address.line1}, ${COMPANY.address.line2}`,
              addressLocality: COMPANY.address.city,
              postalCode: COMPANY.address.postcode,
              addressCountry: "GB",
            },
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: COMPANY.phoneHref,
                email: COMPANY.email,
                contactType: "customer service",
                areaServed: ["GB", "IN", "PK", "NG", "AE"],
                availableLanguage: ["English", "Hindi", "Urdu"],
              },
            ],
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: COMPANY.rating.score,
              reviewCount: COMPANY.rating.reviews,
              bestRating: 5,
              worstRating: 1,
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": websiteId,
            name: COMPANY.name,
            url: homeUrl,
            publisher: { "@id": organizationId },
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: `${absUrl("/blogs")}?q={search_term_string}`,
              },
              "query-input": "required name=search_term_string",
            },
          }),
        },
      ],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ScrollProgress />
        <ScrollReveal />
        <ScrollDepth />
        <div className="relative z-10 flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">
            <Outlet />
          </main>
          <SiteFooter />
          <WhatsAppFab />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

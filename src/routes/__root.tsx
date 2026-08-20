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
import { CookieConsent } from "@/components/cookie-consent";
import { TrustindexCertificate } from "@/components/trustindex-certificate";
import { COMPANY } from "@/content/company";
import { DESTINATIONS } from "@/content/destinations";
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
    const socialPreviewUrl = absUrl("/earthlink-social-preview.jpg");

    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: "Earthlink Consultants | Worldwide Study Support" },
        {
          name: "description",
          content:
            "Earthlink Consultants Limited was incorporated on 9 October 2014 and has traded continuously since then. We now serve applicants in 120+ countries from Harrow; Stonebridge handles UK immigration.",
        },
        { name: "author", content: COMPANY.legalName },
        { property: "og:site_name", content: COMPANY.name },
        { property: "og:type", content: "website" },
        { property: "og:image", content: socialPreviewUrl },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: socialPreviewUrl },
        { name: "theme-color", content: "#0B1633" },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "icon", type: "image/png", href: logoUrl },
        { rel: "apple-touch-icon", href: logoUrl },
        {
          rel: "preload",
          href: "/fonts/inter-latin.woff2",
          as: "font",
          type: "font/woff2",
          crossOrigin: "anonymous",
        },
        {
          rel: "preload",
          href: "/fonts/fraunces-latin.woff2",
          as: "font",
          type: "font/woff2",
          crossOrigin: "anonymous",
        },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["Organization", "EducationalOrganization", "LocalBusiness"],
            "@id": organizationId,
            name: COMPANY.legalName,
            alternateName: COMPANY.name,
            url: homeUrl,
            logo: { "@type": "ImageObject", url: logoAbsUrl },
            image: socialPreviewUrl,
            email: COMPANY.email,
            telephone: COMPANY.phoneHref,
            foundingDate: COMPANY.incorporatedOn,
            identifier: {
              "@type": "PropertyValue",
              propertyID: "Companies House company number",
              value: COMPANY.companyNumber,
            },
            slogan: COMPANY.tagline,
            areaServed: "120+ countries served",
            knowsAbout: [
              "University admissions and application support",
              "Study-abroad education consultancy",
              "Non-UK student and visitor visa support",
              ...DESTINATIONS.map(
                (destination) => `International education applications for ${destination.name}`,
              ),
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
                areaServed: "120+ countries served",
                availableLanguage: ["English", "Hindi", "Urdu"],
              },
            ],
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
    <html lang="en" style={{ colorScheme: "light" }}>
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
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-navy focus:shadow-lg"
          >
            Skip to main content
          </a>
          <SiteHeader />
          <main id="main-content" tabIndex={-1} className="flex-1">
            <Outlet />
          </main>
          <SiteFooter />
          <WhatsAppFab />
          <TrustindexCertificate />
          <CookieConsent />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

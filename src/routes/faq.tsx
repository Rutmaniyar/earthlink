import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { absUrl } from "@/lib/site-config";
import { FAQS } from "@/content/faqs";
import { whatsappLink } from "@/lib/lead";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Earthlink FAQs | Study, Visas & Job Search" },
      {
        name: "description",
        content:
          "Answers about Earthlink's education applications, worldwide visa support, UK referrals to Stonebridge, scholarships, fees, refunds, and job-search help.",
      },
      { property: "og:title", content: "Earthlink FAQs | Study, Visas & Job Search" },
      {
        property: "og:description",
        content:
          "Answers about education applications, worldwide visa support, UK Stonebridge referrals, scholarships, fees, refunds, and job-search help.",
      },
      { property: "og:url", content: absUrl("/faq") },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Earthlink FAQs | Study, Visas & Job Search" },
      {
        name: "twitter:description",
        content:
          "Answers about education applications, worldwide visa support, UK Stonebridge referrals, scholarships, fees, refunds, and job-search help.",
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/faq") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FAQ,
});

function FAQ() {
  const [openItem, setOpenItem] = useState("");

  return (
    <div>
      <section className="bg-secondary text-foreground">
        <div className="container-page py-20">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">FAQ</p>
          <h1 className="mt-3 max-w-3xl font-serif text-5xl text-balance md:text-6xl">
            Questions students actually ask.
          </h1>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            No marketing speak. If your question isn't here, message us — we'll answer it like a
            friend who's done this before.
          </p>
        </div>
      </section>

      <section className="container-page py-20">
        <Accordion
          type="single"
          collapsible
          value={openItem}
          onValueChange={setOpenItem}
          className="mx-auto max-w-3xl"
        >
          {FAQS.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b hairline">
              <AccordionTrigger className="text-left font-serif text-lg text-navy">
                {f.q}
              </AccordionTrigger>
              <AccordionContent
                forceMount
                aria-hidden={openItem !== `item-${i}`}
                className="text-muted-foreground"
              >
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mx-auto mt-12 max-w-3xl rounded border hairline bg-cream p-8 text-center">
          <h2 className="font-serif text-2xl text-navy">Still unsure?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Ask us anything on WhatsApp — usually a reply within the hour during UK office hours.
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <a
              href={whatsappLink({}, "FAQ page")}
              target="_blank"
              rel="noopener"
              className="rounded-sm bg-secondary px-6 py-3 text-sm font-medium text-foreground hover:bg-muted"
            >
              WhatsApp us
            </a>
            <Link to="/contact" className="rounded-sm border hairline px-6 py-3 text-sm text-navy">
              Book consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

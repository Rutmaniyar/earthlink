import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/lib/site-config";
import { COMPANY } from "@/content/company";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Earthlink Consultants" },
      {
        name: "description",
        content:
          "How Earthlink Consultants collects, uses, and protects your personal data under UK GDPR.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Privacy Policy — Earthlink Consultants" },
      {
        property: "og:description",
        content:
          "How Earthlink Consultants collects, uses, and protects your personal data under UK GDPR.",
      },
      { property: "og:url", content: absUrl("/privacy") },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Privacy Policy — Earthlink Consultants" },
      {
        name: "twitter:description",
        content:
          "How Earthlink Consultants collects, uses, and protects your personal data under UK GDPR.",
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/privacy") }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <div className="container-page max-w-3xl py-20">
      <p className="text-xs uppercase tracking-[0.25em] text-brand">Legal</p>
      <h1 className="mt-3 font-serif text-5xl text-navy">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: 1 January 2026</p>

      <div className="prose prose-navy mt-10 max-w-none text-navy/85 [&>h2]:font-serif [&>h2]:text-2xl [&>h2]:text-navy [&>h2]:mt-10 [&>h2]:mb-3 [&>p]:mt-3 [&>p]:leading-relaxed">
        <p>
          {COMPANY.legalName} ("we", "us") is registered in the United Kingdom. We act as the data
          controller for personal information you provide through this website, WhatsApp, email, and
          in-person consultations.
        </p>

        <h2>1. What we collect</h2>
        <p>
          Contact details (name, email, phone), academic information you share (transcripts, English
          scores), financial information needed for visa applications, and message content. We
          collect only what is necessary to advise you.
        </p>

        <h2>2. How we use your information</h2>
        <p>
          To respond to enquiries, prepare your applications, communicate with universities and
          government bodies on your behalf, and (with consent) send you newsletters or scholarship
          updates.
        </p>

        <h2>3. Legal basis</h2>
        <p>
          Performance of a contract (when you engage us as your consultant), legitimate interests
          (responding to your enquiry), and consent (marketing communications).
        </p>

        <h2>4. Sharing</h2>
        <p>
          We share information only with the universities, visa authorities, accommodation
          providers, and partner solicitors necessary to complete the services you've requested. We
          never sell your data.
        </p>

        <h2>5. Retention</h2>
        <p>
          Active client files are retained for 7 years from the last interaction, in line with UK
          regulatory expectations for immigration advice. Marketing-only contacts are removed on
          request.
        </p>

        <h2>6. Your rights</h2>
        <p>
          Under UK GDPR you have the right to access, correct, delete, restrict, or port your data,
          and to object to processing. Email{" "}
          <a className="text-brand underline" href={`mailto:${COMPANY.email}`}>
            {COMPANY.email}
          </a>{" "}
          to exercise any of these.
        </p>

        <h2>7. Cookies</h2>
        <p>
          This website uses essential cookies only. We do not run third-party advertising or
          behavioural-tracking pixels.
        </p>

        <h2>8. Contact</h2>
        <p>
          {COMPANY.legalName}, {COMPANY.address.line1}, {COMPANY.address.line2},{" "}
          {COMPANY.address.city} {COMPANY.address.postcode}, {COMPANY.address.country}. Email{" "}
          {COMPANY.email}. Phone {COMPANY.phone}.
        </p>
      </div>
    </div>
  );
}

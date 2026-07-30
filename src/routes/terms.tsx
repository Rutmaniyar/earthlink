import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/lib/site-config";
import { COMPANY } from "@/content/company";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Earthlink Consultants" },
      {
        name: "description",
        content: "Terms governing use of Earthlink Consultants' website and consultancy services.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Terms of Service — Earthlink Consultants" },
      {
        property: "og:description",
        content: "Terms governing use of Earthlink Consultants' website and consultancy services.",
      },
      { property: "og:url", content: absUrl("/terms") },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Terms of Service — Earthlink Consultants" },
      {
        name: "twitter:description",
        content: "Terms governing use of Earthlink Consultants' website and consultancy services.",
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/terms") }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <div className="container-page max-w-3xl py-20">
      <p className="text-xs uppercase tracking-[0.25em] text-brand">Legal</p>
      <h1 className="mt-3 font-serif text-5xl text-navy">Terms of Service</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: 1 January 2026</p>

      <div className="prose prose-navy mt-10 max-w-none text-navy/85 [&>h2]:font-serif [&>h2]:text-2xl [&>h2]:text-navy [&>h2]:mt-10 [&>h2]:mb-3 [&>p]:mt-3 [&>p]:leading-relaxed">
        <h2>1. Who we are</h2>
        <p>
          {COMPANY.legalName}, registered in the United Kingdom, provides international education
          counselling, visa support, and recruitment services.
        </p>

        <h2>2. Nature of advice</h2>
        <p>
          Our advisers offer guidance based on current published rules of universities and
          immigration authorities. Rules change frequently — we make best efforts to stay current
          but cannot guarantee outcomes such as admission, visa approval, scholarships, or
          employment.
        </p>

        <h2>3. Engagement</h2>
        <p>
          A formal engagement begins only after a signed service agreement and the relevant fee
          instalment is received. Initial consultations are advisory and do not create a contractual
          relationship.
        </p>

        <h2>4. Fees and refunds</h2>
        <p>
          Service fees and refundable milestones are itemised in your service agreement. Government,
          university, and third-party fees (visa, application, courier, translation) are
          non-refundable once paid.
        </p>

        <h2>5. Your responsibilities</h2>
        <p>
          You agree to provide accurate, truthful documentation. We will not submit applications we
          believe contain misrepresentation, in line with UK and destination-country immigration
          law.
        </p>

        <h2>6. Liability</h2>
        <p>
          Our maximum liability for any claim is limited to the professional fees paid to us for the
          matter giving rise to the claim. We are not liable for third-party decisions, including
          visa refusals or admission rejections.
        </p>

        <h2>7. Intellectual property</h2>
        <p>
          All website content, including 3D scenes, copy, and design, is © {COMPANY.legalName}{" "}
          {new Date().getFullYear()}.
        </p>

        <h2>8. Governing law</h2>
        <p>
          These terms are governed by the laws of England and Wales. Disputes are subject to the
          exclusive jurisdiction of the English courts.
        </p>

        <h2>9. Contact</h2>
        <p>
          {COMPANY.legalName}, {COMPANY.address.line1}, {COMPANY.address.line2},{" "}
          {COMPANY.address.city} {COMPANY.address.postcode}. Email {COMPANY.email}.
        </p>
      </div>
    </div>
  );
}

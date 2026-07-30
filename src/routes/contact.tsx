import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/lib/site-config";
import { useState } from "react";
import { z } from "zod";
import { COMPANY, SERVICES } from "@/content/company";
import { DESTINATIONS } from "@/content/destinations";
import { whatsappLink, mailtoLink, callLink } from "@/lib/lead";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Earthlink Consultants — Harrow office, WhatsApp, email" },
      {
        name: "description",
        content:
          "Visit our Harrow office, call +44 7721 069 814 (UK: 07721 069 814), WhatsApp, or email office@earthlink.org.uk. Free 30-minute consultation.",
      },
      { property: "og:title", content: "Contact Earthlink Consultants" },
      {
        property: "og:description",
        content: "We answer the phone. Free 30-minute consultation in person, by call, or video.",
      },
      { property: "og:url", content: absUrl("/contact") },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Contact Earthlink Consultants" },
      {
        name: "twitter:description",
        content: "We answer the phone. Free 30-minute consultation in person, by call, or video.",
      },
    ],
    links: [{ rel: "canonical", href: absUrl("/contact") }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["LocalBusiness", "EducationalOrganization"],
          "@id": absUrl("/contact#localbusiness"),
          name: COMPANY.legalName,
          url: absUrl("/contact"),
          telephone: COMPANY.phoneHref,
          email: COMPANY.email,
          priceRange: "££",
          openingHours: ["Mo-Sa 10:00-19:00"],
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
              availableLanguage: ["English", "Hindi", "Urdu"],
            },
          ],
          areaServed: [
            { "@type": "Country", name: "United Kingdom" },
            { "@type": "Place", name: "Worldwide" },
          ],
          parentOrganization: { "@id": absUrl("/#organization") },
        }),
      },
    ],
  }),
  component: Contact,
});

// Validation schema — matched to how the message is delivered (mailto/WhatsApp URL)
const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(80, "Name is too long"),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z
    .string()
    .trim()
    .max(30, "Phone number looks too long")
    .refine((v) => v === "" || /^[+\d][\d\s()-]{5,}$/.test(v), "Enter a valid phone number")
    .optional()
    .or(z.literal("")),
  country: z.string().min(1),
  service: z.string().min(1),
  intake: z.string().trim().max(40).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .max(1500, "Message is a bit long — try to keep it under 1500 characters")
    .optional()
    .or(z.literal("")),
});
type ContactForm = z.infer<typeof contactSchema>;
type FieldErrors = Partial<Record<keyof ContactForm, string>>;

const EARTHLINK_MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2479.1398422147004!2d-0.31707192337534806!3d51.584000371830896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876153623020411%3A0xb0dbb36aa1d0fb5a!2sEarthlink%20Consultants!5e0!3m2!1sen!2suk!4v1783214564669!5m2!1sen!2suk";

function Contact() {
  const initial: ContactForm = {
    name: "",
    email: "",
    phone: "",
    country: DESTINATIONS[0].name,
    service: SERVICES[0].title,
    intake: "",
    message: "",
  };
  const [form, setForm] = useState<ContactForm>(initial);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState<string>("");

  const addr = `${COMPANY.address.line1}, ${COMPANY.address.line2}, ${COMPANY.address.city} ${COMPANY.address.postcode}, ${COMPANY.address.country}`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Earthlink Consultants ${addr}`)}`;

  function validate(): ContactForm | null {
    const parsed = contactSchema.safeParse(form);
    if (parsed.success) {
      setErrors({});
      return parsed.data;
    }
    const next: FieldErrors = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof ContactForm | undefined;
      if (key && !next[key]) next[key] = issue.message;
    }
    setErrors(next);
    setStatus("error");
    setStatusMsg("Please fix the highlighted fields and try again.");
    // Focus first invalid field
    const first = Object.keys(next)[0];
    if (first) {
      const el =
        document.getElementById(`f-${first}`) ||
        document.getElementById(`s-${first}`) ||
        document.getElementById("contact-message");
      el?.focus();
    }
    return null;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data = validate();
    if (!data) return;
    // Open the user's email client with a pre-filled message.
    // Popup-blocker-safe because this is a direct user-gesture navigation.
    const href = mailtoLink(data, `Consultation — ${data.country} · ${data.service}`);
    window.location.href = href;
    setStatus("sent");
    setStatusMsg(
      "Your email client should have opened with a pre-filled message. Hit send and we'll reply within one working hour.",
    );
  }

  function handleWhatsApp() {
    const data = validate();
    if (!data) return;
    window.open(whatsappLink(data, "Contact form"), "_blank", "noopener");
    setStatus("sent");
    setStatusMsg(
      "WhatsApp opened in a new tab with your message ready to send. We reply within one working hour.",
    );
  }

  function reset() {
    setForm(initial);
    setErrors({});
    setStatus("idle");
    setStatusMsg("");
  }

  return (
    <div>
      <section className="bg-muted text-foreground">
        <div className="container-page py-20">
          <p className="text-xs uppercase tracking-[0.25em] text-gold">Contact</p>
          <h1 className="mt-3 max-w-3xl font-serif text-5xl text-balance md:text-6xl">
            Talk to an adviser this week. We actually pick up.
          </h1>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            Free 30-minute consultation. In person at our Harrow office, on a phone call, or video —
            whatever works for you.
          </p>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="grid gap-12 lg:grid-cols-5">
          <aside className="space-y-4 lg:col-span-2">
            {[
              {
                icon: MapPin,
                title: "Office",
                body: addr,
                action: { href: mapsUrl, label: "Open in Google Maps" },
              },
              {
                icon: Phone,
                title: "Phone",
                body: `${COMPANY.phone}\nUK: ${COMPANY.phoneDomestic}`,
                action: { href: callLink(), label: "Call now" },
              },
              {
                icon: MessageCircle,
                title: "WhatsApp",
                body: `Message ${COMPANY.phone}\nReply within 1 working hour`,
                action: { href: whatsappLink({}, "Contact page"), label: "Open WhatsApp" },
              },
              {
                icon: Mail,
                title: "Email",
                body: COMPANY.email,
                action: { href: mailtoLink(), label: "Compose email" },
              },
              { icon: Clock, title: "Hours", body: "Mon–Sat · 10:00 – 19:00 (UK)", action: null },
            ].map((c) => (
              <div key={c.title} className="rounded border hairline bg-card p-5">
                <div className="flex items-start gap-4">
                  <c.icon className="mt-1 h-5 w-5 text-brand" />
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      {c.title}
                    </p>
                    <p className="mt-1 whitespace-pre-line text-sm text-navy">{c.body}</p>
                    {c.action && (
                      <a
                        href={c.action.href}
                        target="_blank"
                        rel="noopener"
                        className="mt-2 inline-flex items-center gap-1 text-xs text-brand hover:underline"
                      >
                        {c.action.label} <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </aside>

          {status === "sent" ? (
            <div
              role="status"
              aria-live="polite"
              className="rounded border hairline bg-card p-8 lg:col-span-3"
            >
              <div className="flex items-start gap-4">
                <CheckCircle2 className="mt-1 h-6 w-6 text-brand" aria-hidden />
                <div className="flex-1">
                  <h2 className="font-serif text-3xl text-navy">Message ready</h2>
                  <p className="mt-3 text-sm text-navy/80">{statusMsg}</p>
                  <div className="mt-6 rounded border hairline bg-paper p-4 text-sm">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      Summary
                    </p>
                    <dl className="mt-2 grid gap-1 sm:grid-cols-2">
                      <div>
                        <dt className="inline text-muted-foreground">Name: </dt>
                        <dd className="inline text-navy">{form.name}</dd>
                      </div>
                      <div>
                        <dt className="inline text-muted-foreground">Email: </dt>
                        <dd className="inline text-navy">{form.email}</dd>
                      </div>
                      <div>
                        <dt className="inline text-muted-foreground">Destination: </dt>
                        <dd className="inline text-navy">{form.country}</dd>
                      </div>
                      <div>
                        <dt className="inline text-muted-foreground">Service: </dt>
                        <dd className="inline text-navy">{form.service}</dd>
                      </div>
                    </dl>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={reset}
                      className="btn-primary rounded-sm px-6 py-3 text-sm font-medium"
                    >
                      Send another
                    </button>
                    <a
                      href={callLink()}
                      className="rounded-sm border border-navy/20 px-6 py-3 text-sm text-navy hover:border-navy/40"
                    >
                      Call {COMPANY.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <form
              noValidate
              className="space-y-5 rounded border hairline bg-card p-8 lg:col-span-3"
              onSubmit={handleSubmit}
            >
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-brand">Free consultation</p>
                <h2 className="mt-1 font-serif text-3xl text-navy">
                  Tell us a bit and we'll be in touch.
                </h2>
              </div>

              {status === "error" && statusMsg && (
                <div
                  role="alert"
                  className="flex items-start gap-3 rounded border border-red-300 bg-red-50 p-4 text-sm text-red-900"
                >
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  <p>{statusMsg}</p>
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  name="name"
                  label="Your name"
                  required
                  value={form.name}
                  error={errors.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                />
                <Field
                  name="email"
                  label="Email"
                  type="email"
                  required
                  value={form.email}
                  error={errors.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                />
                <Field
                  name="phone"
                  label="Phone / WhatsApp"
                  value={form.phone ?? ""}
                  error={errors.phone}
                  onChange={(v) => setForm({ ...form, phone: v })}
                />
                <Field
                  name="intake"
                  label="Preferred intake"
                  placeholder="e.g. Sep 2026"
                  value={form.intake ?? ""}
                  error={errors.intake}
                  onChange={(v) => setForm({ ...form, intake: v })}
                />
                <Select
                  name="country"
                  label="Destination"
                  value={form.country}
                  onChange={(v) => setForm({ ...form, country: v })}
                  options={DESTINATIONS.map((d) => d.name)}
                />
                <Select
                  name="service"
                  label="Service"
                  value={form.service}
                  onChange={(v) => setForm({ ...form, service: v })}
                  options={SERVICES.map((s) => s.title)}
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="text-xs uppercase tracking-wider text-muted-foreground"
                >
                  Anything we should know?
                </label>
                <textarea
                  id="contact-message"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                  maxLength={1500}
                  className="mt-2 w-full rounded border hairline bg-paper p-3 text-sm text-navy transition-shadow focus:border-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
                  rows={5}
                  value={form.message ?? ""}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                <div className="mt-1 flex justify-between text-xs">
                  {errors.message ? (
                    <p id="contact-message-error" className="text-red-700">
                      {errors.message}
                    </p>
                  ) : (
                    <span />
                  )}
                  <span className="text-muted-foreground">{(form.message ?? "").length}/1500</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="btn-primary rounded-sm px-6 py-3 text-sm font-medium"
                >
                  Send via email
                </button>
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="btn-ghost rounded-sm border border-navy/20 px-6 py-3 text-sm text-navy"
                >
                  Send via WhatsApp
                </button>
                <p className="text-xs text-muted-foreground">
                  No spam. We reply within one working hour.
                </p>
              </div>
            </form>
          )}
        </div>
      </section>

      <section className="bg-paper">
        <div className="container-page py-12">
          <div className="grid overflow-hidden rounded border hairline bg-card lg:grid-cols-[1fr_320px]">
            <div className="aspect-[16/10] min-h-[320px] w-full lg:aspect-auto">
              <iframe
                title="Earthlink Consultants location on Google Maps"
                src={EARTHLINK_MAP_EMBED_SRC}
                className="h-full w-full"
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
            <div className="flex flex-col justify-between gap-6 p-6">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-brand">Find us</p>
                <h2 className="mt-2 font-serif text-2xl text-navy">
                  Earthlink Consultants, Harrow
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{addr}</p>
              </div>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener"
                className="btn-primary inline-flex w-fit items-center gap-2 rounded-sm px-5 py-3 text-sm font-medium"
              >
                Open marker in Google Maps <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({
  name,
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
  error,
}: {
  name: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
}) {
  const id = `f-${name}`;
  const errId = `${id}-error`;
  return (
    <label htmlFor={id} className="block">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
        {required && " *"}
      </span>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? errId : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-2 w-full rounded border bg-paper p-3 text-sm text-navy placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 ${error ? "border-red-400 focus:border-red-500 focus-visible:ring-red-400/40" : "hairline focus:border-brand focus-visible:ring-brand/40"}`}
      />
      {error && (
        <p id={errId} className="mt-1 text-xs text-red-700">
          {error}
        </p>
      )}
    </label>
  );
}

function Select({
  name,
  label,
  value,
  onChange,
  options,
}: {
  name: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  const id = `s-${name}`;
  return (
    <label htmlFor={id} className="block">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded border hairline bg-paper p-3 text-sm text-navy focus:border-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

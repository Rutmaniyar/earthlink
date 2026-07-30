import { COMPANY } from "@/content/company";

export type LeadPayload = {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  country?: string;
  service?: string;
  intake?: string;
  message?: string;
};

export function composeLead(d: LeadPayload, source = "Website") {
  const lines = [
    `New consultation request — ${source}`,
    d.name && `Name: ${d.name}`,
    d.email && `Email: ${d.email}`,
    d.phone && `Phone: ${d.phone}`,
    d.location && `Location: ${d.location}`,
    d.country && `Preferred country: ${d.country}`,
    d.service && `Service: ${d.service}`,
    d.intake && `Intake / timeline: ${d.intake}`,
    d.message && `\nMessage:\n${d.message}`,
  ].filter(Boolean);
  return lines.join("\n");
}

export function whatsappLink(d: LeadPayload = {}, source = "Website") {
  const body = encodeURIComponent(composeLead(d, source));
  // Use web.whatsapp.com/send directly. wa.me redirects desktop browsers to
  // api.whatsapp.com, which some networks and browser extensions block.
  // web.whatsapp.com works on desktop and prompts the app on mobile.
  return `https://web.whatsapp.com/send?phone=${COMPANY.whatsapp}&text=${body}`;
}

export function mailtoLink(d: LeadPayload = {}, subject = "Free consultation request") {
  const body = encodeURIComponent(composeLead(d));
  return `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
}

export function callLink() {
  return `tel:${COMPANY.phoneHref}`;
}

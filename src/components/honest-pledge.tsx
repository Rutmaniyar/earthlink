import { Check, X, Shield, Wallet, MessageSquare, Compass, Heart, Eye, Flag, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { whatsappLink } from "@/lib/lead";
import { COMPANY } from "@/content/company";

/**
 * "Before You Cross Borders, You Cross Doubt" — the 5 emotional phases
 * of the study-abroad decision. Inspired by Excelencia International.
 */
const PHASES = [
  { icon: Compass, name: "Questioning", body: "Is studying abroad even for me? Can my family afford it? Is the return worth it?" },
  { icon: Eye, name: "Clarity", body: "Which country, which course, which budget actually fits — without the agency sales pitch." },
  { icon: Heart, name: "Courage", body: "Saying it out loud to parents. Choosing the harder, better option over the comfortable one." },
  { icon: Flag, name: "Commitment", body: "Applications, deposits, visa file. The point of no return, with someone in your corner." },
  { icon: Sparkles, name: "Becoming", body: "Landing, settling, graduating, working. The version of you the journey was always for." },
];

export function PhasesOfDoubt() {
  return (
    <section className="bg-cream">
      <div className="container-page py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">Before You Cross Borders</p>
          <h2 className="mt-3 font-serif text-4xl text-navy md:text-5xl">You cross doubt first.</h2>
          <p className="mt-4 text-muted-foreground">
            Every student stands at the edge of uncertainty. Our role isn't to push you forward — it's to make sure you're ready. We see five phases, and we sit with you through each one.
          </p>
        </div>
        <ol className="mt-12 grid gap-4 md:grid-cols-3 lg:grid-cols-5">
          {PHASES.map((p, i) => (
            <li
              key={p.name}
              className="group relative rounded-xl border hairline bg-paper p-6 transition hover:-translate-y-0.5 hover:border-brand/40"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-3xl text-brand">0{i + 1}</span>
                <p.icon className="h-5 w-5 text-gold opacity-70 transition group-hover:opacity-100" />
              </div>
              <h3 className="mt-4 font-serif text-lg text-navy">The {p.name} Phase</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/**
 * "What We Do / What We Don't" honest-counselling pledge.
 */
const DO = [
  "Guide you honestly, even when it loses us the case",
  "Advise on career outcomes 5 years out, not just admission",
  "Stay reachable after the visa is stamped",
  "Tell you to wait an intake if the numbers don't work",
];
const DONT = [
  "Pressure you into a country we get paid more for",
  "Recommend universities based on commission tiers",
  "Sell unrealistic post-study work or PR promises",
  "Decide for you — your name goes on the application",
];

export function HonestPledge() {
  return (
    <section className="bg-paper">
      <div className="container-page py-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">Our pledge</p>
            <h2 className="mt-3 font-serif text-4xl text-navy">Honest guidance.<br />No hidden agendas.</h2>
            <p className="mt-4 text-muted-foreground">
              We help students make informed decisions about their international education — not the easiest decision, the best one.
            </p>
            <Link to="/about" className="mt-6 inline-flex text-sm text-navy underline decoration-gold underline-offset-4">
              Why we work this way →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            <div className="rounded-xl border border-brand/25 bg-brand/[0.04] p-6">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand">
                <Check className="h-4 w-4" /> What we do
              </p>
              <ul className="mt-4 space-y-3">
                {DO.map((d) => (
                  <li key={d} className="flex gap-3 text-sm text-navy/85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border hairline bg-secondary/40 p-6">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                <X className="h-4 w-4" /> What we don't
              </p>
              <ul className="mt-4 space-y-3">
                {DONT.map((d) => (
                  <li key={d} className="flex gap-3 text-sm text-navy/80">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * "For Parents, With Care" — trust signals for the people who fund the journey.
 */
const PARENT_POINTS = [
  { icon: Shield, label: "Safety-first decisions", body: "City, halls, and route choices made with parent concerns weighted equally." },
  { icon: Wallet, label: "Transparent finances", body: "Year-1 and year-2 budgets in writing. No surprise fees, no commission games." },
  { icon: MessageSquare, label: "Continuous communication", body: "Parents looped in on every milestone — by WhatsApp, email, or phone." },
  { icon: Heart, label: "Long-term outcomes", body: "We talk PR, jobs, and return options up front — not just the admission letter." },
];

export function ForParents() {
  return (
    <section className="bg-secondary text-foreground">
      <div className="pointer-events-none absolute" />
      <div className="container-page py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">For parents, with care</p>
            <h2 className="mt-3 font-serif text-4xl text-balance md:text-5xl">
              Because trust matters as much as dreams.
            </h2>
            <p className="mt-5 max-w-md text-muted-foreground">
              This journey isn't taken alone — it's shared by families who care deeply about safety, clarity, and what happens after graduation. We guide students forward, and keep parents confidently informed at every step.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="rounded-md bg-gold px-6 py-3 text-sm font-semibold text-navy-deep transition hover:bg-gold-glow"
              >
                Talk to a counsellor
              </Link>
              <a
                href={whatsappLink({}, "Parents enquiry")}
                target="_blank"
                rel="noopener"
                className="rounded-md border border-border px-6 py-3 text-sm transition hover:border-gold hover:text-gold"
              >
                WhatsApp {COMPANY.phone}
              </a>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="grid gap-3 sm:grid-cols-2">
              {PARENT_POINTS.map((p) => (
                <div
                  key={p.label}
                  className="rounded-xl border border-border bg-navy-deep/50 p-6 backdrop-blur transition hover:border-gold/40"
                >
                  <p.icon className="h-6 w-6 text-gold" />
                  <p className="mt-4 font-serif text-lg text-foreground">{p.label}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

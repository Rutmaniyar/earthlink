import { createFileRoute } from "@tanstack/react-router";
import { absUrl } from "@/lib/site-config";

export const Route = createFileRoute("/style-guide")({
  head: () => ({
    meta: [
      { title: "Brand Style Guide — Earthlink Consultants" },
      {
        name: "description",
        content:
          "Internal palette and usage rules for the Earthlink brand: midnight navy, cyan-blue, and lime-green.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Brand Style Guide — Earthlink Consultants" },
      {
        property: "og:description",
        content: "Palette tokens and usage rules for the Earthlink brand.",
      },
      { property: "og:url", content: absUrl("/style-guide") },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Brand Style Guide — Earthlink Consultants" },
      {
        name: "twitter:description",
        content: "Palette tokens and usage rules for the Earthlink brand.",
      },
    ],
  }),
  component: StyleGuidePage,
});

type Swatch = {
  name: string;
  token: string;
  className: string;
  hex: string;
  textClass: string;
  role: string;
};

const swatches: Swatch[] = [
  {
    name: "Midnight Navy (deep)",
    token: "--navy-deep",
    className: "bg-muted",
    hex: "#0B1633",
    textClass: "text-foreground",
    role: "Primary dark surface — hero, footer, dense sections.",
  },
  {
    name: "Navy",
    token: "--navy",
    className: "bg-secondary",
    hex: "#152547",
    textClass: "text-foreground",
    role: "Secondary dark surface — cards on dark, nav backgrounds.",
  },
  {
    name: "Cyan-Blue (brand)",
    token: "--brand",
    className: "bg-brand",
    hex: "#1E78A8",
    textClass: "text-foreground",
    role: "Accessible accent for text, icons, and links on light backgrounds.",
  },
  {
    name: "Cyan Glow",
    token: "--gold-glow",
    className: "bg-gold-glow",
    hex: "#3FA3D6",
    textClass: "text-navy-deep",
    role: "Decorative cyan for 3D highlights and hover states.",
  },
  {
    name: "Lime-Green",
    token: "--gold",
    className: "bg-gold",
    hex: "#BDF24B",
    textClass: "text-navy-deep",
    role: "Hero accents, CTAs on dark, 3D landmark highlights.",
  },
  {
    name: "Amber",
    token: "--amber",
    className: "bg-amber",
    hex: "#D69A3F",
    textClass: "text-navy-deep",
    role: "Star ratings and trust indicators (AA on white).",
  },
  {
    name: "Paper",
    token: "--paper",
    className: "bg-paper border border-navy/10",
    hex: "#FAF7F1",
    textClass: "text-navy-deep",
    role: "Default light background.",
  },
  {
    name: "Ink",
    token: "--ink",
    className: "bg-ink",
    hex: "#0E1422",
    textClass: "text-foreground",
    role: "Body text colour on paper.",
  },
];

const doRules = [
  "Use navy / navy-deep as the dominant surface for hero, footer, and dense feature sections.",
  "Use cyan-blue (text-brand) for eyebrow labels, link arrows, and icons on light backgrounds.",
  "Reserve lime-green for hero accents, primary CTAs on dark, and 3D highlights — it's the spark, not the body.",
  "Use amber only for star ratings and trust badges where lime would feel off-brand.",
  "Pair every coloured surface with text that hits WCAG AA (≥ 4.5:1 for body, ≥ 3:1 for large text).",
];

const dontRules = [
  "Don't use lime-green for body text or links on a white/paper background — contrast fails.",
  "Don't introduce raw hex values in components. Always reach for a semantic token (text-brand, bg-secondary, etc.).",
  "Don't mix lime and amber in the same component — pick one accent per surface.",
  "Don't put cyan-blue text on the cyan-glow background — both sit in the same value range.",
  "Don't fade brand colour below 60% opacity for primary text — use the ink/muted tokens instead.",
];

const pairings = [
  {
    label: "Hero band",
    surface: "bg-muted",
    text: "text-foreground",
    accent: "text-gold",
    note: "Navy surface, paper text, lime eyebrow.",
  },
  {
    label: "Card on paper",
    surface: "bg-paper border border-navy/10",
    text: "text-navy-deep",
    accent: "text-brand",
    note: "Paper surface, navy text, cyan-blue accent.",
  },
  {
    label: "CTA on dark",
    surface: "bg-gold",
    text: "text-navy-deep",
    accent: "text-navy-deep/70",
    note: "Lime button, navy label — highest energy moment.",
  },
  {
    label: "Footer",
    surface: "bg-muted",
    text: "text-foreground/85",
    accent: "text-gold",
    note: "Dense navy, soft paper body, lime highlight links.",
  },
];

function StyleGuidePage() {
  return (
    <div className="bg-paper">
      <header className="bg-muted py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="font-display text-sm uppercase tracking-[0.3em] text-gold">Internal</p>
          <h1 className="mt-3 font-display text-4xl text-foreground sm:text-5xl">
            Brand Style Guide
          </h1>
          <p className="mt-4 max-w-2xl text-foreground/85">
            How navy, cyan-blue, and lime-green work together across the Earthlink site — tokens,
            contrast rules, and approved pairings.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-display text-2xl text-navy-deep">Palette</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {swatches.map((s) => (
            <div
              key={s.token}
              className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-sm"
            >
              <div className={`${s.className} ${s.textClass} flex h-28 items-end p-4`}>
                <span className="font-mono text-xs">{s.hex}</span>
              </div>
              <div className="space-y-2 p-4">
                <p className="font-display text-base text-navy-deep">{s.name}</p>
                <p className="font-mono text-xs text-ink/60">{s.token}</p>
                <p className="text-sm text-ink/75">{s.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-muted py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-2xl text-foreground">Approved pairings</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {pairings.map((p) => (
              <div key={p.label} className={`${p.surface} rounded-2xl p-6 shadow-sm`}>
                <p className={`${p.accent} text-xs uppercase tracking-[0.25em]`}>{p.label}</p>
                <p className={`${p.text} mt-3 font-display text-xl`}>Earthlink Consultants</p>
                <p className={`${p.text} mt-2 text-sm opacity-80`}>{p.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-navy/10 bg-white p-6">
            <h3 className="font-display text-xl text-navy-deep">Do</h3>
            <ul className="mt-4 space-y-3 text-sm text-ink/80">
              {doRules.map((r) => (
                <li key={r} className="flex gap-3">
                  <span aria-hidden className="mt-1 inline-block h-2 w-2 rounded-full bg-gold" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-navy/10 bg-white p-6">
            <h3 className="font-display text-xl text-navy-deep">Don't</h3>
            <ul className="mt-4 space-y-3 text-sm text-ink/80">
              {dontRules.map((r) => (
                <li key={r} className="flex gap-3">
                  <span aria-hidden className="mt-1 inline-block h-2 w-2 rounded-full bg-brand" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-2xl bg-muted p-6 text-foreground">
          <h3 className="font-display text-xl">Quick reference</h3>
          <div className="mt-4 grid gap-3 font-mono text-sm text-foreground/85 sm:grid-cols-2">
            <code>bg-muted · text-foreground</code>
            <code>bg-paper · text-ink</code>
            <code>text-brand (cyan on light)</code>
            <code>text-gold (lime on dark)</code>
            <code>bg-gold · text-navy-deep (CTA)</code>
            <code>text-amber (ratings only)</code>
          </div>
        </div>
      </section>

      <section className="bg-paper py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-2xl text-navy-deep">Interactive states</h2>
          <p className="mt-2 max-w-2xl text-sm text-ink/70">
            Header, footer, and WhatsApp surfaces share these utilities. Hover and click each
            example to see the matched transitions; Tab to one to see the focus ring (cyan on light,
            lime on dark).
          </p>

          <h3 className="mt-10 font-display text-lg text-navy-deep">Utility cheatsheet</h3>
          <div className="mt-4 grid gap-3 font-mono text-xs text-ink/80 sm:grid-cols-2 lg:grid-cols-3">
            {[
              [".btn-primary", "Navy fill → cyan-glow hover, navy-deep active, cyan focus ring"],
              [".btn-accent", "Lime fill → cyan-glow hover (used for high-energy CTAs)"],
              [".btn-ghost", "Transparent → tinted hover, brand border on focus"],
              [".link-brand", "Cyan underline grows in on hover (light surfaces)"],
              [".link-lime", "Lime underline grows in on hover (dark surfaces)"],
              [":focus-visible", "Global ring: cyan on light, lime on dark"],
            ].map(([u, d]) => (
              <div key={u} className="rounded-lg border border-navy/10 bg-white p-3">
                <code className="text-brand">{u}</code>
                <p className="mt-1 font-sans text-[11px] text-ink/70">{d}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <StateExample
              title="Primary button (header CTA)"
              surface="light"
              before={
                <button
                  type="button"
                  className="rounded-sm bg-secondary px-4 py-2 text-sm font-medium text-foreground"
                >
                  Book consultation
                </button>
              }
              after={
                <button
                  type="button"
                  className="btn-primary rounded-sm px-4 py-2 text-sm font-medium"
                >
                  Book consultation
                </button>
              }
              notes="Hover: navy → cyan glow + lift. Active: navy-deep press. Focus: 2px cyan ring offset from paper."
            />

            <StateExample
              title="Header nav link"
              surface="light"
              before={
                <a href="#0" className="text-sm text-muted-foreground">
                  About
                </a>
              }
              after={
                <a
                  href="#0"
                  className="relative rounded-sm text-sm font-medium text-muted-foreground transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:scale-x-0 after:origin-left after:bg-brand after:transition-transform hover:text-brand hover:after:scale-x-100"
                >
                  About
                </a>
              }
              notes="Hover: text shifts to brand cyan, underline slides in left-to-right. Active: navy-deep."
            />

            <StateExample
              title="Mobile hamburger"
              surface="light"
              before={
                <button type="button" className="rounded p-2 text-navy">
                  ☰
                </button>
              }
              after={
                <button
                  type="button"
                  className="rounded-sm p-2 text-navy transition-all duration-150 hover:bg-secondary hover:text-brand active:scale-95 active:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  ☰
                </button>
              }
              notes="Hover: secondary tint + cyan icon. Active: scale-95 press. Focus: cyan ring offset from paper."
            />

            <StateExample
              title="Mobile slide-over link"
              surface="light"
              before={
                <a href="#0" className="block rounded px-2 py-2 text-base text-navy">
                  Services
                </a>
              }
              after={
                <a
                  href="#0"
                  className="block rounded-sm border-l-2 border-transparent px-2 py-2 text-base text-navy transition-colors hover:bg-secondary hover:text-brand active:bg-brand/15 active:text-navy-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset"
                >
                  Services
                </a>
              }
              notes="Hover: tinted bg + cyan text. Active: brand-tinted press. Current route gets a left cyan border."
            />

            <StateExample
              title="Footer link"
              surface="dark"
              before={
                <a href="#0" className="text-sm text-muted-foreground">
                  United Kingdom
                </a>
              }
              after={
                <a
                  href="#0"
                  className="relative inline-block rounded-sm text-sm text-foreground transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:scale-x-0 after:origin-left after:bg-gold after:transition-transform hover:text-gold hover:after:scale-x-100"
                >
                  United Kingdom
                </a>
              }
              notes="Hover: text shifts to lime, underline slides in. Focus: lime ring (visible on navy)."
            />

            <StateExample
              title="WhatsApp adviser chip"
              surface="light"
              before={
                <button
                  type="button"
                  className="rounded-full border hairline px-3 py-1.5 text-xs text-navy"
                >
                  Study abroad
                </button>
              }
              after={
                <button
                  type="button"
                  className="rounded-full border hairline px-3 py-1.5 text-xs text-navy transition-colors hover:border-brand hover:bg-brand/10 hover:text-brand active:bg-brand active:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Study abroad
                </button>
              }
              notes="Hover: cyan border + tint. Active: solid cyan with paper text. Focus: cyan ring."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function StateExample({
  title,
  surface,
  before,
  after,
  notes,
}: {
  title: string;
  surface: "light" | "dark";
  before: React.ReactNode;
  after: React.ReactNode;
  notes: string;
}) {
  const isDark = surface === "dark";
  const panel = isDark ? "bg-muted" : "bg-paper";
  const labelColor = isDark ? "text-muted-foreground" : "text-ink/60";
  return (
    <div className="overflow-hidden rounded-2xl border border-navy/10 bg-white">
      <div className="border-b border-navy/10 p-4">
        <p className="font-display text-base text-navy-deep">{title}</p>
        <p className="mt-1 text-xs text-ink/65">{notes}</p>
      </div>
      <div className="grid grid-cols-2 divide-x divide-navy/10">
        <div
          className={`${panel} flex min-h-[120px] flex-col items-center justify-center gap-2 p-6`}
        >
          <span className={`text-[10px] font-mono uppercase tracking-[0.2em] ${labelColor}`}>
            Before
          </span>
          {before}
        </div>
        <div
          className={`${panel} flex min-h-[120px] flex-col items-center justify-center gap-2 p-6`}
        >
          <span className={`text-[10px] font-mono uppercase tracking-[0.2em] ${labelColor}`}>
            After
          </span>
          {after}
        </div>
      </div>
    </div>
  );
}

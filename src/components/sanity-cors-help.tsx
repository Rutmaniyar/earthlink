import { useState } from "react";
import { Check, Copy, ExternalLink, ShieldAlert } from "lucide-react";
import { SANITY_PROJECT_ID, sanityConfigured } from "@/lib/sanity";

// Origins the browser will use to hit the Sanity CDN. Keep this list in sync
// with what needs to be pasted into sanity.io/manage → API → CORS origins.
const CORS_ORIGINS: Array<{ origin: string; label: string }> = [
  { origin: "http://localhost:8080", label: "Local dev" },
  { origin: "https://*.lovableproject.com", label: "Lovable preview" },
  { origin: "https://*.lovable.app", label: "Lovable published / custom domain" },
];

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          /* clipboard blocked — ignore */
        }
      }}
      className="inline-flex items-center gap-1 rounded-sm border border-border px-2 py-1 text-xs text-navy hover:bg-secondary/50"
      aria-label={`Copy ${value}`}
    >
      {copied ? <Check className="h-3.5 w-3.5 text-brand" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export function SanityCorsHelp({ className = "" }: { className?: string }) {
  const projectId = SANITY_PROJECT_ID;
  const manageUrl = projectId
    ? `https://www.sanity.io/manage/project/${projectId}/api`
    : "https://www.sanity.io/manage";
  const cdnHost = projectId ? `${projectId}.apicdn.sanity.io` : "<project>.apicdn.sanity.io";

  return (
    <section
      aria-labelledby="cors-help-heading"
      className={`rounded-lg border hairline bg-paper p-5 md:p-6 ${className}`}
    >
      <div className="flex items-start gap-3">
        <ShieldAlert className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" />
        <div className="flex-1">
          <h2 id="cors-help-heading" className="font-serif text-lg text-navy">
            Sanity CORS origins
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            The browser fetches content directly from{" "}
            <code className="rounded bg-secondary/60 px-1 py-0.5 text-[12px] text-navy">
              {cdnHost}
            </code>
            . Add every origin below to your Sanity project so requests aren't blocked.
          </p>
        </div>
      </div>

      {!sanityConfigured && (
        <p className="mt-4 rounded-md border hairline bg-secondary/40 p-3 text-xs text-muted-foreground">
          Sanity isn't configured in this build yet. Once the project ID is set, the exact
          management link and CDN host will appear here.
        </p>
      )}

      <ol className="mt-5 space-y-2 text-sm text-navy">
        <li>
          <span className="font-medium">1.</span> Open{" "}
          <a
            href={manageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-brand hover:text-gold"
          >
            sanity.io/manage → API <ExternalLink className="h-3 w-3" />
          </a>
          .
        </li>
        <li>
          <span className="font-medium">2.</span> Under <em>CORS origins</em>, click{" "}
          <em>Add CORS origin</em> and paste each entry below. Leave <em>Allow credentials</em> off
          (public CDN, no token).
        </li>
        <li>
          <span className="font-medium">3.</span> Save, then refresh this app.
        </li>
      </ol>

      <ul className="mt-5 divide-y divide-border rounded-md border hairline bg-secondary/20">
        {CORS_ORIGINS.map((c) => (
          <li key={c.origin} className="flex items-center justify-between gap-3 px-3 py-2.5">
            <div className="min-w-0">
              <div className="truncate font-mono text-[13px] text-navy">{c.origin}</div>
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
                {c.label}
              </div>
            </div>
            <CopyButton value={c.origin} />
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs text-muted-foreground">
        Symptom of a missing origin: the CMS banner says <em>“Couldn't reach the CMS”</em> and the
        browser console logs a CORS error against{" "}
        <code className="rounded bg-secondary/60 px-1 py-0.5 text-[11px]">{cdnHost}</code>.
      </p>
    </section>
  );
}

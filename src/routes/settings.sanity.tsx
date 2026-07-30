import { createFileRoute, Link } from "@tanstack/react-router";
import { absUrl } from "@/lib/site-config";
import { ArrowLeft } from "lucide-react";
import { SanityCorsHelp } from "@/components/sanity-cors-help";

export const Route = createFileRoute("/settings/sanity")({
  head: () => ({
    meta: [
      { title: "Sanity CORS setup — Earthlink Consultants" },
      {
        name: "description",
        content:
          "Add the exact CORS origins to your Sanity project so the CMS can load in this app.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Sanity CORS setup" },
      { property: "og:url", content: absUrl("/settings/sanity") },
    ],
    links: [{ rel: "canonical", href: absUrl("/settings/sanity") }],
  }),
  component: SanitySettingsPage,
});

function SanitySettingsPage() {
  return (
    <div className="bg-paper">
      <div className="container-page py-10 md:py-14">
        <Link
          to="/partner-universities"
          className="inline-flex items-center gap-1 text-sm text-brand hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <header className="mt-4 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-brand">Settings</p>
          <h1 className="mt-2 font-serif text-3xl text-navy md:text-4xl">CMS connection</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            If universities or blog posts aren't loading from the CMS, the browser is likely being
            blocked by CORS. Add each origin below to your Sanity project.
          </p>
        </header>

        <div className="mt-8 max-w-2xl">
          <SanityCorsHelp />
        </div>
      </div>
    </div>
  );
}

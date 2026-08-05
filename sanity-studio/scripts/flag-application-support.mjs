import { getCliClient } from "sanity/cli";

const slugs = [
  "university-of-oxford",
  "university-of-cambridge",
  "imperial-college-london",
  "london-school-of-economics",
  "northeastern-university",
  "university-of-illinois-chicago",
];

const client = getCliClient({ apiVersion: "2026-08-05" });
const records = await client.fetch(
  `*[_type == "university" && slug.current in $slugs]{_id, "slug": slug.current, applicationSupportNote}`,
  { slugs },
);
const found = new Set(records.map((record) => record.slug));
const missing = slugs.filter((slug) => !found.has(slug));
if (missing.length) throw new Error(`Missing university records: ${missing.join(", ")}`);

const pending = records.filter((record) => record.applicationSupportNote !== true);
if (!pending.length) {
  console.log(`No change: all ${slugs.length} verified universities are already flagged.`);
  process.exit(0);
}

let transaction = client.transaction();
for (const record of pending) {
  transaction = transaction.patch(record._id, (patch) =>
    patch.set({ applicationSupportNote: true }),
  );
}
await transaction.commit();
console.log(`Flagged ${pending.length} document(s) across ${slugs.length} verified universities.`);

import { getCliClient } from "sanity/cli";

const paragraphsToPortableText = (paragraphs) =>
  paragraphs.map((text, index) => ({
    _type: "block",
    _key: `p${index}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `s${index}`, text, marks: [] }],
  }));

const updates = [
  {
    slug: "uk-graduate-route-2026",
    excerpt:
      "Eligible non-doctoral applicants receive 2 years if they apply by 31 December 2026 and 18 months from 1 January 2027; doctoral graduates receive 3 years.",
    body: [
      "The UK Graduate Route is unsponsored. Eligible non-doctoral graduates receive 2 years if they apply on or before 31 December 2026 and 18 months if they apply on or after 1 January 2027. PhD and other doctoral graduates receive 3 years.",
      "Use the Graduate Route period to build relevant experience and run a focused job search. Start early, research suitable employers and role requirements, and keep records of your applications.",
      "Common mistakes include waiting until graduation to job hunt, applying only to household-name employers, and relying on assumptions about later immigration options instead of taking advice from Stonebridge.",
      "Earthlink's recruitment service is job-search support only and does not procure sponsorship or arrange sponsor licences. Stonebridge Legal Solutions alone provides UK immigration advice and handles Graduate Route or Skilled Worker applications.",
    ],
  },
  {
    slug: "study-in-uk-complete-guide-2026",
    title: "Study in UK 2026: Costs, Applications and Visa Overview",
    coverCaption: "Study in UK 2026: Costs, Applications and Visa Overview",
    body: [
      "The UK hosts over 680,000 international students across 140+ universities. Tuition ranges from £11,000 to £38,000 per year, with living costs of £12,000–£15,000 outside London and £15,000–£20,000 in London.",
      "Application windows: UCAS opens in September for the following autumn intake. Oxbridge and medicine close in mid-October; most other courses accept until late January, with clearing running through summer.",
      "The Student route requires a CAS, the required financial evidence and English-language evidence where applicable. For the Graduate Route, eligible non-doctoral applications made by 31 December 2026 receive 2 years; applications from 1 January 2027 receive 18 months. Doctoral graduates receive 3 years.",
      "Earthlink may help with the university application. Stonebridge Legal Solutions alone provides UK immigration advice and handles every UK visa form and application.",
    ],
  },
  {
    slug: "study-in-canada-complete-guide",
    title: "Study in Canada: Study permits, PGWP, and pathways after graduation",
    excerpt:
      "Canada’s regular study-permit process, financial evidence, work rights and PGWP eligibility for international students.",
    coverCaption: "Study in Canada: Study permits, PGWP, and pathways after graduation",
    tags: ["Canada", "Study Permit", "PGWP", "Post-Study Options"],
    body: [
      "New applications use Canada’s regular study-permit process. Applicants must show funds for tuition, living expenses and return travel; a GIC is one accepted form of evidence, not a mandatory route requirement.",
      "Graduating from a designated learning institution does not automatically make a student eligible for a PGWP. Current rules can include language and, for some non-degree programmes, field-of-study requirements. Permit length depends on qualification level and programme length; a qualifying master’s programme of at least eight months may lead to a three-year PGWP.",
      "A PGWP does not guarantee permanent residence. Graduates must qualify separately for Express Entry or a provincial programme under the rules in force when they apply.",
    ],
  },
  {
    slug: "study-in-australia-complete-guide",
    body: [
      "The Group of Eight (Melbourne, ANU, Sydney, UNSW, Queensland, Monash, UWA, Adelaide) dominate global rankings. Tuition ranges from AUD 30,000 to AUD 55,000 per year.",
      "The Genuine Student (GS) test replaced GTE in 2024. Answer clearly why this course, why Australia, and what you plan next — vague answers get refused.",
      "Subclass 485 duration depends on stream and qualification. Post-Vocational Education Work is up to 18 months; Post-Higher Education Work is generally 2 years for bachelor’s and coursework master’s qualifications and 3 years for research master’s and doctoral qualifications. Eligible regional graduates may separately qualify for a 1- or 2-year second visa.",
    ],
  },
  {
    slug: "canada-vs-uk-vs-usa",
    body: [
      "UK: 1-year master's, £25,000–£35,000 total, Graduate Route of 2 years for applications by 31 December 2026 or 18 months from 1 January 2027; doctoral graduates receive 3 years.",
      "USA: 2-year master's, $60,000–$120,000 total, 12–36 months OPT, PR via H-1B/EB lottery.",
      "Canada: 1–2 year master's, CAD 40,000–70,000 total, up to 3-year PGWP, direct PR via Express Entry.",
    ],
  },
];

const client = getCliClient({ apiVersion: "2026-08-05" });
const slugs = updates.map((update) => update.slug);
const records = await client.fetch(
  `*[_type == "post" && slug.current in $slugs]{_id, "slug": slug.current}`,
  { slugs },
);
const published = new Set(
  records.filter((record) => !record._id.startsWith("drafts.")).map((record) => record.slug),
);
const missing = slugs.filter((slug) => !published.has(slug));
if (missing.length) throw new Error(`Missing published blog records: ${missing.join(", ")}`);

console.log(
  `Ready to update ${records.length} published/draft document(s) for ${updates.length} posts.`,
);
if (process.argv.includes("--dry-run")) process.exit(0);

let transaction = client.transaction();
for (const record of records) {
  const update = updates.find((candidate) => candidate.slug === record.slug);
  const fields = { ...update };
  const paragraphs = fields.body;
  delete fields.slug;
  delete fields.body;
  const body = paragraphsToPortableText(paragraphs);
  const readMinutes = Math.max(1, Math.ceil(paragraphs.join(" ").trim().split(/\s+/).length / 200));
  transaction = transaction.patch(record._id, (patch) =>
    patch.set({ ...fields, body, readMinutes }),
  );
}
await transaction.commit();
const verified = await client.fetch(
  `*[_type == "post" && slug.current in $slugs]{"slug": slug.current, title, excerpt, "bodyText": pt::text(body)}`,
  { slugs },
);
const stale = verified.filter((record) =>
  /Student Direct Stream|\bSDS\b|2–4 years|2-year post-study work/i.test(
    [record.title, record.excerpt, record.bodyText].filter(Boolean).join(" "),
  ),
);
if (stale.length)
  throw new Error(
    `Stale CMS guidance remains in: ${stale.map((record) => record.slug).join(", ")}`,
  );
console.log(`Updated and verified ${verified.length} Sanity document(s).`);

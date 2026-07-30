// One-shot seed: pushes UNIVERSITY_PARTNERS + BLOGS into Sanity.
// Run with: SANITY_WRITE_TOKEN=<token> bun run scripts/seed-sanity.ts
//
// Idempotent — uses deterministic _ids so re-running upserts.

import { createClient } from "@sanity/client";
import { UNIVERSITY_PARTNERS } from "../src/content/universities";
import { BLOGS } from "../src/content/blogs";

const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("Missing SANITY_WRITE_TOKEN env var");
  process.exit(1);
}

const client = createClient({
  projectId: "yyunt6ld",
  dataset: "production",
  apiVersion: "2024-10-01",
  token,
  useCdn: false,
});

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

async function uploadImageFromUrl(url: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`fetch ${res.status}`);
    const buf = new Uint8Array(await res.arrayBuffer());
    const asset = await client.assets.upload("image", Buffer.from(buf), {
      filename: url.split("/").pop()?.split("?")[0] || "image.jpg",
    });
    return asset._id;
  } catch (err) {
    console.warn("  ! image upload failed:", url, (err as Error).message);
    return null;
  }
}

function paragraphsToPortableText(paragraphs: string[]) {
  return paragraphs.map((text, i) => ({
    _type: "block",
    _key: `p${i}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `s${i}`, text, marks: [] }],
  }));
}

// Public dataset grants match path("*"), so dotted/namespaced IDs are not website-readable.
async function seedCountries() {
  console.log("→ Seeding countries...");
  const tx = client.transaction();
  UNIVERSITY_PARTNERS.forEach((c, i) => {
    tx.createOrReplace({
      _id: `country-${c.slug}`,
      _type: "country",
      country: c.country,
      slug: { _type: "slug", current: c.slug },
      flag: c.flag,
      blurb: c.blurb,
      order: (i + 1) * 10,
    });
  });
  await tx.commit();
  console.log(`  ✓ ${UNIVERSITY_PARTNERS.length} countries`);
}

async function seedUniversities() {
  console.log("→ Seeding universities...");
  let count = 0;
  for (const c of UNIVERSITY_PARTNERS) {
    const tx = client.transaction();
    c.universities.forEach((u, i) => {
      const id = `university-${slugify(u.name)}`;
      tx.createOrReplace({
        _id: id,
        _type: "university",
        name: u.name,
        slug: { _type: "slug", current: slugify(u.name) },
        country: { _type: "reference", _ref: `country-${c.slug}` },
        city: u.city,
        domain: u.domain,
        website: u.website,
        speciality: u.speciality,
        highlights: u.highlights,
        order: (i + 1) * 10,
      });
      count++;
    });
    await tx.commit();
    console.log(`  · ${c.country}: ${c.universities.length}`);
  }
  console.log(`  ✓ ${count} universities`);
}

async function seedAuthor() {
  console.log("→ Seeding author...");
  await client.createOrReplace({
    _id: "author-earthlink-editorial",
    _type: "author",
    name: "Earthlink Editorial",
    role: "Editorial team",
    bio: "The Earthlink Consultants editorial team — UK-based counsellors covering study-abroad news, visa updates, and admissions guides.",
  });
  console.log("  ✓ 1 author");
}

async function seedBlogs() {
  console.log(`→ Seeding ${BLOGS.length} blog posts (uploading cover images)...`);
  for (const b of BLOGS) {
    const id = `post-${b.slug}`;
    const assetId = b.cover ? await uploadImageFromUrl(b.cover) : null;
    const doc: Record<string, unknown> = {
      _id: id,
      _type: "post",
      title: b.title,
      slug: { _type: "slug", current: b.slug },
      excerpt: b.excerpt,
      category: b.category,
      author: { _type: "reference", _ref: "author-earthlink-editorial" },
      publishedAt: b.date,
      readMinutes: b.readMinutes,
      coverCaption: b.coverCaption,
      tags: b.tags,
      body: paragraphsToPortableText(b.body),
    };
    if (assetId) {
      doc.coverImage = {
        _type: "image",
        asset: { _type: "reference", _ref: assetId },
      };
    }
    await client.createOrReplace(doc as never);
    console.log(`  · ${b.slug}`);
  }
  console.log(`  ✓ ${BLOGS.length} posts`);
}

async function main() {
  await seedAuthor();
  await seedCountries();
  await seedUniversities();
  await seedBlogs();
  console.log("\n✅ Seed complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

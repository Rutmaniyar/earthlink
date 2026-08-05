import { defineField, defineType } from "sanity";

export const university = defineType({
  name: "university",
  title: "University",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "country",
      type: "reference",
      to: [{ type: "country" }],
      validation: (r) => r.required(),
    }),
    defineField({ name: "city", type: "string" }),
    defineField({
      name: "domain",
      type: "string",
      description: "Primary domain (e.g. ox.ac.uk) — used to fetch the favicon as a fallback logo.",
    }),
    defineField({ name: "website", type: "url" }),
    defineField({ name: "logo", type: "image", options: { hotspot: true } }),
    defineField({ name: "coverImage", type: "image", options: { hotspot: true } }),
    defineField({
      name: "speciality",
      type: "string",
      description: "Shown on the back of the card.",
    }),
    defineField({
      name: "highlights",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.max(4),
    }),
    defineField({ name: "ranking", type: "string", description: "e.g. Top 50 (QS 2026)" }),
    defineField({ name: "tuitionRange", type: "string", description: "e.g. £22k–£38k /yr" }),
    defineField({
      name: "programs",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "intakes",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({ name: "scholarshipsAvailable", type: "boolean", initialValue: false }),
    defineField({
      name: "applicationSupportNote",
      title: "Application Support Only",
      type: "boolean",
      description:
        "Enable when Earthlink can support the application process but must not present itself as this university's appointed representative.",
      initialValue: false,
    }),
    defineField({ name: "description", type: "blockContent" }),
    defineField({ name: "applyLink", type: "url" }),
    defineField({
      name: "admissions",
      title: "Admissions requirements",
      type: "object",
      fields: [
        { name: "ielts", type: "string", description: "e.g. 6.5 overall, 6.0 in each" },
        { name: "toefl", type: "string", description: "e.g. 90 iBT" },
        { name: "pte", type: "string", description: "e.g. 62 with no section below 55" },
        { name: "duolingo", type: "string", description: "e.g. 115" },
        { name: "gpa", type: "string", description: "e.g. 3.0 / 4.0 or 65%" },
        { name: "gre", type: "string", description: "e.g. 310 (grad only)" },
        { name: "gmat", type: "string", description: "e.g. 650 (MBA)" },
        { name: "sat", type: "string", description: "e.g. 1300 (undergrad only)" },
        { name: "applicationFee", type: "string", description: "e.g. £22 or USD 90" },
        {
          name: "deadlineFall",
          type: "string",
          description: "Application deadline for the Fall / Autumn intake.",
        },
        {
          name: "deadlineSpring",
          type: "string",
          description: "Application deadline for the Spring intake.",
        },
        {
          name: "requiredDocuments",
          type: "array",
          of: [{ type: "string" }],
          options: { layout: "tags" },
          description: "e.g. Transcripts, SOP, LORs, CV, Passport copy",
        },
        {
          name: "notes",
          type: "text",
          rows: 3,
          description: "Anything else applicants should know.",
        },
      ],
    }),
    defineField({ name: "order", type: "number", initialValue: 100 }),
    defineField({
      name: "seo",
      type: "object",
      fields: [
        { name: "title", type: "string" },
        { name: "description", type: "text", rows: 2 },
        { name: "ogImage", type: "image" },
      ],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "city", media: "logo" },
  },
});

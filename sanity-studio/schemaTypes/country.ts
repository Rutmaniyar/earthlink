import { defineField, defineType } from "sanity";

export const country = defineType({
  name: "country",
  title: "Destination Country",
  type: "document",
  fields: [
    defineField({ name: "country", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "country", maxLength: 32 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "flag", type: "string", description: "Emoji flag e.g. 🇬🇧" }),
    defineField({ name: "blurb", type: "text", rows: 3 }),
    defineField({ name: "order", type: "number", initialValue: 100 }),
  ],
  preview: { select: { title: "country", subtitle: "slug.current" } },
});

import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "excerpt", type: "text", rows: 3, validation: (r) => r.max(240) }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: ["UK", "USA", "Canada", "Australia", "Visa", "Scholarships", "Careers", "Guides"],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "author", type: "reference", to: [{ type: "author" }] }),
    defineField({ name: "publishedAt", type: "datetime", validation: (r) => r.required() }),
    defineField({
      name: "coverImage",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({ name: "coverCaption", type: "string" }),
    defineField({
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({ name: "body", type: "blockContent", validation: (r) => r.required() }),
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
    select: { title: "title", subtitle: "category", media: "coverImage" },
  },
});

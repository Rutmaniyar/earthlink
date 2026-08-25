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
      name: "updatedAt",
      title: "Editorially reviewed at",
      type: "date",
      description: "Optional review date. It is not a guarantee that rules remain current.",
    }),
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
      name: "questionSections",
      title: "Question sections",
      description: "Optional direct answers that are also rendered visibly on the guide page.",
      type: "array",
      of: [
        {
          type: "object",
          name: "questionSection",
          fields: [
            defineField({ name: "question", type: "string", validation: (r) => r.required() }),
            defineField({ name: "answer", type: "text", rows: 4, validation: (r) => r.required() }),
            defineField({
              name: "points",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
          preview: { select: { title: "question", subtitle: "answer" } },
        },
      ],
    }),
    defineField({
      name: "sources",
      title: "Official sources",
      description: "Sources displayed on the page. Link to the live authority page.",
      type: "array",
      of: [
        {
          type: "object",
          name: "sourceRef",
          fields: [
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "authority", type: "string", validation: (r) => r.required() }),
            defineField({
              name: "href",
              title: "URL",
              type: "url",
              validation: (r) => r.required().uri({ scheme: ["http", "https"] }),
            }),
            defineField({ name: "description", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "title", subtitle: "authority" } },
        },
      ],
    }),
    defineField({
      name: "updateNotice",
      title: "Update notice",
      description: "Visible reminder that readers must confirm current requirements.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "relatedDestinations",
      title: "Related destination slugs",
      description: "Country hub slugs such as germany or france.",
      type: "array",
      of: [
        {
          type: "string",
          validation: (r) => r.regex(/^[a-z0-9-]+$/, { name: "destination slug" }),
        },
      ],
      options: { layout: "tags" },
    }),
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

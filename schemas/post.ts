import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Blog Posts",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Short summary shown on the blog listing page",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "Used for the category filter pills on the blog listing page",
      options: {
        list: [
          { title: "Engineering", value: "Engineering" },
          { title: "Design", value: "Design" },
          { title: "AI", value: "AI" },
          { title: "Product", value: "Product" },
          { title: "Culture", value: "Culture" },
          { title: "Insights", value: "Insights" },
        ],
      },
      initialValue: "Insights",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt Text",
          description: "Describe the image for accessibility",
        }),
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      initialValue: "Dopmin Team",
    }),
    defineField({
      name: "body",
      title: "Body Content",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alt Text",
            }),
            defineField({
              name: "caption",
              type: "string",
              title: "Caption",
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author",
      media: "coverImage",
    },
    prepare({ title, author, media }) {
      return {
        title,
        subtitle: `by ${author}`,
        media,
      };
    },
  },
});

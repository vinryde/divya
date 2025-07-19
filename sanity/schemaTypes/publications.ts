import { defineType, defineField } from "sanity";
import { BookIcon } from "@sanity/icons"; // Optional icon

export const publication = defineType({
  name: "publication",
  title: "Publication",
  type: "document",
  icon: BookIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "link",
      title: "External Link",
      type: "url",
      validation: (Rule) => Rule.required().uri({
        scheme: ["http", "https"],
      }),
    }),
  ],
});

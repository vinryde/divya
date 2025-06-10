import { defineType, defineField } from "sanity";
import { DocumentsIcon } from "@sanity/icons";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: DocumentsIcon,
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "href", title: "Project Link", type: "url" }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "publishedAt", type: "datetime" }),
    defineField({ name: "category", type: "string" }),
  ],
});

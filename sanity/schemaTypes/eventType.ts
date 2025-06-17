import { defineType, defineField } from "sanity";
import { CalendarIcon } from "@sanity/icons";

export const eventType = defineType({
  name: "event",
  title: "Outreach Event",
  type: "document",
  icon: CalendarIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title of the Conference",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "fundedBy", title: "Funded By", type: "string" }),
    defineField({ name: "date", title: "Date From", type: "date" }),
    defineField({ name: "dateto", title: "Date To", type: "date" }),
    defineField({ name: "collaboration", title: "Collaboration", type: "string" }),
    defineField({ name: "venue", title: "Venue", type: "string" }),
    defineField({
      name: "image",
      title: "Event Image / Brochure",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});

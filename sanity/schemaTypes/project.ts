import { defineType, defineField } from 'sanity';
import { DocumentsIcon } from "@sanity/icons";

export const project = defineType({
  name: 'projectdesc',
  title: 'Project',
  icon: DocumentsIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'sanctionedBudget',
      title: 'Sanctioned Budget',
      type: 'number',
      description: 'Total budget sanctioned for the project',
    }),
    defineField({
      name: 'fundedBy',
      title: 'Funded By',
      type: 'string',
    }),
    defineField({
      name: 'yearsActive',
      title: 'Years Active',
      type: 'string',
      description: 'E.g. "2019–2023" or a range',
    }),
    defineField({
      name: 'status',
      title: 'Project Status',
      type: 'string',
      options: {
        list: [
          { title: 'Running', value: 'running' },
          { title: 'Closed', value: 'closed' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: "subHeading",
      title: "Sub-heading",
      type: "string",
    }),
    defineField({
      name: 'description',
      title: 'Project Description',
      type: 'blockContent', // make sure blockContent is defined in your schema
    }),
    defineField({
      name: 'image',
      title: 'Project Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Used for accessibility and SEO.',
        }),
      ],
    }),
  ],
});

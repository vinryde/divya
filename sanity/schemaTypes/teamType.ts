import { defineField, defineType } from 'sanity';
import { UserIcon } from '@sanity/icons';

export const teamType = defineType({
  name: 'team',
  title: 'Team Member',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'designation',
      title: 'Designation',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.email().error("Please enter a valid email"),
    }),
    
    defineField({
      name: 'category',
      title: 'Team Category',
      type: 'string',
      options: {
        list: [
          { title: 'Project Associates', value: 'project-associates' },
          { title: 'Post-Doctoral Fellows', value: 'post-doctoral-fellows' },
          { title: 'International Doctoral Scholars', value: 'international-doctoral-scholars' },
          { title: 'Doctoral Scholars', value: 'doctoral-scholars' },
          { title: 'Aspire Scholars', value: 'aspire-scholars' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
  ],
});

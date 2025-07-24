import { defineType, defineField } from 'sanity';
import { ImageIcon } from '@sanity/icons';

export const shuffleImageType = defineType({
  name: 'shuffleImage',
  title: 'Shuffle Image',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Optional alternative text for accessibility',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
});

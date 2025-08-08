import { defineType, defineField } from 'sanity';
import { ImageIcon } from '@sanity/icons';

export const dragImage = defineType({
  name: 'DragImage',
  title: 'Drag Image Gallery',
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

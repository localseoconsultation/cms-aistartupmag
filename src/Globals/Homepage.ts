import { seoFields } from '@/components/seoFields'
import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',

  label: 'Homepage',

  access: {
    read: () => true,

    update: ({ req }) => {
      return req.user?.role === 'admin'
    },
  },

  fields: [
    // SEO
    {
      name: 'seo',
      type: 'group',
      label: 'SEO Settings',
      admin: {
        description: 'Search engine and social sharing metadata for the homepage.',
      },
      fields: seoFields,
    },

    // Hero
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'cta',
          type: 'group',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },

    // Featured image
    {
      name: 'featuredImage',
      type: 'group',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
          required: true,
        },
      ],
    },

    // About section
    {
      name: 'about',
      type: 'group',
      fields: [
        {
          name: 'number',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'paragraphs',
          type: 'array',
          minRows: 1,
          fields: [
            {
              name: 'text',
              type: 'textarea',
              required: true,
            },
          ],
        },
      ],
    },

    // Editorial sections
    {
      name: 'editorialSections',
      type: 'group',
      fields: [
        {
          name: 'exploreLabel',
          type: 'text',
          required: true,
        },
        {
          name: 'sections',
          type: 'array',
          minRows: 1,
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },

    // Homepage statistics
    {
      name: 'homepageStats',
      type: 'group',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'imageAlt',
          type: 'text',
          required: true,
        },
        {
          name: 'stats',
          type: 'array',
          minRows: 1,
          fields: [
            {
              name: 'value',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
            {
              name: 'backgroundColor',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}

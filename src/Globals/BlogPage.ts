import { seoFields } from '@/components/seoFields'
import type { GlobalConfig } from 'payload'

export const BlogPage: GlobalConfig = {
  slug: 'blog-page',
  label: 'Blog Page',
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
        description: 'Search engine and social sharing metadata for the blogpage.',
      },
      fields: seoFields,
    },
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
      ],
    },
  ],
}

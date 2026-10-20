import { seoFields } from '@/components/seoFields'
import type { GlobalConfig } from 'payload'

export const NotFoundPage: GlobalConfig = {
  slug: 'not-found-page',
  label: '404 Page',
  admin: {
    group: 'Pages',
  },
  fields: [
    // SEO
    {
      name: 'seo',
      type: 'group',
      label: 'SEO Settings',
      admin: {
        description: 'Search engine and social sharing metadata for the 404 page.',
      },
      fields: seoFields,
    },
    {
      name: 'eyebrow',
      type: 'text',
      required: true,
      defaultValue: '404 — Page Not Found',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'This page or post doesn’t exist.',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue:
        'The page or post you’re looking for may have been moved, removed, or never existed. Let’s get you back to something useful.',
    },
    {
      name: 'cta',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          defaultValue: 'Back to Home',
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          defaultValue: '/',
        },
      ],
    },
  ],
}

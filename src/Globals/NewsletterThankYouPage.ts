import type { GlobalConfig } from 'payload'
import { seoFields } from '@/components/seoFields'

export const NewsletterThankYouPage: GlobalConfig = {
  slug: 'newsletter-thank-you-page',
  label: 'Newsletter Thank You Page',

  admin: {
    group: 'Pages',
  },

  access: {
    read: () => true,
    update: ({ req }) => req.user?.role === 'admin',
  },

  fields: [
    {
      name: 'seo',
      type: 'group',
      label: 'SEO Settings',
      admin: {
        description: 'Search engine and social sharing metadata for the newsletter thank-you page.',
      },
      fields: seoFields,
    },
    {
      name: 'hero',
      type: 'group',
      label: 'Thank You Content',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          required: true,
          defaultValue: "You're in",
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'Thanks for subscribing.',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          defaultValue:
            "You're now subscribed to AI Startup Magazine. We'll send you the latest ideas, startups, technologies, and stories shaping what comes next.",
        },
        {
          name: 'cta',
          type: 'group',
          label: 'Call to Action',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              defaultValue: 'Explore Latest Stories',
            },
            {
              name: 'href',
              type: 'text',
              required: true,
              defaultValue: '/blog',
            },
          ],
        },
      ],
    },
  ],
}

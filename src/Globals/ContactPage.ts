import { seoFields } from '@/components/seoFields'
import type { GlobalConfig } from 'payload'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  label: 'Contact Page',
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
        description: 'Search engine and social sharing metadata for the contact page.',
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
    {
      name: 'contactInformation',
      type: 'group',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'coordinates',
          type: 'group',
          fields: [
            {
              name: 'email',
              type: 'text',
            },
            {
              name: 'phone',
              type: 'text',
            },
            {
              name: 'address',
              type: 'textarea',
            },
          ],
        },
        {
          name: 'socials',
          type: 'group',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'links',
              type: 'array',
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
      ],
    },

    {
      name: 'contactForm',
      type: 'group',
      label: 'Contact Form',
      fields: [
        {
          name: 'eyebrow',
          type: 'text',
          required: true,
          defaultValue: 'Send a message',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'Have something to share?',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          defaultValue:
            'Whether you have a story, partnership idea, or simply want to get in touch, send us a message.',
        },
        {
          name: 'form',
          type: 'relationship',
          relationTo: 'forms',
          required: true,
          admin: {
            description: 'Select the Form Builder form to display on the contact page.',
          },
        },
      ],
    },
  ],
}

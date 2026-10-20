import type { GlobalConfig } from 'payload'

export const Newsletter: GlobalConfig = {
  slug: 'newsletter',
  label: 'Newsletter',
  access: {
    read: () => true,

    update: ({ req }) => {
      return req.user?.role === 'admin'
    },
  },

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
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'inputPlaceholder',
      type: 'text',
      required: true,
    },
    {
      name: 'buttonLabel',
      type: 'text',
      required: true,
    },
    {
      name: 'buttonLoadingLabel',
      type: 'text',
      required: true,
    },
    {
      name: 'note',
      type: 'textarea',
    },
    {
      name: 'successUrl',
      type: 'text',
      required: true,
    },
  ],
}

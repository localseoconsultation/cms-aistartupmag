import type { GlobalConfig } from 'payload'

export const CustomCode: GlobalConfig = {
  slug: 'custom-code',
  label: 'Custom Code',

  access: {
    read: () => true,

    update: ({ req }) => {
      return Boolean(req.user && req.user.role === 'admin')
    },
  },

  fields: [
    {
      name: 'head',
      type: 'textarea',
      label: 'Head Code',
      admin: {
        description:
          'Code snippets inserted inside the HTML head. Use for analytics, verification, and other integrations.',
        rows: 10,
      },
    },
    {
      name: 'bodyStart',
      type: 'textarea',
      label: 'Body Start Code',
      admin: {
        description: 'Code snippets inserted immediately after the opening body tag.',
        rows: 10,
      },
    },
    {
      name: 'footer',
      type: 'textarea',
      label: 'Footer Code',
      admin: {
        description:
          'Code snippets inserted near the end of the body, before the closing body tag.',
        rows: 10,
      },
    },
  ],
}

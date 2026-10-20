// src/collections/Media.ts

import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',

  access: {
    read: () => true,

    create: ({ req }) => {
      return req.user?.role === 'admin'
    },

    update: ({ req }) => {
      return req.user?.role === 'admin'
    },

    delete: ({ req }) => {
      return req.user?.role === 'admin'
    },
  },

  upload: {
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'medium',
        width: 800,
        height: 600,
        position: 'centre',
      },
    ],
  },

  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}

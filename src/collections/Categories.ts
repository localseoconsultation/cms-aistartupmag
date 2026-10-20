import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',

  access: {
    read: ({ req }) => {
      return Boolean(req.user)
    },

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

  admin: {
    useAsTitle: 'name',
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },

    slugField({
      fieldToUse: 'name',
    }),

    {
      name: 'description',
      type: 'textarea',
    },
  ],
}

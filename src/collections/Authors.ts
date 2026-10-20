import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

export const Authors: CollectionConfig = {
  slug: 'authors',

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
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },

    {
      name: 'bio',
      type: 'textarea',
    },

    {
      name: 'website',
      type: 'text',
    },

    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        {
          name: 'linkedin',
          type: 'text',
        },
        {
          name: 'twitter',
          type: 'text',
        },
      ],
    },
  ],
}

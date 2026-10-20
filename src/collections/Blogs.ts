import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

const WORDS_PER_MINUTE = 200

function extractText(node: any): string {
  if (!node) return ''

  // Lexical text node
  if (typeof node.text === 'string') {
    return node.text
  }

  // Lexical node with children
  if (Array.isArray(node.children)) {
    return node.children.map((child: any) => extractText(child)).join(' ')
  }

  return ''
}

function calculateReadingTime(content: any): number {
  if (!content?.root) {
    return 0
  }

  const text = extractText(content.root)

  const words = text.trim().split(/\s+/).filter(Boolean)

  const wordCount = words.length

  if (wordCount === 0) {
    return 0
  }

  return Math.ceil(wordCount / WORDS_PER_MINUTE)
}

export const Blogs: CollectionConfig = {
  slug: 'blogs',

  access: {
    // Admin can read both drafts and published blogs.
    // Blog API can only read published blogs.
    read: ({ req }) => {
      if (req.user?.role === 'admin') {
        return true
      }

      if (req.user?.role === 'blog-api') {
        return {
          _status: {
            equals: 'published',
          },
        }
      }

      return false
    },

    // Only Admin can create blogs.
    create: ({ req }) => {
      return req.user?.role === 'admin'
    },

    // Only Admin can update blogs.
    update: ({ req }) => {
      return req.user?.role === 'admin'
    },

    // Only Admin can delete blogs.
    delete: ({ req }) => {
      return req.user?.role === 'admin'
    },

    // Only Admin can access blog version history.
    readVersions: ({ req }) => {
      return req.user?.role === 'admin'
    },
  },

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'categories', 'readingTime', '_status', 'publishedAt'],
  },

  versions: {
    drafts: true,
  },

  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data?.content) {
          data.readingTime = calculateReadingTime(data.content)
        } else {
          data.readingTime = 0
        }

        return data
      },
    ],
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },

    slugField({
      fieldToUse: 'title',
    }),

    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
    },

    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },

    {
      name: 'content',
      type: 'richText',
      required: true,
    },

    {
      name: 'readingTime',
      type: 'number',
      admin: {
        readOnly: true,
        description: 'Automatically calculated in minutes based on the blog content.',
      },
    },

    {
      name: 'author',
      type: 'relationship',
      relationTo: 'authors',
      required: true,
    },

    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      required: true,
    },

    {
      name: 'tags',
      type: 'text',
      hasMany: true,
    },

    {
      name: 'publishedAt',
      type: 'date',
    },

    {
      name: 'seo',
      label: 'SEO',
      type: 'group',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          admin: {
            components: {
              Field: '@/components/SeoTitleField',
            },
          },
        },

        {
          name: 'metaDescription',
          type: 'textarea',
          admin: {
            components: {
              Field: '@/components/SeoDescriptionField',
            },
          },
        },

        {
          name: 'ogImage',
          label: 'OG Image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}

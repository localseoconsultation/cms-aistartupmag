import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Blogs } from './collections/Blogs'
import { Authors } from './collections/Authors'
import { Categories } from './collections/Categories'

import { Homepage } from './Globals/Homepage'
import { Newsletter } from './Globals/Newsletter'
import { BlogPage } from './Globals/BlogPage'
import { AboutPage } from './Globals/AboutPage'
import { SearchPage } from './Globals/SearchPage'
import { ContactPage } from './Globals/ContactPage'
import { NotFoundPage } from './Globals/NotFoundPage'
import { Logo } from './Globals/Logo'
import { SiteSettings } from './Globals/SiteSettings'
import { ContactThankYouPage } from './Globals/ContactThankYouPage'
import { NewsletterThankYouPage } from './Globals/NewsletterThankYouPage'
import { CustomCode } from './Globals/CustomCode'

import { fields, formBuilderPlugin } from '@payloadcms/plugin-form-builder'

import { extendWithPlaceholder } from './lib/helper'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  collections: [Users, Media, Blogs, Authors, Categories],

  globals: [
    Homepage,
    Newsletter,
    BlogPage,
    AboutPage,
    SearchPage,
    ContactPage,
    ContactThankYouPage,
    NewsletterThankYouPage,
    NotFoundPage,
    Logo,
    SiteSettings,
    CustomCode,
  ],

  cors: ['https://aistartupmag.vercel.app', 'https://aistartupmag.com'],

  maxDepth: 3,

  graphQL: {
    disable: true,
  },

  editor: lexicalEditor(),

  secret: process.env.PAYLOAD_SECRET || '',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),

  sharp,

  plugins: [
  vercelBlobStorage({
    enabled: true,
    collections: {
      media: true,
    },
    token: process.env.BLOB_READ_WRITE_TOKEN,
  }),

    formBuilderPlugin({
      fields: {
        text: extendWithPlaceholder(fields.text),
        textarea: extendWithPlaceholder(fields.textarea),
        email: extendWithPlaceholder(fields.email),
        select: true,
        radio: true,
        checkbox: true,
        number: true,
        message: true,
        date: false,
        payment: false,
      },
    }),
  ],
})

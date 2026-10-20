// reusble for all pages


import type { Field } from "payload";

export const seoFields: Field[] = [
  {
    name: "metaTitle",
    type: "text",
    label: "SEO Title",
    maxLength: 60,
    admin: {
      description:
        "Recommended: around 50–60 characters. Falls back to the page title when empty.",
    },
  },
  {
    name: "metaDescription",
    type: "textarea",
    label: "SEO Description",
    maxLength: 160,
    admin: {
      description:
        "Write a unique, useful summary of this page. Around 150–160 characters is a practical target, not a strict Google limit.",
    },
  },
  {
    name: "canonicalUrl",
    type: "text",
    label: "Canonical URL Override",
    admin: {
      description:
        "Optional absolute URL. Leave empty to generate the canonical URL from the production domain and page route.",
    },
  },
  {
    name: "noIndex",
    type: "checkbox",
    label: "Prevent Search Engine Indexing",
    defaultValue: false,
    admin: {
      description:
        "Enable for pages that should not appear in search results. Do not enable for the public homepage.",
    },
  },
  {
    name: "noFollow",
    type: "checkbox",
    label: "Prevent Crawling of Links",
    defaultValue: false,
    admin: {
      description:
        "Enable only when you intentionally want search engines not to follow links on this page.",
    },
  },
  {
    name: "ogTitle",
    type: "text",
    label: "Open Graph Title",
    maxLength: 95,
    admin: {
      description:
        "Optional title for social sharing. Falls back to the SEO title.",
    },
  },
  {
    name: "ogDescription",
    type: "textarea",
    label: "Open Graph Description",
    admin: {
      description:
        "Optional social sharing description. Falls back to the SEO description.",
    },
  },
  {
    name: "ogImage",
    type: "upload",
    relationTo: "media",
    label: "Open Graph Image",
    admin: {
      description:
        "Recommended landscape image, commonly 1200 × 630 pixels. Falls back to the site-wide social image.",
    },
  },
  {
    name: "twitterCard",
    type: "select",
    label: "X / Twitter Card Type",
    defaultValue: "summary_large_image",
    options: [
      {
        label: "Large Image",
        value: "summary_large_image",
      },
      {
        label: "Summary",
        value: "summary",
      },
    ],
  },
  {
    name: "twitterTitle",
    type: "text",
    label: "X / Twitter Title",
    maxLength: 95,
    admin: {
      description:
        "Optional title for X sharing. Falls back to the Open Graph title.",
    },
  },
  {
    name: "twitterDescription",
    type: "textarea",
    label: "X / Twitter Description",
    admin: {
      description:
        "Optional description for X sharing. Falls back to the Open Graph description.",
    },
  },
  {
    name: "twitterImage",
    type: "upload",
    relationTo: "media",
    label: "X / Twitter Image",
    admin: {
      description:
        "Optional image override. Falls back to the Open Graph image.",
    },
  },
];
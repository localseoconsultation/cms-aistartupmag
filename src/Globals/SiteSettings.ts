import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  admin: {
    group: "Settings",
  },
  fields: [
    {
      name: "branding",
      type: "group",
      fields: [
        {
          name: "logo",
          type: "group",
          fields: [
            {
              name: "image",
              type: "upload",
              relationTo: "media",
              required: true,
            },
            {
              name: "alt",
              type: "text",
              required: true,
              defaultValue: "AI Startup Magazine",
            },
            {
              name: "href",
              type: "text",
              required: true,
              defaultValue: "/",
            },
            {
              name: "width",
              type: "number",
              required: true,
              defaultValue: 1000,
            },
            {
              name: "height",
              type: "number",
              required: true,
              defaultValue: 500,
            },
          ],
        },
        {
          name: "description",
          type: "textarea",
          required: true,
          defaultValue:
            "Ideas, intelligence, startups, and technology shaping what comes next.",
        },
        {
          name: "copyrightYear",
          type: "number",
          required: true,
          defaultValue: 2026,
        },
        {
          name: "copyright",
          type: "text",
          required: true,
          defaultValue: "AI Startup Magazine. All rights reserved.",
        },
      ],
    },
    {
      name: "socials",
      type: "array",
      label: "Social Links",
      fields: [
        {
          name: "platform",
          type: "select",
          required: true,
          options: [
            { label: "LinkedIn", value: "linkedin" },
            { label: "Instagram", value: "instagram" },
            { label: "X", value: "x" },
            { label: "Facebook", value: "facebook" },
            { label: "YouTube", value: "youtube" },
          ],
        },
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "url",
          type: "text",
          required: true,
        },
        {
          name: "label",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};
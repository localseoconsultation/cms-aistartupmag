import type { GlobalConfig } from "payload";

export const Logo: GlobalConfig = {
  slug: "site-logo",
  label: "Site Logo",
  admin: {
    group: "Settings",
  },
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
      min: 1,
    },
    {
      name: "height",
      type: "number",
      required: true,
      defaultValue: 500,
      min: 1,
    },
  ],
};
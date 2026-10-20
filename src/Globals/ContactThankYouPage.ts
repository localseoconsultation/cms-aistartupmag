import type { GlobalConfig } from "payload";
import { seoFields } from "@/components/seoFields";

export const ContactThankYouPage: GlobalConfig = {
  slug: "contact-thank-you-page",
  label: "Contact Thank You Page",

  admin: {
    group: "Pages",
  },

  access: {
    read: () => true,
    update: ({ req }) => req.user?.role === "admin",
  },

  fields: [
    {
      name: "seo",
      type: "group",
      label: "SEO Settings",
      admin: {
        description:
          "Search engine and social sharing metadata for the contact thank-you page.",
      },
      fields: seoFields,
    },
    {
      name: "hero",
      type: "group",
      label: "Thank You Content",
      fields: [
        {
          name: "eyebrow",
          type: "text",
          required: true,
          defaultValue: "Message received",
        },
        {
          name: "title",
          type: "text",
          required: true,
          defaultValue: "Thanks for reaching out.",
        },
        {
          name: "description",
          type: "textarea",
          required: true,
          defaultValue:
            "Your message has been received. Our team will review it and get back to you as soon as possible.",
        },
        {
          name: "cta",
          type: "group",
          label: "Call to Action",
          fields: [
            {
              name: "label",
              type: "text",
              required: true,
              defaultValue: "Back to Home",
            },
            {
              name: "href",
              type: "text",
              required: true,
              defaultValue: "/",
            },
          ],
        },
      ],
    },
  ],
};
import type { Block } from "payload";

export const extendWithPlaceholder = (field: Block | ((arg?: any) => Block)) => {
  const block = typeof field === "function" ? field() : field;

  return {
    ...block,
    fields: [
      ...block.fields,
      {
        name: "placeholder",
        type: "text" as const,
        label: "Placeholder",
      },
    ],
  };
};
import { defineConfig } from "tinacms";

export default defineConfig({
  // 本地开发配置
  clientId: "local-dev-client",
  token: "local-dev-token",
  branch: "main",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },

  // 本地编辑配置
  isLocalClient: true,
  
  schema: {
    collections: [
      {
        name: "product",
        label: "Products",
        path: "content/products",
        format: "md",
        ui: {
          router: ({ document }) => `/products/${document._sys.filename}`,
          allowedActions: {
            create: true,
            delete: true,
            edit: true,
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Product Name",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "number",
            name: "price",
            label: "Price",
            required: true,
          },
          {
            type: "image",
            name: "image",
            label: "Product Image",
            required: true,
          },
          {
            type: "string",
            name: "sku",
            label: "SKU",
            required: true,
          },
          {
            type: "number",
            name: "stock",
            label: "Stock Quantity",
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "Product Slug",
            required: true,
            description: "URL-friendly product identifier (e.g., 'wireless-headphones')"
          },
        ],
      },
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        format: "md",
        ui: {
          router: ({ document }) => `/${document._sys.filename}`,
          allowedActions: {
            create: true,
            delete: true,
            edit: true,
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "content",
            label: "Page Content",
            isBody: true,
          },
        ],
      },
    ],
  },
});

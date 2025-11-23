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
          router: ({ document }) => `/products/${(document as any).slug || document._sys.filename}`,
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
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            ui: { component: "textarea" },
            description: "Optional short summary for product list; auto-generated if empty",
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
            name: "category",
            label: "Category",
            ui: { component: "select" },
            options: [
              { value: "control", label: "控制系统" },
              { value: "display", label: "显示设备" },
              { value: "terminal", label: "播放终端" },
              { value: "app", label: "移动应用" },
            ],
          },
          {
            type: "string",
            name: "slug",
            label: "Product Slug",
            required: true,
            description: "URL-friendly product identifier (e.g., 'wireless-headphones')"
          },
          {
            type: "boolean",
            name: "published",
            label: "Published",
            description: "Only published products appear in the list",
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
      {
        name: "case",
        label: "Cases",
        path: "content/cases",
        format: "md",
        ui: {
          router: ({ document }) => `/cases/${document._sys.filename}`,
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
            label: "Case Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: { component: "textarea" },
            required: true,
          },
          {
            type: "image",
            name: "image",
            label: "Cover Image",
          },
          {
            type: "object",
            name: "gallery",
            label: "Gallery",
            list: true,
            fields: [
              { type: "image", name: "image", label: "Image" },
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
            ],
          },
          {
            type: "string",
            name: "slug",
            label: "Slug",
            description: "Optional URL-friendly identifier",
          },
        ],
      },
    ],
  },
});

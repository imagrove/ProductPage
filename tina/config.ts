import { defineConfig } from 'tinacms';

// 定义内容模型
export const config = defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || '',
  token: process.env.TINA_TOKEN || '',
  branch: 'main',
  media: {
    tina: {
      mediaRoot: 'public/assets',
      publicFolder: 'public',
    },
  },
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  schema: {
    collections: [
      {
        name: 'page',
        label: '页面',
        path: 'content/pages',
        format: 'mdx',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: '标题',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'description',
            label: '描述',
          },
          {
            type: 'datetime',
            name: 'date',
            label: '日期',
          },
          {
            type: 'rich-text',
            name: 'body',
            label: '内容',
            isBody: true,
          },
        ],
      },
      {
        name: 'product',
        label: '产品',
        path: 'content/products',
        format: 'mdx',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: '产品名称',
            isTitle: true,
            required: true,
          },
          {
            type: 'number',
            name: 'price',
            label: '价格',
            required: true,
          },
          {
            type: 'string',
            name: 'image',
            label: '产品图片',
          },
          {
            type: 'string',
            name: 'category',
            label: '分类',
          },
          {
            type: 'rich-text',
            name: 'description',
            label: '产品描述',
          },
          {
            type: 'rich-text',
            name: 'specifications',
            label: '产品规格',
          },
          {
            type: 'rich-text',
            name: 'body',
            label: '详细介绍',
            isBody: true,
          },
        ],
      },
      {
        name: 'testimonial',
        label: '客户评价',
        path: 'content/testimonials',
        format: 'mdx',
        fields: [
          {
            type: 'string',
            name: 'name',
            label: '客户姓名',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'position',
            label: '职位',
          },
          {
            type: 'string',
            name: 'company',
            label: '公司',
          },
          {
            type: 'rich-text',
            name: 'quote',
            label: '评价内容',
            isBody: true,
          },
          {
            type: 'string',
            name: 'avatar',
            label: '头像',
          },
        ],
      },
      {
        name: 'global',
        label: '全局配置',
        path: 'content/global',
        format: 'json',
        fields: [
          {
            type: 'string',
            name: 'siteName',
            label: '网站名称',
            required: true,
          },
          {
            type: 'string',
            name: 'siteDescription',
            label: '网站描述',
          },
          {
            type: 'string',
            name: 'logo',
            label: 'Logo',
          },
          {
            type: 'string',
            name: 'favicon',
            label: 'Favicon',
          },
          {
            type: 'object',
            name: 'contactInfo',
            label: '联系信息',
            fields: [
              {
                type: 'string',
                name: 'phone',
                label: '电话',
              },
              {
                type: 'string',
                name: 'email',
                label: '邮箱',
              },
              {
                type: 'string',
                name: 'address',
                label: '地址',
              },
            ],
          },
          {
            type: 'object',
            name: 'socialLinks',
            label: '社交媒体链接',
            fields: [
              {
                type: 'string',
                name: 'facebook',
                label: 'Facebook',
              },
              {
                type: 'string',
                name: 'twitter',
                label: 'Twitter',
              },
              {
                type: 'string',
                name: 'instagram',
                label: 'Instagram',
              },
              {
                type: 'string',
                name: 'linkedin',
                label: 'LinkedIn',
              },
              {
                type: 'string',
                name: 'youtube',
                label: 'YouTube',
              },
            ],
          },
        ],
      },
    ],
  },
});

export default config;
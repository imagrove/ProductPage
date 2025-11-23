## 目标
- 产品详情为唯一数据源；产品列表自动提取详情的标题、封面、价格、简述与 slug。
- 可视化编辑与发布后，列表与详情内容始终一致；跳转路由稳定且 SEO 友好。

## 数据模型（TinaCMS Collections）
- Products 集合现有字段：`title, description, price, image, sku, stock, slug`（已存在）。
- 调整与扩展：
  - 增加 `excerpt`（可选）用于列表简述；未填写时自动由 `description` 前 100–140 字生成。
  - 增加 `category`（enum 或 string）用于列表筛选；保留现有页面分类显示。
  - 增加 `published`（boolean），仅在列表页显示已发布产品。
  - 规范 `slug`：默认与文件名一致；若编辑修改，则以 `slug` 为权威，保持唯一性。

## 读取与服务层（lib/products.ts）
- 实现统一数据访问：
  - `getProducts({ onlyPublished = true })`：GraphQL 读取产品集合，映射到统一类型；为每项生成 `excerpt`（若缺失），并返回必要字段。
  - `getProductBySlug(slug)`：按 slug 查单个产品；不存在时返回 `null`。
- 失败兜底策略：
  - GraphQL 失败时使用 Tina 生成的文件读取或现有 `mockProducts`；但仅作为开发兜底。
  - 打印明确日志，避免生产误用 mock。

## 页面接入
- 列表页 `/products`：
  - 改为服务端组件获取 `products = await getProducts()`；客户端仅用于筛选状态（接收初始数据）。
  - 列表卡片展示：`title, image, price, excerpt`；跳转 `Link href=/products/[slug]`。
- 详情页 `/products/[slug]`：
  - `getProductBySlug(slug)` 取详情；展示 `title, image, description, price, sku, stock`；保留加入购物车按钮与中文文案。
  - 增加 `generateStaticParams`（按需）与 `revalidate`（例如 60s）以实现 ISR；保证发布之后列表与详情自动同步。

## 路由与 slug 一致性
- Tina `router: ({ document }) => /products/${document._sys.filename}` 保持文件名路由；详情页优先使用 `slug` 字段。
- 约定：`slug` 若为空则使用 `_sys.filename`；若填写则以 `slug` 为跳转依据并在列表与详情统一。

## 列表自动提取逻辑
- `excerpt` 优先级：`excerpt` 字段 > `description` 截断（保留句子边界与中文多字节）。
- 图片使用 `image` 字段；如缺失显示占位图并在 Tina 提示必填。
- 价格 `price` 与库存 `stock` 直接展示（缺失时隐藏库存提示）。

## SEO 与结构化数据
- 详情页注入 `Product` JSON-LD：`name, image, description, sku, offers(price, availability)`；
- 列表页注入 `ItemList` JSON-LD：包含各产品项的 `url` 与 `name`。

## 兼容现有功能
- 购物车：继续使用 Snipcart `api.cart.addItem` 且 `openCart: false`；保留成功气泡提示。
- 分类筛选 UI：使用 `category` 字段；无数据时隐藏筛选项或回退到“全部”。

## 内容迁移与统一中文
- 将 `content/products/*.md` 前文统一中文字段；按需补充 `excerpt` 与 `category`。
- 校验所有 `image` 指向 `public/images/products/*` 或 Tina 媒体库。

## 验证与发布
- 本地：
  - Tina 可视化编辑产品详情；保存后刷新 `/products` 与 `/products/[slug]` 检查一致性。
  - GraphQL 失败场景测试；确认兜底逻辑与日志输出。
- 线上：
  - 启用 ISR（或手动再生成）；发布后列表自动反映详情变更。

## 交付与后续
- 代码改造清单：
  - 增强 `tina/config.ts` 的 `product` 集合字段与校验。
  - 改造 `lib/products.ts` 数据访问层，移除对 mock 的默认依赖。
  - 更新 `/products` 与 `/products/[slug]` 页面数据接入与中文文案统一。
  - 添加 JSON-LD。
- 后续：多语言支持（可加入 `locale` 字段或多集合）、价格单位与币种、图片优化与懒加载。
## 问题诊断
- 报错来源：`useFetchCollections` 在 `/admin` 页面渲染时读取不到 Tina UI 上下文。
- 真实原因：`public/admin/index.html` 不存在，`/admin` 被 Next 应用路由接管，加载了我们自己的 `TinaProvider` 与 App Router/HotReload，导致 Tina 侧栏上下文不完整。
- 证据：`public/admin/` 目录仅含 `.gitignore`，缺少 `index.html`；因此直接访问 `/admin` 进入 Next 应用而不是 Tina 静态管理界面。

## 修复方案
1. 生成 Tina 管理界面静态文件
- 执行：`npx tinacms build`（或使用项目内脚本）
- 预期输出：`public/admin/index.html` 及相关资源，根据 `tina/config.ts` 的 `build.publicFolder: 'public'` 与 `build.outputFolder: 'admin'`

2. 路由重写到静态管理界面
- 在 Next 中添加 `middleware.ts`：将 `/admin`、`/admin/` 重写到 `/admin/index.html`
- 这样 `/admin` 始终加载 Tina 的静态 UI，不再被 Next 路由/Provider 干扰

3. 防止 TinaProvider 影响 `/admin`
- 在 `TinaProvider` 中增加保护：当 `pathname.startsWith('/admin')` 时不初始化 `TinaCMS`
- 保留产品页的 `?edit=1` 仅用于拉取实时数据（不显示侧栏），避免 `useFetchCollections` 问题

4. 验证编辑链路
- 在 `/admin` 打开 Content → Products → `central-control-system.md`，应显示可编辑表单
- 修改并保存（例如 `price: 9996`）后，刷新 `http://localhost:3000/products/central-control-system`
- 详情页已禁用缓存（`dynamic = 'force-dynamic'`、`revalidate = 0`）且优先单文档读取，预期立即显示最新值

5. 兜底与排查
- 若仍不显示，临时在详情页输出 Tina GraphQL 返回对象进行对比，确认索引或路径问题
- 确认 `content/products/central-control-system.md` 前言包含 `slug: central-control-system` 与 `published: true`

## 预计影响
- `/admin` 将稳定加载 Tina 静态管理界面，解决 `useFetchCollections` 报错
- 产品详情页编辑后刷新即可显示最新文档
- 不影响现有业务页面与 Snipcart 功能
# Vercel 部署指南

## 📋 部署前准备

### 1. 环境配置检查
- **Node.js版本**: 确保使用Node.js 18+（推荐18.18.0或20.x）
- **Next.js版本**: 当前项目使用Next.js 14.0.0
- **构建配置**: 项目已配置为静态导出（`output: "export"`）

### 2. 环境变量设置
在Vercel项目设置中配置以下环境变量：

```env
# Google Analytics 配置
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Formspree 表单配置
NEXT_PUBLIC_FORMSPREE_FORM_ID=your_formspree_id

# 网站基础配置
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SITE_NAME=多媒体播控系统

# 构建环境
NODE_ENV=production
```

## 🚀 部署步骤

### 1. 连接GitHub仓库
1. 登录 [Vercel](https://vercel.com)
2. 点击 "New Project"
3. 选择您的GitHub仓库
4. 授权Vercel访问仓库

### 2. 项目配置
在Vercel部署界面中设置：
- **Framework Preset**: Next.js
- **Root Directory**: `.ai/src-v1.0`
- **Build Command**: `npm run build`
- **Output Directory**: `out` (Next.js静态导出默认目录)

### 3. 环境变量配置
在Vercel项目设置 → Environment Variables 中添加：
- 生产环境变量（如上所述）
- 预览环境变量（可选，用于测试）

### 4. 域名配置（可选）
- 在Vercel项目设置 → Domains 中添加自定义域名
- 配置DNS记录指向Vercel

## ⚠️ 重要注意事项

### 1. 静态导出限制
由于项目配置了 `output: "export"`，需要注意：
- **不支持服务端渲染（SSR）**
- **不支持API路由**
- **需要预渲染所有页面**

### 2. 图片优化配置
项目配置了 `images.unoptimized: true`，因为：
- Vercel的Next.js图片优化需要额外配置
- 静态导出模式下图片优化受限
- 建议使用CDN或外部图片服务

### 3. 环境变量处理
- **客户端环境变量**必须以 `NEXT_PUBLIC_` 开头
- **服务端环境变量**在静态导出模式下不可用
- 敏感信息应通过Vercel环境变量管理

### 4. 构建优化
项目已配置的构建优化：
```javascript
compiler: {
  removeConsole: process.env.NODE_ENV === "production",
  reactRemoveProperties: process.env.NODE_ENV === "production",
}
```

## 🔧 常见问题解决

### 1. 构建失败
**问题**: 构建过程中出现错误
**解决**:
- 检查Node.js版本兼容性
- 确认所有依赖正确安装
- 查看构建日志中的具体错误信息

### 2. 环境变量未生效
**问题**: 前端代码无法读取环境变量
**解决**:
- 确保环境变量以 `NEXT_PUBLIC_` 开头
- 重新部署项目使环境变量生效
- 检查变量名拼写是否正确

### 3. 图片加载问题
**问题**: 图片无法正常显示
**解决**:
- 检查图片路径是否正确
- 确认图片已正确上传到仓库
- 考虑使用外部CDN服务

### 4. 表单提交失败
**问题**: Formspree表单无法提交
**解决**:
- 检查 `NEXT_PUBLIC_FORMSPREE_FORM_ID` 是否正确
- 确认Formspree账户已激活
- 检查浏览器控制台错误信息

## 📊 性能优化建议

### 1. 图片优化
- 使用WebP格式替代JPEG/PNG
- 实现图片懒加载
- 使用合适的图片尺寸

### 2. 代码分割
- Next.js自动进行代码分割
- 考虑使用动态导入优化首屏加载

### 3. CDN配置
- 启用Vercel的全球CDN
- 配置合适的缓存策略

## 🔒 安全配置

### 1. HTTP头安全
项目已配置的安全头：
```javascript
headers: [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }
]
```

### 2. HTTPS强制
- Vercel默认启用HTTPS
- 确保所有资源使用HTTPS加载

## 📈 监控与分析

### 1. Google Analytics集成
- 确保GA测量ID正确配置
- 检查事件追踪是否正常工作
- 设置转化目标和漏斗分析

### 2. Vercel Analytics
- 启用Vercel Analytics获取性能数据
- 监控页面加载时间和核心Web指标

## 🛠️ 开发工作流

### 1. 分支部署
- `main` 分支 → 生产环境
- 其他分支 → 预览环境（自动部署）

### 2. 预览部署
- 每次Pull Request都会自动创建预览部署
- 便于测试和代码审查

### 3. 回滚机制
- Vercel支持一键回滚到之前的部署
- 保留部署历史记录

## 📞 技术支持

如果遇到部署问题，可以：
1. 查看Vercel部署日志
2. 检查项目GitHub Actions（如果有）
3. 参考Next.js官方文档
4. 联系Vercel支持团队

---

**最后更新时间**: 2024年12月
**适用版本**: Next.js 14.0.0, Vercel平台
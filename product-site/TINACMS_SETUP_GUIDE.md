# TinaCMS 注册和配置指南

## 📝 注册步骤

### 第一步：注册TinaCMS账号

1. **访问官网**: https://tina.io/
2. **点击注册**: 点击右上角的 "Sign Up"
3. **选择注册方式**:
   - GitHub账号登录（推荐）
   - 邮箱注册
4. **验证邮箱**: 完成邮箱验证

### 第二步：创建新项目

1. **登录后**进入Dashboard
2. **点击"New Project"**
3. **填写项目信息**:
   - Project Name: `product-store` (或您的项目名称)
   - Framework: 选择 "Next.js"
   - Repository: 可以跳过，后续再关联

### 第三步：获取认证信息

创建项目后，您会看到：

#### Client ID（客户端ID）
- **位置**: Project Settings → General → Client ID
- **格式**: 长字符串，类似 `abc123def456ghi789`
- **用途**: 前端连接TinaCMS

#### Token（访问令牌）
- **位置**: Project Settings → Tokens → Create Token
- **点击**: "Create Token"按钮
- **格式**: 长字符串，类似 `xyz789uvw456rst123`
- **用途**: 读取内容数据

## 🔧 配置到项目中

### 获取到认证信息后，更新环境文件：

```bash
# 编辑 .env.local 文件
NEXT_PUBLIC_TINA_CLIENT_ID=your-client-id-here
TINA_TOKEN=your-token-here
```

## 📋 详细步骤图解

### 1. 访问官网注册
```
https://tina.io/ → Sign Up → 选择GitHub或邮箱注册
```

### 2. 创建项目
```
Dashboard → New Project → 填写信息 → Create
```

### 3. 获取Client ID
```
Project Settings → General → 复制 Client ID
```

### 4. 创建Token
```
Project Settings → Tokens → Create Token → 复制Token
```

## 🎯 快速检查清单

注册完成后，您应该获得：
- ✅ TinaCMS账号
- ✅ 新项目
- ✅ Client ID
- ✅ Token
- ✅ 更新.env.local文件

## 🚀 测试TinaCMS

配置完成后：

1. **重启开发服务器**:
   ```bash
   npm run dev
   ```

2. **访问管理界面**:
   ```
   http://localhost:3000/admin/index.html
   ```

3. **验证连接**:
   - 应该能看到TinaCMS登录界面
   - 能够创建和编辑内容

## ⚠️ 注意事项

### 免费额度
- **免费计划**: 有使用限制
- **付费计划**: 根据需求选择

### 安全提醒
- **Token保密**: 不要分享或公开Token
- **定期轮换**: 建议定期更新Token
- **环境变量**: 确保在环境变量中配置

### 常见问题

**Q: 注册时遇到邮箱验证问题？**
A: 检查垃圾邮件文件夹，或使用GitHub登录

**Q: Client ID和Token有什么区别？**
A: Client ID用于识别项目，Token用于访问权限

**Q: 需要付费吗？**
A: 有免费计划，适合小型项目使用

**Q: 可以更改项目设置吗？**
A: 可以在Dashboard中随时修改项目设置

## 📞 支持

如果在注册过程中遇到问题：
- TinaCMS官方文档: https://tina.io/docs/
- 支持邮箱: support@tina.io
- 社区论坛: https://community.tina.io/

需要我协助您完成注册过程，或者您希望我帮您配置其他服务吗？
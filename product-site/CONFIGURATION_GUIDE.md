# 第三方服务配置指南

本指南将帮助您获取和配置所有必需的API密钥和服务ID。

## 🔧 必需配置项

### 1. Google Analytics

#### 获取GA跟踪ID
1. 访问 [Google Analytics](https://analytics.google.com/)
2. 创建新的属性（Property）
3. 获取跟踪ID（格式：G-XXXXXXXXXX 或 UA-XXXXXXXXX-X）

```env
NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX
```

### 2. Formspree

#### 获取表单端点
1. 访问 [Formspree](https://formspree.io/)
2. 注册账号并创建新表单
3. 获取表单ID（格式：xxxxxxxx）

```env
NEXT_PUBLIC_FORMSPREE_ENDPOINT=xxxxxxxx
```

### 3. Snipcart

#### 获取API密钥
1. 访问 [Snipcart](https://snipcart.com/)
2. 注册账号并进入Dashboard
3. 在Account > API Keys中获取Public API Key

```env
NEXT_PUBLIC_SNIPCART_API_KEY=YOUR_PUBLIC_API_KEY_HERE
```

### 4. TinaCMS

#### 获取认证信息
1. 访问 [TinaCMS](https://tina.io/)
2. 注册账号并创建新项目
3. 在Project Settings中获取：
   - Client ID
   - Read-only Token

```env
NEXT_PUBLIC_TINA_CLIENT_ID=your-client-id
TINA_TOKEN=your-read-only-token
```

### 5. 支付宝（Alipay Global）

#### 获取商户信息
1. 访问 [支付宝全球商户平台](https://global.alipay.com/)
2. 注册商户账号
3. 获取以下信息：
   - App ID
   - 商户私钥
   - 支付宝公钥

```env
ALIPAY_APP_ID=your-alipay-app-id
ALIPAY_PRIVATE_KEY=your-private-key
ALIPAY_PUBLIC_KEY=alipay-public-key
NEXT_PUBLIC_ALIPAY_GATEWAY_URL=https://openapi.alipay.com/gateway.do
```

## 📝 配置步骤

### 第一步：创建基础环境文件

```bash
cp .env.local .env.local.backup
cp .env.local.example .env.local
```

### 第二步：逐个配置服务

#### 1. 配置Google Analytics
```bash
# 编辑.env.local文件，替换以下值
NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX
```

#### 2. 配置Formspree
```bash
# 替换为您的表单ID
NEXT_PUBLIC_FORMSPREE_ENDPOINT=your-form-id-here
```

#### 3. 配置Snipcart
```bash
# 替换为您的Snipcart公钥 (注意：使用Public API Key，不是Secret API Key)
# 获取地址：https://app.snipcart.com/dashboard → Account → API Keys
NEXT_PUBLIC_SNIPCART_API_KEY=your-public-api-key-here
```

#### 4. 配置TinaCMS
```bash
# 替换为您的TinaCMS凭证
NEXT_PUBLIC_TINA_CLIENT_ID=your-tina-client-id
TINA_TOKEN=your-tina-token
```

#### 5. 配置支付宝（可选）
```bash
# 如果您需要支付宝支付功能
ALIPAY_APP_ID=your-alipay-app-id
ALIPAY_PRIVATE_KEY=your-private-key
ALIPAY_PUBLIC_KEY=alipay-public-key
```

## 🎯 快速测试配置

### 测试Google Analytics
1. 打开浏览器开发者工具
2. 访问网站并检查Network标签
3. 应该能看到发送到google-analytics.com的请求

### 测试Formspree
1. 访问联系页面 `/contact`
2. 填写测试表单并提交
3. 检查您的邮箱是否收到邮件

### 测试Snipcart
1. 访问产品页面 `/products`
2. 点击"Add to Cart"按钮
3. 购物车应该能正常工作

### 测试TinaCMS
1. 访问管理界面 `/admin/index.html`
2. 应该能看到TinaCMS登录界面

## ⚠️ 注意事项

### 安全提醒
- 不要将`.env.local`文件提交到Git仓库
- 在生产环境中使用强密码和安全的API密钥
- 定期轮换API密钥

### 免费额度
- **Google Analytics**: 免费版足够小型网站使用
- **Formspree**: 免费版每月50次提交
- **Snipcart**: 免费开发，生产环境需要付费
- **TinaCMS**: 免费版有使用限制

### 生产环境部署
在Vercel部署时，需要在项目设置中添加所有环境变量：

1. 登录Vercel Dashboard
2. 选择您的项目
3. 进入Settings > Environment Variables
4. 添加所有必需的变量

## 🚀 下一步

配置完成后，您可以：

1. **启动开发服务器**:
   ```bash
   npm run dev
   ```

2. **访问网站**:
   - 前端: http://localhost:3000
   - CMS管理: http://localhost:3000/admin/index.html

3. **测试功能**:
   - 添加产品到购物车
   - 提交联系表单
   - 测试支付流程

需要我协助您配置任何特定的服务吗？
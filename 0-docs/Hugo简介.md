# Hugo网站开发指南

## 1. 搭建Hugo本地环境

### 1.1 安装Hugo

**MacOS安装方法**：
```bash
# 使用Homebrew安装
brew install hugo

# 验证安装
hugo version
```

**Windows安装方法**：
```bash
# 使用Chocolatey安装
choco install hugo-extended -confirm

# 或直接下载二进制文件
# https://github.com/gohugoio/hugo/releases
```

**Linux安装方法**：
```bash
# Ubuntu/Debian
apt-get install hugo

# Fedora
dnf install hugo
```

### 1.2 创建新的Hugo项目

```bash
# 创建项目
hugo new site my-website
cd my-website

# 初始化Git仓库
git init
```

### 1.3 本地开发预览

```bash
# 启动开发服务器
hugo server -D

# 在浏览器访问
# http://localhost:1313/
```

## 2. 查找和安装Hugo模板

### 2.1 官方主题库

访问 [Hugo Themes](https://themes.gohugo.io/) 浏览所有可用主题

### 2.2 安装主题的方法

**方法一：Git克隆（推荐）**
```bash
# 克隆主题到themes目录
git clone https://github.com/主题作者/主题名称.git themes/主题名称

# 添加为子模块（推荐）
git submodule add https://github.com/主题作者/主题名称.git themes/主题名称
```

**方法二：下载ZIP文件**
1. 从GitHub下载主题ZIP文件
2. 解压到themes目录

### 2.3 在配置文件中启用主题

编辑项目根目录的`hugo.toml`（或`config.toml`）：
```toml
theme = "主题名称"
```

## 3. 集成SEO优化

### 3.1 基本SEO配置

在`hugo.toml`中添加：
```toml
baseURL = "https://yourdomain.com/"
title = "您的网站标题"
description = "网站描述，对SEO非常重要"
author = "您的名字"

[params]
  keywords = ["关键词1", "关键词2", "关键词3"]
  favicon = "favicon.ico"
```

### 3.2 页面级SEO配置

在每个Markdown文件的前置元数据中添加：
```yaml
---
title: "页面标题"
description: "页面特定描述"
keywords: ["关键词1", "关键词2"]
date: 2023-01-01
---
```

### 3.3 自动生成SEO文件

Hugo会自动生成以下文件：
- `sitemap.xml` - 站点地图
- `robots.txt` - 爬虫规则

## 4. 集成Google Analytics

### 4.1 使用配置文件集成

在`hugo.toml`中添加：
```toml
[services.googleAnalytics]
  ID = "G-XXXXXXXXXX"  # 您的GA4 ID
```

### 4.2 自定义跟踪代码

1. 创建`layouts/partials/google-analytics.html`：
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

2. 在主题头部模板中引入（如果主题支持）：
```html
{{ partial "google-analytics.html" . }}
```

## 5. 集成Formspree表单

### 5.1 创建联系页面

```bash
hugo new contact.md
```

### 5.2 添加Formspree表单代码

在`content/contact.md`中添加：
```html
---
title: "联系我们"
date: 2023-01-01
---

<form action="https://formspree.io/f/your-form-id" method="POST">
  <div>
    <label for="name">姓名</label>
    <input type="text" id="name" name="name" required>
  </div>
  <div>
    <label for="email">邮箱</label>
    <input type="email" id="email" name="email" required>
  </div>
  <div>
    <label for="message">留言</label>
    <textarea id="message" name="message" required></textarea>
  </div>
  <button type="submit">提交</button>
</form>
```

### 5.3 Formspree账户设置

1. 访问 [Formspree](https://formspree.io/)
2. 创建账户并获取表单ID
3. 将表单ID替换到上面的代码中

## 6. 修改Hugo模板

### 6.1 Hugo的级联模板系统

Hugo使用级联系统查找模板，优先级顺序：
1. 项目根目录的`layouts/`文件夹（最高优先级）
2. 主题的`layouts/`文件夹
3. Hugo的内置默认模板（最低优先级）

### 6.2 选择性覆盖模板

**示例：覆盖页眉模板**
1. 在项目中找到主题的header模板位置
2. 在项目根目录创建相同路径的文件：
   ```
   layouts/partials/header.html
   ```
3. 编辑这个文件，添加或修改内容

### 6.3 常见需要修改的模板

my-hugo-site/
├── layouts/                 # 项目级模板（用户自定义）
│   ├── partials/            # 用户自定义的局部模板
│   │   └── header.html      # 自定义页眉（会覆盖主题中的同名文件）
│   └── _default/            # 自定义的默认布局
│       └── single.html      # 自定义单个页面布局
├── themes/
│   └── my-theme/            # 安装的主题
│       └── layouts/         # 主题的模板文件
│           ├── partials/
│           │   ├── header.html      # 主题默认页眉
│           │   ├── footer.html      # 主题默认页脚
│           │   └── sidebar.html     # 主题默认侧边栏
│           └── _default/
│               ├── baseof.html      # 主题基础布局
│               └── single.html      # 主题单个页面布局



- `layouts/partials/header.html` - 页眉
- `layouts/partials/footer.html` - 页脚
- `layouts/_default/baseof.html` - 基础布局
- `layouts/_default/single.html` - 单页布局
- `layouts/_default/list.html` - 列表页布局

### 6.4 使用模板继承

**在自定义模板中扩展现有内容**：
```html
{{ define "main" }}
  <!-- 您的自定义内容 -->
  {{ .Content }}
  <!-- 更多自定义内容 -->
{{ end }}
```

## 7. 部署到Vercel

1. 将代码推送到GitHub仓库
2. 访问 [Vercel](https://vercel.com/)
3. 导入GitHub仓库
4. Vercel会自动检测Hugo项目并配置构建命令
5. 完成部署，获取访问链接

## 8. 工作流程建议

1. **开发阶段**：使用`hugo server -D`进行本地预览
2. **内容创建**：在`content/`目录下创建Markdown文件
3. **模板自定义**：使用级联系统覆盖需要修改的模板部分
4. **集成功能**：添加SEO、GA和表单功能
5. **版本控制**：使用Git管理代码
6. **部署更新**：推送到GitHub，Vercel自动部署

---

**注意事项**：
- 确保在修改模板前备份原始文件
- 使用`hugo`命令生成静态文件进行测试
- 定期更新Hugo和主题版本
- 关注主题的文档，了解其特定的配置选项
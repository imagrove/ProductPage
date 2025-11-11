在 MacBook 上安装 Hugo 时，**强烈推荐选择扩展版（Extended Edition）**，尤其是当你需要使用主题、处理 SCSS/SASS 样式或生成 WebP 图片时。以下是 **版本选择逻辑 + 安装方法 + 验证步骤**，适配 M1/M2 芯片和 Intel 芯片的 MacBook：

## 一、版本选择核心逻辑

Hugo 分为 **标准版** 和 **扩展版**，两者区别如下：
| 功能特性 | 标准版（Standard） | 扩展版（Extended） |
|-------------------------|--------------------|--------------------|
| SCSS/SASS 编译支持 | ❌ 不支持 | ✅ 支持（Hugo Pipes） |
| WebP 图片生成 | ❌ 仅解码 | ✅ 支持编码生成 |
| 主题高级特性（如动态样式） | ❌ 部分受限 | ✅ 完全支持（如 [Hugo Novela](https://blog.csdn.net/gitblog_01115/article/details/141587467)、[Hugo Robust](https://blog.csdn.net/gitblog_00967/article/details/141484934) 等主题必须扩展版） |
| 二进制体积 | 较小 | 稍大（包含额外库） |

**扩展版适用场景**：

1. 使用任何需要 SCSS/SASS 的主题（如 PaperMod、LoveIt、Ananke）；
2. 需要动态生成 WebP 格式图片以优化网站加载速度；
3. 未来可能添加复杂样式或高级功能（如 Tailwind CSS 集成）。

**标准版适用场景**：
仅用于 **纯 HTML/CSS/JS 静态站点**，且确保未来不会涉及样式预处理或图片格式转换。

## 二、安装步骤（适配 M1/M2 和 Intel 芯片）

### 方式 1：通过 Homebrew 安装（推荐，自动匹配芯片架构）

1. **安装 Homebrew**（已安装可跳过）：
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
2. **安装 Hugo 扩展版**：
   ```bash
   brew install hugo
   ```
   - **关键点**：Homebrew 会自动安装扩展版，无需额外参数。对于 M1/M2 芯片的 MacBook，会安装 `arm64` 架构版本；对于 Intel 芯片，安装 `amd64` 版本。

### 方式 2：手动下载二进制文件（适合需要指定版本或无 Homebrew）

1. **访问 [Hugo 最新发布页](https://github.com/gohugoio/hugo/releases/latest)**；
2. **选择适合的扩展版压缩包**：
   - **M1/M2 芯片（arm64 架构）**：下载文件名包含 `darwin-arm64` 的扩展版（如 `hugo_extended_0.145.0_darwin-arm64.tar.gz`）；
   - **Intel 芯片（amd64 架构）**：下载文件名包含 `darwin-amd64` 的扩展版；
   - **通用二进制（兼容两种芯片）**：下载 `darwin-universal` 版本（文件名如 `hugo_extended_0.145.0_darwin-universal.tar.gz`）。
3. **解压并安装**：
   ```bash
   # 下载后解压
   tar -xvzf hugo_extended_0.145.0_darwin-universal.tar.gz
   # 移动到系统路径
   sudo mv hugo /usr/local/bin/
   ```

### 方式 3：通过 Go 命令安装（需先安装 Go）

1. **安装 Go 语言**（[官方下载](https://go.dev/dl/)）；
2. **安装扩展版**：
   ```bash
   CGO_ENABLED=1 go install -tags extended github.com/gohugoio/hugo@latest
   ```
   - **注意**：需确保 `CGO_ENABLED=1`，否则无法编译扩展功能。

## 三、验证安装与版本检查

1. **检查 Hugo 版本**：
   ```bash
   hugo version
   ```
   - **预期输出**：包含 `extended` 字样，例如：
     ```
     hugo v0.145.0+extended darwin/arm64 BuildDate=unknown
     ```
2. **测试 SCSS 支持**（可选）：
   ```bash
   # 创建测试目录
   mkdir hugo-test && cd hugo-test
   # 初始化 Hugo 站点
   hugo new site .
   # 添加示例 SCSS 文件
   echo "body { background-color: #f0f0f0; }" > assets/scss/styles.scss
   # 创建模板文件 layouts/index.html
   echo '{{ $style := resources.Get "scss/styles.scss" | toCSS | minify }}<style>{{ $style.Content }}</style>' > layouts/index.html
   # 生成静态文件
   hugo
   # 检查 public 目录是否生成 styles.css
   ls public/css/
   ```
   - **成功标志**：若 `public/css/` 目录存在 `styles.css`，说明 SCSS 编译正常。

## 四、常见问题排查

### 问题 1：安装后提示 `hugo: command not found`

- **原因**：系统路径未包含 Hugo 二进制文件。
- **解决**：
  1. 手动将 Hugo 二进制文件路径添加到环境变量：
     ```bash
     echo 'export PATH="/usr/local/bin:$PATH"' >> ~/.zshrc  # 或 ~/.bash_profile
     source ~/.zshrc  # 生效配置
     ```
  2. 重新执行 `hugo version` 验证。

### 问题 2：主题提示需要扩展版

- **示例错误**：`Error: failed to transform "style.scss" (text/x-scss): executable "dart-sass" not found`
- **解决**：
  1. 确认安装的是扩展版（通过 `hugo version` 检查）；
  2. 若手动下载二进制文件，确保下载的是扩展版（文件名含 `extended`）；
  3. 重新执行 `hugo server` 或 `hugo build`。

### 问题 3：M1 芯片性能问题（如编译缓慢）

- **原因**：部分工具链未适配 arm64 架构。
- **解决**：
  1. 使用 Homebrew 安装（已自动适配）；
  2. 若手动编译，确保指定 `GOARCH=arm64`：
     ```bash
     CGO_ENABLED=1 GOARCH=arm64 go install -tags extended github.com/gohugoio/hugo@latest
     ```

## 五、总结

- **版本选择**：**扩展版（Extended）** 是 MacBook 上的最佳选择，兼容主题、样式预处理和图片优化；
- **安装方式**：优先使用 `brew install hugo`，自动适配芯片架构，零配置解决依赖；
- **验证关键**：通过 `hugo version` 检查是否包含 `extended`，确保功能完整。

通过以上步骤，你可以在 MacBook 上快速搭建 Hugo 开发环境，无缝对接 Vercel 部署、主题开发和跨境电商项目的静态页面生成需求。

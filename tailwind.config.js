/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 主色调 - 根据UI设计文档
        primary: {
          DEFAULT: "#0A2463", // 科技深蓝 - 导航、重要按钮、关键标题
          50: "#F0F4FF",
          100: "#E1E9FF",
          200: "#C5D3FF",
          300: "#9DB5FF",
          400: "#6B8EFF",
          500: "#3E7BFA", // 活力蓝 - 悬停状态、高亮元素、CTA按钮
          600: "#0A2463",
          700: "#081C4F",
          800: "#06153B",
          900: "#040E27",
        },
        // 中性色 - 根据UI设计文档
        gray: {
          50: "#F8F9FA", // 浅灰 - 卡片、区块背景
          100: "#E9ECEF",
          200: "#DEE2E6",
          300: "#CED4DA",
          400: "#ADB5BD", // 禁用灰 - 禁用状态
          500: "#6C757D", // 辅助灰 - 次要文字、说明信息
          600: "#495057", // 正文灰 - 正文内容
          700: "#343A40",
          800: "#2B2D42", // 标题灰 - 一级标题，通过加粗突出
          900: "#1A1D29",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "system-ui", "PingFang SC", "HarmonyOS Sans", "sans-serif"],
        display: ["Inter", "-apple-system", "system-ui", "PingFang SC", "HarmonyOS Sans", "sans-serif"],
      },
      screens: {
        // 响应式断点 - 根据UI设计文档
        mobile: { max: "767px" }, // 手机: < 768px
        tablet: "768px", // 平板: 768px - 1024px
        desktop: "1024px", // 桌面: > 1024px
        large: "1440px", // 大屏: > 1440px
      },
      spacing: {
        // 基础单位：8px为基准单位，所有间距采用8的倍数
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
      },
      animation: {
        // 微交互 - 根据UI设计文档
        "fade-in": "fadeIn 0.3s ease", // 页面切换：淡入淡出 0.3s
        "slide-up": "slideUp 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)", // 卡片悬停：0.3s cubic-bezier
        "button-hover": "buttonHover 0.2s ease", // 按钮悬停动画
        "card-hover": "cardHover 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)", // 卡片悬停动画
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        buttonHover: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.02)" }, // 按钮悬停：缩放102%
        },
        cardHover: {
          "0%": { transform: "translateY(0)", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)" },
          "100%": { transform: "translateY(-2px)", boxShadow: "0 8px 24px rgba(62, 123, 250, 0.12)" }, // 卡片悬停效果
        },
      },
    },
  },
  plugins: [],
};

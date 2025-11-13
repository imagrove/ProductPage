// 全局样式类型声明

declare module '*.css' {
  const styles: { [className: string]: string };
  export default styles;
}

// 声明全局CSS文件的类型声明
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
// 简化的TinaCMS API路由处理
// 在开发环境中，我们可以使用一个基本的路由处理器

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request) {
  return new Response(JSON.stringify({ message: "TinaCMS API endpoint" }), {
    headers: { "Content-Type": "application/json" },
  });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(request: Request) {
  return new Response(JSON.stringify({ message: "TinaCMS API endpoint" }), {
    headers: { "Content-Type": "application/json" },
  });
}
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === '/admin' || pathname === '/admin/') {
    const url = req.nextUrl.clone();
    url.pathname = '/admin/index.html';
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/'],
};
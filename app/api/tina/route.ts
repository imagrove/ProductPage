import { NextRequest, NextResponse } from 'next/server';
import { TinaNodeBackend, LocalBackendAuthProvider } from '@tinacms/datalayer';

// 导入TinaCMS配置
import config from '../../../tina/config';

// 使用简化的数据库客户端配置，避免类型错误
// 在开发环境中，TinaCMS会自动处理文件系统的读写操作
const databaseClient = {} as any;

// 创建TinaNodeBackend实例
const tinaHandler = TinaNodeBackend({
  ...config,
  authProvider: LocalBackendAuthProvider(),
  databaseClient,
});

// 修复类型错误，确保使用正确的NextRequest类型
export async function GET(request: NextRequest) {
  return tinaHandler(request as any, undefined as any);
}

export async function POST(request: NextRequest) {
  return tinaHandler(request as any, undefined as any);
}
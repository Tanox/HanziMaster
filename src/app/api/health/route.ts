// src/app/api/health/route.ts v5.2.35

import { NextResponse } from 'next/server';

/** 部署探针：仅返回状态、版本、build 与时间戳，不暴露主机或环境细节。 */
export const dynamic = 'force-dynamic';

export function GET() {
  return NextResponse.json(
    {
      status: 'ok',
      version: process.env.NEXT_PUBLIC_APP_VERSION ?? 'unknown',
      build: process.env.NEXT_PUBLIC_BUILD_ID ?? 'unknown',
      timestamp: new Date().toISOString(),
    },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}

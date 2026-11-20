// src/app/api/progress/route.ts v5.2.51
// Vercel Blob 进度同步端点：私有 store，同步码即能力凭证；未配置 token 时 503 降级。
import { NextResponse, type NextRequest } from 'next/server';
import { get, put } from '@vercel/blob';
import { parseProgressBackup, createProgressBackup } from '@/lib/progress-transfer';
import { validateProgress } from '@/lib/progress-utils';
import { isSyncCode, blobPath, MAX_BACKUP_BYTES } from '@/lib/cloud-sync';

export const dynamic = 'force-dynamic';

const noStore = { 'Cache-Control': 'no-store' };
const configured = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);

function reject(code: string, status: number, message: string) {
  return NextResponse.json({ error: code, message }, { status, headers: noStore });
}

/** 读取云端进度：同步码经严格格式校验后才拼路径，杜绝路径穿越。 */
export async function GET(request: NextRequest) {
  if (!configured()) return reject('not_configured', 503, 'Cloud sync is not configured');
  const code = request.nextUrl.searchParams.get('code') ?? '';
  if (!isSyncCode(code)) return reject('invalid_code', 400, 'Invalid sync code');

  try {
    const file = await get(blobPath(code), { access: 'private' });
    if (!file) return reject('not_found', 404, 'No cloud progress for this code');
    const raw = await new Response(file.stream).text();
    if (new TextEncoder().encode(raw).length > MAX_BACKUP_BYTES) {
      return reject('too_large', 413, 'Cloud backup exceeds size limit');
    }
    const progress = validateProgress(JSON.parse(raw).progress);
    return NextResponse.json({ backup: createProgressBackup(progress) }, { headers: noStore });
  } catch {
    return reject('read_failed', 502, 'Failed to read cloud progress');
  }
}

/** 上传进度：先按既有备份格式严格校验，再覆盖写入同一路径。 */
export async function PUT(request: NextRequest) {
  if (!configured()) return reject('not_configured', 503, 'Cloud sync is not configured');
  let body: { code?: unknown; backup?: unknown };
  try {
    body = await request.json();
  } catch {
    return reject('invalid_json', 400, 'Invalid request body');
  }
  if (typeof body.code !== 'string' || !isSyncCode(body.code)) {
    return reject('invalid_code', 400, 'Invalid sync code');
  }
  if (typeof body.backup !== 'string' || !body.backup) {
    return reject('invalid_backup', 400, 'Invalid backup payload');
  }

  try {
    const progress = parseProgressBackup(body.backup);
    await put(blobPath(body.code), createProgressBackup(progress), {
      access: 'private',
      contentType: 'application/json',
      allowOverwrite: true,
      addRandomSuffix: false,
    });
    return NextResponse.json({ ok: true }, { headers: noStore });
  } catch {
    return reject('write_failed', 502, 'Failed to write cloud progress');
  }
}

// app/api/changelog/route.ts v1.0.0
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const changelogPath = path.join(process.cwd(), 'CHANGELOG.md');
    const content = fs.readFileSync(changelogPath, 'utf8');
    return NextResponse.json({ content });
  } catch (error) {
    return NextResponse.json({ content: '# Changelog\n\nUnable to load changelog.' }, { status: 500 });
  }
}

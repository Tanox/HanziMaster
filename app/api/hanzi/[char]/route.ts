import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// 动态获取 hanzi-writer-data 的路径
const HANZI_DATA_PATH = path.resolve(process.cwd(), 'node_modules', 'hanzi-writer-data');

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ char: string }> }
) {
  const { char } = await params;
  
  if (!char) {
    return NextResponse.json({ error: 'Character is required' }, { status: 400 });
  }

  // 解码字符（以防万一）
  let decodedChar = decodeURIComponent(char);
  
  // 如果包含 .json 后缀，则移除
  if (decodedChar.endsWith('.json')) {
    decodedChar = decodedChar.slice(0, -5);
  }

  // 构建文件路径
  const filePath = path.join(HANZI_DATA_PATH, `${decodedChar}.json`);

  // 检查文件是否存在
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'Character not found' }, { status: 404 });
  }

  try {
    // 读取文件内容
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error reading hanzi data for ${decodedChar}:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

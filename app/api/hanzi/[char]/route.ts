import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Define the path to the hanzi-writer-data directory in public
// This is more reliable as we copy the data there during build/dev
const PUBLIC_HANZI_DATA_PATH = path.join(process.cwd(), 'public', 'hanzi-data');
const NODE_MODULES_HANZI_DATA_PATH = path.resolve(process.cwd(), 'node_modules', 'hanzi-writer-data');

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ char: string }> }
) {
  const { char } = await params;
  
  if (!char) {
    return NextResponse.json({ error: 'Character is required' }, { status: 400 });
  }

  // Decode character
  let decodedChar = decodeURIComponent(char);
  
  // Remove .json extension if present
  if (decodedChar.endsWith('.json')) {
    decodedChar = decodedChar.slice(0, -5);
  }

  // Security check: ensure no path traversal
  if (decodedChar.includes('/') || decodedChar.includes('\\') || decodedChar.includes('..')) {
     return NextResponse.json({ error: 'Invalid character parameter' }, { status: 400 });
  }

  // Try public/hanzi-data first
  let filePath = path.join(PUBLIC_HANZI_DATA_PATH, `${decodedChar}.json`);

  if (!fs.existsSync(filePath)) {
    // Fallback to node_modules if not found in public
    filePath = path.join(NODE_MODULES_HANZI_DATA_PATH, `${decodedChar}.json`);
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Character not found' }, { status: 404 });
    }
  }

  try {
    // Read file content
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error reading hanzi data for ${decodedChar}:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// app/api/log-client/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { logger, LogLevel, LogCategory } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { level, category, message, details } = body;

    if (!level || !category || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    logger.log(level as LogLevel, category as LogCategory, message, details);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error logging from client:', error);
    return NextResponse.json(
      { error: 'Failed to log' },
      { status: 500 }
    );
  }
}

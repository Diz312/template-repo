import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET() {
  const now = new Date()
  const uptime = process.uptime()
  return NextResponse.json({ ok: true, timestamp: now.toISOString(), uptime })
}


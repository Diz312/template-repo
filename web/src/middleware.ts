import { NextResponse, type NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const res = NextResponse.next()
  // Lightweight request id for tracing through the app
  const rid = req.headers.get('x-request-id') ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`
  res.headers.set('x-request-id', rid)
  return res
}

export const config = {
  // Run on all paths except static assets
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}


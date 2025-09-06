// Simple API helper for client and server components
export type Json = Record<string, any> | Array<any> | string | number | boolean | null

export async function api<T = Json>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, {
    ...init,
    headers: {
      'content-type': 'application/json',
      ...(init?.headers || {}),
    },
  })
  const text = await res.text()
  const data = (() => {
    try {
      return text ? JSON.parse(text) : (null as any)
    } catch {
      return text as any
    }
  })()
  if (!res.ok) {
    const message = typeof data === 'object' && data && 'message' in data ? (data as any).message : res.statusText
    throw new Error(message || `Request failed: ${res.status}`)
  }
  return data as T
}

export function sse(url: string, onMessage: (ev: MessageEvent) => void, onError?: (err: any) => void): () => void {
  const es = new EventSource(url)
  es.onmessage = onMessage
  if (onError) es.onerror = onError
  return () => es.close()
}


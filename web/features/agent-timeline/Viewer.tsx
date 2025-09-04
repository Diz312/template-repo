"use client";

import { useEffect, useRef, useState } from "react";
import { API_BASE } from "@/lib/api";

type Ev = { type: string; ts?: string; node?: string | null; payload: Record<string, unknown> };

export default function Viewer() {
  const [events, setEvents] = useState<Ev[]>([]);
  const esRef = useRef<EventSource | null>(null);

  useEffect(() => {
    const url = `${API_BASE.replace(/\/$/, "")}/diagnostics/stream`;
    const es = new EventSource(url);
    esRef.current = es;
    es.onmessage = (e) => {
      try {
        const ev: Ev = JSON.parse(e.data);
        setEvents((prev) => [ev, ...prev].slice(0, 200));
      } catch (_) {
        // ignore parse errors
      }
    };
    es.onerror = () => {
      // auto-reconnect handled by EventSource; keep silent
    };
    return () => {
      es.close();
    };
  }, []);

  return (
    <div>
      <h3>Diagnostics Stream</h3>
      <div style={{ maxHeight: 300, overflow: "auto", border: "1px solid #ddd", padding: 8 }}>
        {events.map((ev, i) => (
          <pre key={i} style={{ margin: 0 }}>{JSON.stringify(ev, null, 2)}</pre>
        ))}
        {events.length === 0 && <p>No events yet…</p>}
      </div>
    </div>
  );
}


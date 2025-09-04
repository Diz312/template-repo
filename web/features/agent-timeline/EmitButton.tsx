"use client";

import { useState } from "react";
import { API_BASE } from "@/lib/api";

export default function EmitButton() {
  const [loading, setLoading] = useState(false);

  async function emit() {
    setLoading(true);
    try {
      const url = `${API_BASE.replace(/\/$/, "")}/diagnostics/emit?message=${encodeURIComponent("hello")}`;
      await fetch(url, { method: "POST" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <button onClick={emit} disabled={loading} style={{ marginTop: 8 }}>
      {loading ? "Emitting…" : "Emit test event"}
    </button>
  );
}


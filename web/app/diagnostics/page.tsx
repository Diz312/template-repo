import Viewer from "@/features/agent-timeline/Viewer";
import EmitButton from "@/features/agent-timeline/EmitButton";

export const dynamic = "force-dynamic";

export default function DiagnosticsPage() {
  return (
    <div>
      <h1>Diagnostics</h1>
      <p>End-to-end smoke test: SSE stream and emit button.</p>
      <EmitButton />
      <Viewer />
    </div>
  );
}


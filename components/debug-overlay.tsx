"use client";

import { useEffect, useState } from "react";

// Use this debug instead nextjs debug to view panel in Safari on iPhone.
export default function DebugOverlay() {
  const [messages, setMessages] = useState<string[]>([]);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const push = (type: string, args: any[]) => {
      setMessages((prev) => [
        `${type}: ${args.map(String).join(" ")}`,
        ...prev.slice(0, 50),
      ]);
    };

    const origError = console.error;
    const origWarn = console.warn;
    const origLog = console.log;

    console.error = (...args) => {
      push("❌ error", args);
      origError(...args);
    };

    console.warn = (...args) => {
      push("⚠️ warn", args);
      origWarn(...args);
    };

    console.log = (...args) => {
      push("ℹ️ log", args);
      origLog(...args);
    };

    window.addEventListener("error", (e) => {
      push("❌ window.error", [e.error?.stack || e.message]);
    });

    window.addEventListener("unhandledrejection", (e) => {
      push("❌ Promise", [e.reason]);
    });

    return () => {
      console.error = origError;
      console.warn = origWarn;
      console.log = origLog;
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        maxHeight: "40vh",
        overflowY: "auto",
        background: "rgba(0,0,0,0.85)",
        color: "#fff",
        fontSize: 12,
        padding: "8px",
        zIndex: 999999,
        fontFamily: "monospace",
        borderTop: "1px solid #444",
      }}
    >
      <button
        style={{
          marginBottom: 8,
          padding: "4px 8px",
          background: "#222",
          color: "#fff",
          border: "1px solid #555",
          borderRadius: 4,
        }}
        onClick={() => setOpen(!open)}
      >
        {open ? "Hide Debug" : "Show Debug"}
      </button>

      {open &&
        messages.map((m, i) => (
          <div key={i} style={{ marginBottom: 4, whiteSpace: "pre-wrap" }}>
            {m}
          </div>
        ))}
    </div>
  );
}

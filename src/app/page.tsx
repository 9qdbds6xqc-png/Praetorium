"use client";

import { trackButtonClick } from "@/lib/analytics";

export default function Home() {
  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>Praetorium Technologies</h1>
      <p>Google Analytics 4 is now tracking page views!</p>

      <div style={{ marginTop: "2rem" }}>
        <button
          onClick={() => {
            console.log("Button clicked!");
            trackButtonClick("cta_button", "hero-cta");
          }}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Track Button Click
        </button>
      </div>

      <div style={{ marginTop: "2rem", fontSize: "0.9rem", color: "#666" }}>
        <p>Check your browser's developer tools (F12) → Network tab to see GA requests.</p>
        <p>Or check the Console tab for any GA-related messages.</p>
      </div>
    </div>
  );
}

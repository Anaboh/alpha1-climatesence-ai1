import React, { useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setResponse("Loading...");
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const data = await res.json();
    setResponse(data.answer || "No response");
  }

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h1>ClimateSenseAI</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="5"
          style={{ width: "100%", fontSize: 16 }}
          placeholder="Enter your query here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button type="submit" style={{ marginTop: 10, padding: "10px 20px", fontSize: 16 }}>
          Ask Perplexity
        </button>
      </form>
      <pre style={{ marginTop: 20, whiteSpace: "pre-wrap" }}>{response}</pre>
    </div>
  );
}

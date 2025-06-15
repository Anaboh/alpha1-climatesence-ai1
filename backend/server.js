require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fetch = (...args) => import("node-fetch").then(({default: fetch}) => fetch(...args));
const supabase = require("./supabaseClient");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("frontend/build"));

// API endpoint to proxy queries to Perplexity API and log to Supabase
app.post("/api/chat", async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: "Query is required" });

    // Log query to Supabase
    await supabase.from("chat_history").insert([{ query, created_at: new Date().toISOString() }]);

    // Call Perplexity API
    const response = await fetch("https://api.perplexity.ai/chat", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(500).json({ error: `Perplexity API error: ${errorText}` });
    }

    const data = await response.json();

    // Return answer to frontend
    res.json({ answer: data.answer || "No answer from Perplexity API" });

  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Serve React frontend for all other routes
app.get("*", (req, res) => {
  res.sendFile(require("path").resolve(__dirname, "../frontend/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

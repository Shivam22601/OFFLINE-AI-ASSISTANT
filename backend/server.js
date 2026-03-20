import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await fetch("http://localhost:11434/api/generate", { // ✅ Ollama's port
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistral",
        prompt: prompt,
        stream: false,
      }),
    });

    const data = await response.json();
    res.json({ reply: data.response });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error" });
  }
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
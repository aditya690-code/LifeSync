import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import encryptMessage  from "./utils/Encryption"

const app = express();
app.use(cors());
app.use(express.json());

app.get("/chat", (req, res) => {
  res.render("./index.ejs");
});

const model = "phi3:mini"; // gemma:2b
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: model,
        prompt: message,
        // stream: false,
        // temperature: 0,
        // top_p: 0.1,
        // stop: ["```", "\n\n", "Explanation", "In this scenario"]
      }),
    });

    const data = await response.json();

    let output = data.response?.trim() || "";

    const firstBrace = output.indexOf("{");
    const lastBrace = output.lastIndexOf("}");

    if (firstBrace !== -1 && lastBrace !== -1) {
      output = output.slice(firstBrace, lastBrace + 1);
    }

    let parsed = response;
    // try {
    //   parsed = JSON.parse(output);
    // } catch (err) {
    //   parsed = {
    //     type: "message",
    //     content: "Sorry, I couldn’t understand that. Please try again."
    //   };
    // }

    res.json(parsed);
  } catch (error) {
    res.status(500).json({
      type: "message",
      content: "Internal server error",
    });
  }
});

const en = encryptMessage("Test message");



app.listen(3000, () => {
  console.log(`${model} AI running on http://localhost:3000`);
});

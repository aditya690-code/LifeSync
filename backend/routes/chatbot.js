import express from "express";
import fetch from "node-fetch";
const router = express.Router();

import { encryptMessage, decryptMessage } from "../utils/Encryption.js";

const model = "phi3:mini"; // gemma:2b

router
  .route("/")
  .get((req, res) => {
    res.render("index.ejs");
  })
  .post(async (req, res) => {
    try {
      const { message } = req.body;
      if (!message.trim()) message = "Hello";
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
      }
      res.send(data);
    } catch (err) {
      console.log(err);
    }
  });

export default router;

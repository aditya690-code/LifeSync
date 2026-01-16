
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get('/chat',(req,res)=>{
  res.render("./index.ejs")
})

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  const prompt = message;
  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gemma:2b",
      prompt: prompt,
      stream: false
    })
  });
  const data = await response.json();
  res.json({ reply: data.response });
});

app.listen(3000, () => {
  console.log("Gemma 2B AI running on http://localhost:3000");
});

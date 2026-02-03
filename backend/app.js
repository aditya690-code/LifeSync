import express from "express";
const app = express();

import dotenv from "dotenv";
import cors from "cors";

import chatRoute from "./routes/chatbot.js";
import homeRoute from "./routes/home.js";

dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/home", homeRoute);
app.use("/chat", chatRoute);

app.get("/", (req, res) => {
  res.send("Hi, welcome to lifesync");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import express from "express";
import mongoose from "mongoose";

import connectDB from "./config/db.js";

import dotenv from "dotenv";
import cors from "cors";

// Routes
import chatRoute from "./routes/chatbot.js";
import homeRoute from "./routes/home.js";
import expensesRoutes from "./routes/expenses.js";

const app = express();
connectDB();

dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/home", homeRoute);
app.use("/chat", chatRoute);
app.use("/expenses", expensesRoutes);

app.get("/", (req, res) => {
  res.send("Hi, welcome to lifesync");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

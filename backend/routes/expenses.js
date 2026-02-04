import express from "express";
const routes = express.Router();
import Expenses from "../models/expenses.js";

routes.route("/:userId").post(async (req, res) => {
  try {
    const { userid } = req.params;

    const expenses = Expenses.find({ userId: userid });
    res.status(201).send({ success: true, message: expenses });
  } catch (error) {
    console.log(error);
    res.status(501).send({ success: false, message: "Error in expenses api" });
  }
});

export default routes;

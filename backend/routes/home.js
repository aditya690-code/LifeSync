import express from "express";
const routes = express.Router();

routes.route("/").post(async (req, res) => {
    
  const expenses = [];
  const diaries = [];
  const notes = [];
  const tasks = [];
  res.status(200).send({ data: { expenses, diaries, notes, tasks } });
});

export default routes;

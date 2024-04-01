const { Router } = require("express");
const rafflesController = Router();

const { getAllRaffles } = require("../queries/rafflesQueries");

rafflesController.get("/", async (req, res) => {
  try {
    const allRaffles = await getAllRaffles();
    res.status(200).json({ data: allRaffles });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = rafflesController;

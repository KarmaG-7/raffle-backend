const express = require("express");
const cors = require("cors");
const rafflesController = require("./controllers/rafflesController");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/raffles", rafflesController);

app.get("/", (req, res) => {
  res.status(200).json({ data: "Server is running!!" });
});

module.exports = app;

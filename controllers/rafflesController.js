const { Router } = require("express");
const rafflesController = Router();

const {
  getAllRaffles,
  getRaffleById,
  getParticipantsByRaffle,
  createNewRaffle,
  newParticipant,
  pickWinner,
} = require("../queries/rafflesQueries");

const {
  validateId,
  raffleExist,
  validateRaffle,
  validateParticipant,
  validateSecretToken,
} = require("../middleware/middleware");

rafflesController.get("/", async (req, res) => {
  try {
    const allRaffles = await getAllRaffles();
    res.status(200).json({ data: allRaffles });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

rafflesController.get("/:id", validateId, raffleExist, async (req, res) => {
  try {
    const { id } = req.params;
    const raffle = await getRaffleById(Number(id));
    res.status(200).json({ data: raffle });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

rafflesController.get(
  "/:id/participants",
  validateId,
  raffleExist,
  async (req, res) => {
    try {
      const { id } = req.params;
      const participants = await getParticipantsByRaffle(Number(id));
      res.status(200).json({ data: participants });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

rafflesController.post("/", validateRaffle, async (req, res) => {
  try {
    const raffle = await createNewRaffle(req.body);
    res.status(200).json({ data: raffle });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

rafflesController.post(
  "/:id/participants",
  validateId,
  validateParticipant,
  async (req, res) => {
    try {
      const { id } = req.params;
      const participant = await newParticipant(req.body, Number(id));
      res.status(200).json({ data: participant });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

rafflesController.put(
  "/:id/winner",
  raffleExist,
  validateSecretToken,
  async (req, res) => {
    try {
      const { id } = req.params;
      const winner = await pickWinner(Number(id));
      res.status(200).json({ data: winner });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = rafflesController;

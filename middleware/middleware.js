const { getRaffleById } = require("../queries/rafflesQueries");

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!Number.isInteger(Number(id)) || Number(id) < 0) {
    return res
      .status(400)
      .json({ error: `id must be a positive integer, received ${id}` });
  }
  next();
};

const raffleExist = async (req, res, next) => {
  const { id } = req.params;
  const raffle = await getRaffleById(Number(id));
  if (!raffle) {
    return res
      .status(404)
      .json({ error: `A raffle with id ${id} doesnot exist` });
  }
  next();
};

const validateRaffle = async (req, res, next) => {
  const raffle = req.body;
  const reqdKeys = ["title", "secret_token"];

  for (let key of reqdKeys) {
    if (!raffle.hasOwnProperty(key)) {
      return res.status(400).json({ error: `${key} field is missing` });
    }
  }
  next();
};
module.exports = { validateId, raffleExist, validateRaffle };

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

module.exports = { validateId, raffleExist };

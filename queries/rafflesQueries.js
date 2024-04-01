const db = require("../db");

const getAllRaffles = async () => {
  const allRaffles = db.any(`SELECT * FROM raffles`);
  return allRaffles;
};

const getRaffleById = async (id) => {
  const raffle = await db.oneOrNone(`SELECT * FROM raffles WHERE id = $1`, [
    id,
  ]);
  return raffle;
};
module.exports = { getAllRaffles, getRaffleById };

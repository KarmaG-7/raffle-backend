const db = require("../db");

const getAllRaffles = async () => {
  const allRaffles = db.any(`SELECT * FROM raffles`);
  return allRaffles;
};

module.exports = { getAllRaffles };

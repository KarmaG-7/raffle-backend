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

const getParticipantsByRaffle = async (id) => {
  const participants = db.any(
    `
    SELECT participants.*, raffles.title AS raffle
    FROM participants
    JOIN raffles ON raffles.id = participants.raffle_id
    WHERE raffles.id = $1
    `,
    [id]
  );
  return participants;
};
module.exports = { getAllRaffles, getRaffleById, getParticipantsByRaffle };

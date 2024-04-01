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

const createNewRaffle = async (data) => {
  const { title, secret_token } = data;
  const newRaffle = db.one(
    `
    INSERT INTO raffles (title,secret_token) 
    VALUES ($1,$2) RETURNING *
    `,
    [title, secret_token]
  );
  return newRaffle;
};

const newParticipant = async (data, id) => {
  const { first_name, last_name, email, phone } = data;

  const participant = await db.one(
    `
    INSERT INTO participants (first_name, last_name, email, phone, raffle_id)
    VALUES($1,$2,$3,$4,$5) RETURNING *
    `,
    [first_name, last_name, email, phone, id]
  );
  return participant;
};

module.exports = {
  getAllRaffles,
  getRaffleById,
  getParticipantsByRaffle,
  createNewRaffle,
  newParticipant,
};

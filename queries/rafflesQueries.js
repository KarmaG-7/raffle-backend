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
  const currentDate = new Date();

  const newRaffle = await db.one(
    `
    INSERT INTO raffles (title,secret_token,created) 
    VALUES ($1,$2,$3) RETURNING *
    `,
    [title, secret_token, currentDate]
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

const pickWinner = async (id) => {
  const allParticipants = await getParticipantsByRaffle(id);
  if (allParticipants.length === 0) {
    throw new Error("No participants available to pick a winner.");
  }
  const winnerIndex = Math.floor(Math.random() * allParticipants.length);
  const winner = allParticipants[winnerIndex];

  await db.none(`UPDATE raffles SET winner_id = $1, draw = $2 WHERE id = $3`, [
    winner.id,
    new Date(),
    id,
  ]);
  return winner;
};

const getWinner = async (id) => {
  const winner = await db.oneOrNone(
    `
    SELECT participants.*, raffles.title AS raffle
    FROM participants
    JOIN raffles ON raffles.winner_id = participants.id
    WHERE raffles.id = $1
    `,
    [id]
  );
  return winner;
};

module.exports = {
  getAllRaffles,
  getRaffleById,
  getParticipantsByRaffle,
  createNewRaffle,
  newParticipant,
  pickWinner,
  getWinner,
};

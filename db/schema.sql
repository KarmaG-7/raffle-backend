DROP TABLE IF EXISTS participants CASCADE;
DROP TABLE IF EXISTS raffles CASCADE;

CREATE TABLE raffles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  secret_token VARCHAR(255),
  created timestamptz,
  draw timestamptz DEFAULT NULL
);

CREATE TABLE participants (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(255),
  raffle_id INTEGER REFERENCES raffles(id) ON DELETE CASCADE
);

-- Add a new column to the raffles table
ALTER TABLE raffles 
ADD COLUMN 
winner_id INTEGER REFERENCES participants(id) ON DELETE SET NULL

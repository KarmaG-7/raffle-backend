# Raffles Backend API

This project provides an API for managing raffles, participants, and winners.

## Getting Started

Follow these instructions to set up and run the backend server locally.

### Prerequisites

- Node.js and npm installed on your machine.
- PostgreSQL installed and running.

### Installation

1. Clone the repository to your local machine:
   git clone <https://github.com/KarmaG-7/raffle-backend-url>

2. Navigate to the project directory:

   cd raffles-backend

3. Install dependencies:

   npm install

4. Create a .env file in the project root directory and add your PostgreSQL connection string:

   DB_URL=postgres://username:password@hostname:port/database

5. Running the Server

   Start the server by running: npm start
   The server will start listening on port 9000 by default

### API Endpoints

- GET /api/raffles: Get all raffles.

- GET /api/raffles/:id: Get a specific raffle by ID.

- GET /api/raffles/:id/participants: Get participants of a specific raffle by ID.

- POST /api/raffles: Create a new raffle.

- POST /api/raffles/:id/participants: Add a new participant to a specific raffle.

- PUT /api/raffles/:id/winner: Pick a winner for a specific raffle.

- GET /api/raffles/:id/winner: Get the winner of a specific raffle.

### Request and Response Formats

Request data should be sent in JSON format.

Responses will be sent in JSON format and will include a data key with the requested data or an error key with an error message.

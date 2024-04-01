require("dotenv").config();
const app = require("./app");

const PORT = process.env.port || 9000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

const app = require("../index"); // Import the Express app
const { createServer } = require("@vercel/node");

module.exports = createServer(app);

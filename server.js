const { createServer } = require('http');
const app = require('./app'); //express app

const server = createServer(app); //create server

//process.env
const { config } = require("dotenv");
config({ path: "./.env" });
// port
const PORT = process.env.PORT || 8000;

// running the server
server.listen(PORT, () => {
    console.log("Node.js server running on port", PORT);
})

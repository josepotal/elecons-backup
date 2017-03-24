const fs = require('fs');
const thereIsDotEnv = fs.existsSync('.env');
if ( thereIsDotEnv ) require('dotenv').config();

//set a base path directory
global.__base = __dirname + '/server/';

const app = require('./server/app');
const db = require('./server/config/db');

// server is created upon the express app. io
const server = require('http').createServer(app);

//io is the socket created on the server
const io = require('socket.io')(server);
require('./server/sockets')(io);

const dbURI = process.env.DB_URI;
const PORT = process.env.PORT;

db.open(dbURI);

// listen to the server, not the express app
server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
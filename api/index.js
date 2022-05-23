require('dotenv').config();
const { connect } = require('./lib/db');
const http = require('http');
const app = require('./app');
require('./lib/wss');

let server = http.createServer(app);
const PORT = process.env.PORT || 5000;

connect()
  .then(() => {
    console.log('Database connection established.');
    server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
  })
  .catch(err => {
    console.log(err.message);
    process.exit(1);
  });

module.exports = { server };

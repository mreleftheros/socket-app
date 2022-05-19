require('dotenv').config();
const { connect } = require('./lib/db');
const app = require('./app');
require('./lib/wss');

const PORT = process.env.PORT || 5000;

connect()
  .then(() => {
    console.log('Database connection established.');
    app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
  })
  .catch(err => {
    console.log(err.message);
    process.exit(1);
  });

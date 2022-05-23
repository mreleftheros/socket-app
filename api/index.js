require('dotenv').config();
const { connect } = require('./lib/db');
const http = require('http');
const app = require('./app');
const { WebSocketServer } = require('ws');

let server = http.createServer(app);
const PORT = process.env.PORT || 5000;

const {
  addUi,
  removeUi,
  broadcast,
  getUiById,
  getUsernames,
  getUiyByWs,
} = require('./utils/wss');

const wss = new WebSocketServer(
  process.env.NODE_ENV === 'production' ? { server } : { port: 8100 }
);

wss.on('connection', ws => {
  ws.on('message', data => {
    data = JSON.parse(data);
    const { type, payload } = data;

    switch (type) {
      case 'SET_WS':
        const ui = getUiById(payload._id);

        if (ui) {
          return broadcast(
            'SET_WS',
            {
              error: 'User already connected.',
            },
            ws
          );
        }

        addUi({ ws, ...payload });
        broadcast('SET_MESSAGE', {
          message: `User ${payload.username} connected to the chatroom.`,
        });
        broadcast('SET_ONLINE', {
          online: getUsernames(),
        });
        break;
      case 'SET_MESSAGE':
        const { _id, username, message } = payload;

        broadcast('SET_MESSAGE', {
          username,
          message,
        });
        break;
    }
  });

  ws.on('close', () => {
    const { username } = getUiyByWs(ws);
    removeUi(ws);
    broadcast('SET_ONLINE', {
      online: getUsernames(),
    });

    broadcast('SET_MESSAGE', {
      message: `User ${username} disconnected from the chatroom.`,
    });
  });

  broadcast('SET_HANDSHAKE', null, ws);
});

connect()
  .then(() => {
    console.log('Database connection established.');
    server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
  })
  .catch(err => {
    console.log(err.message);
    process.exit(1);
  });

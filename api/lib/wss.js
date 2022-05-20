const { WebSocketServer } = require('ws');
const {
  addUi,
  removeUi,
  broadcast,
  getUi,
  getUsernames,
} = require('../utils/wss');

const wss = new WebSocketServer({ port: 8200 });

wss.on('connection', ws => {
  ws.on('message', data => {
    data = JSON.parse(data);
    const { type, payload } = data;

    switch (type) {
      case 'SET_WS':
        const ui = getUi(payload._id);

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
    console.log('dc');
    removeUi(ws);
    broadcast('SET_ONLINE', {
      online: getUsernames(),
    });
  });

  broadcast('SET_HANDSHAKE', null, ws);
});

module.exports = wss;

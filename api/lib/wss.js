const { WebSocketServer } = require('ws');
const {
  addUi,
  removeUi,
  broadcast,
  getUiById,
  getUsernames,
  getUiyByWs,
} = require('../utils/wss');
const { server } = require('../index');

let opts = process.env.NODE_ENV === 'production' ? { server } : { port: 8100 };

const wss = new WebSocketServer(opts);

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

module.exports = {
  wss,
};

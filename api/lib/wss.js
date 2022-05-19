const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 8000 });

wss.on('connection', ws => {
  console.log('new client');
  ws.send('hello client');

  ws.on('message', data => {
    console.log('received: ', data.toString());
  });

  ws.on('close', () => {
    console.log('dc');
  });
});

module.exports = wss;
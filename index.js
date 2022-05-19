const app = require('./api/app');
const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 8000 });
const PORT = process.env.PORT || 5000;

wss.on('connection', ws => {
  console.log('new client');
  ws.send('hello client');

  ws.on('message', data => {
    console.log('received: ', data.toString());
  });

  ws.on('close', () => {
    console.log('dc');
  })
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

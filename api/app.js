const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const auth = require('./route/auth');

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/api/auth', auth);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../ui/public')));
  app.get('*', (req, res) => {
    return res.sendFile(
      path.resolve(__dirname, '../', 'ui', 'public', 'index.html')
    );
  });
}

module.exports = app;

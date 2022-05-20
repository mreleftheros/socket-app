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

module.exports = app;

const router = require('express').Router();
const User = require('../model/User');
const { createToken, cookieOpts } = require('../utils/auth');
const { protect } = require('../middleware/auth');

router.post('/signup', async (req, res) => {
  try {
    const { errors, error, data } = User.validate(req.body);
    if (error) {
      return res.status(400).json({ ...errors, error });
    }

    const { username, password } = data;

    const userExists = await User.check(username);
    if (userExists) {
      return res.status(400).json({ error: 'Username already exists.' });
    }

    const { _id } = await User.signup(username, password);

    const token = createToken(_id, username);

    res.cookie('access-token', token, cookieOpts);

    return res.status(201).json({ _id, username, token });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { errors, error, data } = User.validate(req.body);
    if (error) {
      return res.status(400).json({ ...errors, error });
    }

    const { username, password } = data;

    const result = await User.login(username, password);
    if (result.error) {
      return res.status(404).json({ error: result.error });
    }

    const token = createToken(result._id, username);

    res.cookie('access-token', token, cookieOpts);

    return res.json({ _id: result._id, username, token });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
});

router.get('/me', protect, (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authorized.' });
    }

    return res.json(req.user);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
});

router.get('/logout', (req, res) => {
  try {
    res.clearCookie('access-token');
    return res.json(true);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;

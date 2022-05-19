const jwt = require('jsonwebtoken');
const User = require('../model/User');

exports.protect = async (req, res, next) => {
  try {
    const token = req.cookies['access-token'];

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized. No token.' });
    }

    const decoded = jwt.verify(token, process.env.JWT);

    const result = await User.getById(decoded['0']);
    if (!result) {
      return res.status(404).json({ error: 'No user found.' });
    }

    req.user = result;
    return next();
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
};

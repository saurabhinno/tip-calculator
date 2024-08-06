const jwt = require('jsonwebtoken');
const User = require('../models/user'); 

const verifyToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.userId = decoded.id;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.isLoggedIn) {
      return res.status(403).json({ error: 'User is not logged in' });
    }

    next();
  } catch (err) {
    console.error(err.message);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = {
    verifyToken
};

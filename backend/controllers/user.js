const { validationResult } = require('express-validator');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  
    const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' });
    return token;
  };
  

const signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { name, email, password } = req.body;
    const proPic = req.file;
  
    const proPicUrl = `${req.protocol}://${req.get('host')}/uploads/${proPic?.filename}`;
  
    try {
      const user = new User({
        name,
        email,
        password,
        proPic: proPicUrl,
      });
  
      await user.save();
  
      const token = generateToken(user);
  
      return res.status(201).json({ message: 'User signed up successfully', ...{name: user.name}, token });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
};
const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
  
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
    
      if (user.isLoggedIn) {
        return res.status(400).json({ error: 'User is already logged in. Please log out first.' });
      }

      user.isLoggedIn = true;
      await user.save();
  
      const token = generateToken(user);
  
      return res.status(200).json({ message: 'User logged in successfully', token });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Server error' });
    }
  };

  const logout = async (req, res) => {
    try {
      const userId = req.userId;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      if (!user.isLoggedIn) {
        return res.status(400).json({ error: 'User is not logged in' });
      }
  
      user.isLoggedIn = false;
      await user.save();
  
      return res.status(200).json({ message: 'User logged out successfully' });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Server error' });
    }
  };
module.exports = {
  signup,
  login,
  logout
};

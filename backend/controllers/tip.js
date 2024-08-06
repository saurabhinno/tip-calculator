const Tip = require('../models/tip'); 
const { validationResult } = require('express-validator');

const createTip = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { place, totalAmount, tipPercentage } = req.body;

  try {
    const tipAmount = (totalAmount * tipPercentage) / 100;

    const tip = new Tip({
      place,
      totalAmount,
      tipPercentage,
      tipAmount,
      user: req.userId
    });

    await tip.save();
    return res.status(201).json({ message: 'Tip created successfully', tip: tipAmount });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: 'Server error' });
  }
};

const getAllTips = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { startDate, endDate } = req.query;
  
    const startParts = startDate.split('-');
    const endParts = endDate.split('-');
    const startDateObj = new Date(startParts[2], startParts[1] - 1, startParts[0]); 
    const endDateObj = new Date(endParts[2], endParts[1] - 1, endParts[0]);
  
    if (startDateObj > endDateObj) {
      return res.status(400).json({ error: 'Start date must be earlier than end date' });
    }
  
    try {
      const tips = await Tip.find({
        createdAt: {
          $gte: startDateObj,
          $lte: endDateObj,
        },
        user: req.userId
      });
  
      return res.status(200).json({ tips });
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Server error' });
    }
  };

module.exports = {
  createTip,
  getAllTips
};

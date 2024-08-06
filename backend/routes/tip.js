var express = require('express');
var router = express.Router();
const multer = require('multer');
const {createTip, getAllTips} = require('../controllers/tip')
const { validateTip} = require('../validators/tip')
const {verifyToken} = require('../middleware/auth')

router.post('/calculate', verifyToken, validateTip, createTip);
router.get('/', verifyToken, getAllTips);

module.exports = router;

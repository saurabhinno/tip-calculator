var express = require('express');
var router = express.Router();
const multer = require('multer');
const {signup, login, logout} = require('../controllers/user')
const {validateSignup, validateLogin} = require('../validators/user')
const {verifyToken} = require('../middleware/auth')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 } // Limit file size to 1MB
});

/* GET users listing. */
router.post('/', upload.single('proPic'),validateSignup, signup);
router.post('/login', validateLogin, login);
router.post('/logout', verifyToken, logout);
module.exports = router;

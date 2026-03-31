const express = require('express');
const { body } = require('express-validator');
const { register, login, getCurrentUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post(
  '/register',
  [
    body('name', 'Name is required').trim().notEmpty(),
    body('email', 'Please provide a valid email').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    body('phone', 'Please provide a valid 10-digit phone number')
      .matches(/^[0-9]{10}$/),
    body('city', 'City is required').trim().notEmpty(),
    body('state', 'State is required').trim().notEmpty(),
  ],
  register
);

router.post(
  '/login',
  [
    body('email', 'Please provide a valid email').isEmail(),
    body('password', 'Password is required').notEmpty(),
  ],
  login
);

router.get('/me', protect, getCurrentUser);

module.exports = router;

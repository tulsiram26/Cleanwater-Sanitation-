const express = require('express');
const { body } = require('express-validator');
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserStats,
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, authorize('admin'), getAllUsers);

router.get('/stats/dashboard', protect, authorize('admin'), getUserStats);

router.get('/:id', protect, getUserById);

router.patch(
  '/:id',
  protect,
  [
    body('name', 'Name must be a string').optional().trim(),
    body('phone', 'Please provide a valid 10-digit phone number')
      .optional()
      .matches(/^[0-9]{10}$/),
    body('city', 'City must be a string').optional().trim(),
    body('state', 'State must be a string').optional().trim(),
  ],
  updateUser
);

router.delete('/:id', protect, authorize('admin'), deleteUser);

module.exports = router;

const express = require('express');
const { body } = require('express-validator');
const {
  createReport,
  getAllReports,
  getUserReports,
  getReportById,
  updateReport,
  deleteReport,
  getReportStats,
} = require('../controllers/reportController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post(
  '/',
  protect,
  upload.single('image'),
  [
    body('title', 'Title is required').trim().notEmpty(),
    body('issueType', 'Issue type must be one of: dirty water, leakage, no supply')
      .isIn(['dirty water', 'leakage', 'no supply']),
    body('description', 'Description is required').trim().notEmpty(),
    body('latitude', 'Valid latitude is required')
      .isFloat({ min: -90, max: 90 }),
    body('longitude', 'Valid longitude is required')
      .isFloat({ min: -180, max: 180 }),
  ],
  createReport
);

router.get('/', getAllReports);

router.get('/user/my-reports', protect, getUserReports);

router.get('/stats/dashboard', protect, authorize('admin'), getReportStats);

router.get('/:id', getReportById);

router.patch(
  '/:id',
  protect,
  authorize('admin'),
  [
    body('status', 'Status must be one of: Pending, In Progress, Resolved')
      .optional()
      .isIn(['Pending', 'In Progress', 'Resolved']),
    body('priority', 'Priority must be one of: Low, Medium, High')
      .optional()
      .isIn(['Low', 'Medium', 'High']),
    body('comment', 'Comment must be a string').optional().trim(),
  ],
  updateReport
);

router.delete('/:id', protect, deleteReport);

module.exports = router;

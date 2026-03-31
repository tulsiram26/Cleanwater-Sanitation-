const Report = require('../models/Report');
const { uploadToCloudinary, deleteFromCloudinary } = require('../services/cloudinary');
const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

const createReport = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { title, issueType, description, latitude, longitude, address } = req.body;

    let imageUrl = null;

    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.path, 'jalrakshak/reports');

      if (!uploadResult.success) {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({
          success: false,
          message: 'Failed to upload image',
          error: uploadResult.error,
        });
      }

      imageUrl = uploadResult.url;
      fs.unlinkSync(req.file.path);
    }

    const report = new Report({
      title,
      issueType,
      description,
      image: imageUrl,
      location: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        address,
      },
      createdBy: req.user._id,
    });

    await report.save();
    await report.populate('createdBy', 'name email phone');

    res.status(201).json({
      success: true,
      message: 'Report created successfully',
      report,
    });
  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);
    next(error);
  }
};

const getAllReports = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status, sortBy = '-createdAt' } = req.query;

    const filter = {};
    if (status) filter.status = status;

    const skip = (page - 1) * limit;
    const total = await Report.countDocuments(filter);
    const reports = await Report.find(filter)
      .populate('createdBy', 'name email phone')
      .populate('lastUpdatedBy', 'name email')
      .populate('comments.userId', 'name email')
      .sort(sortBy)
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: reports.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      reports,
    });
  } catch (error) {
    next(error);
  }
};

const getUserReports = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const filter = { createdBy: req.user._id };
    if (status) filter.status = status;

    const skip = (page - 1) * limit;
    const total = await Report.countDocuments(filter);

    const reports = await Report.find(filter)
      .populate('createdBy', 'name email phone')
      .populate('lastUpdatedBy', 'name email')
      .sort('-createdAt')
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: reports.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      reports,
    });
  } catch (error) {
    next(error);
  }
};

const getReportById = async (req, res, next) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate('createdBy', 'name email phone location')
      .populate('lastUpdatedBy', 'name email')
      .populate('comments.userId', 'name email');

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found',
      });
    }

    res.status(200).json({
      success: true,
      report,
    });
  } catch (error) {
    next(error);
  }
};

const updateReport = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { status, priority, comment } = req.body;

    let report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found',
      });
    }

    if (status) {
      report.status = status;
      report.lastUpdatedBy = req.user._id;
      if (status === 'Resolved') report.resolvedOn = new Date();
    }

    if (priority) report.priority = priority;

    if (comment) {
      report.comments.push({
        userId: req.user._id,
        comment,
      });
    }

    await report.save();

    await report.populate('createdBy', 'name email phone');
    await report.populate('lastUpdatedBy', 'name email');
    await report.populate('comments.userId', 'name email');

    res.status(200).json({
      success: true,
      message: 'Report updated successfully',
      report,
    });
  } catch (error) {
    next(error);
  }
};

const deleteReport = async (req, res, next) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found',
      });
    }

    if (
      report.createdBy.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this report',
      });
    }

    await Report.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Report deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

const getReportStats = async (req, res, next) => {
  try {
    const totalReports = await Report.countDocuments();
    const pendingReports = await Report.countDocuments({ status: 'Pending' });
    const inProgressReports = await Report.countDocuments({ status: 'In Progress' });
    const resolvedReports = await Report.countDocuments({ status: 'Resolved' });

    const reportsByType = await Report.aggregate([
      {
        $group: {
          _id: '$issueType',
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalReports,
        pendingReports,
        inProgressReports,
        resolvedReports,
        reportsByType,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReport,
  getAllReports,
  getUserReports,
  getReportById,
  updateReport,
  deleteReport,
  getReportStats,
};

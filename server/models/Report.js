const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a report title'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    issueType: {
      type: String,
      enum: ['dirty water', 'leakage', 'no supply'],
      required: [true, 'Please specify the issue type'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    image: {
      type: String, // Cloudinary URL
      default: null,
    },
    location: {
      latitude: {
        type: Number,
        required: [true, 'Please provide latitude'],
        min: [-90, 'Latitude must be between -90 and 90'],
        max: [90, 'Latitude must be between -90 and 90'],
      },
      longitude: {
        type: Number,
        required: [true, 'Please provide longitude'],
        min: [-180, 'Longitude must be between -180 and 180'],
        max: [180, 'Longitude must be between -180 and 180'],
      },
      address: {
        type: String,
        default: null,
      },
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Resolved'],
      default: 'Pending',
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Report must be created by a user'],
    },
    lastUpdatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    resolvedOn: {
      type: Date,
      default: null,
    },
    comments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        comment: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
reportSchema.index({ status: 1, createdAt: -1 });
reportSchema.index({ 'location.latitude': 1, 'location.longitude': 1 });
reportSchema.index({ createdBy: 1 });

module.exports = mongoose.model('Report', reportSchema);

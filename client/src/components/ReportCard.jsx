import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ReportCard = ({ report }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'from-yellow-100 to-yellow-50';
      case 'In Progress':
        return 'from-blue-100 to-blue-50';
      case 'Resolved':
        return 'from-green-100 to-green-50';
      default:
        return 'from-gray-100 to-gray-50';
    }
  };

  const getStatusBorderColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'border-yellow-300';
      case 'In Progress':
        return 'border-blue-300';
      case 'Resolved':
        return 'border-green-300';
      default:
        return 'border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return '⏳';
      case 'In Progress':
        return '🔧';
      case 'Resolved':
        return '✅';
      default:
        return '❓';
    }
  };

  const getIssueTypeIcon = (type) => {
    switch (type) {
      case 'dirty water':
        return '💧';
      case 'leakage':
        return '🚰';
      case 'no supply':
        return '⚠️';
      default:
        return '❓';
    }
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const created = new Date(date);
    const diffMs = now - created;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return created.toLocaleDateString();
  };

  return (
    <motion.div
      className={`bg-gradient-to-br ${getStatusColor(report.status)} rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl cursor-pointer border-2 ${getStatusBorderColor(
        report.status
      )}`}
      whileHover={{ y: -12, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/report/${report._id}`)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden bg-gray-300 h-56">
        {report.image ? (
          <motion.img
            src={report.image}
            alt={report.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.4 }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-300 to-cyan-300">
            <span className="text-6xl opacity-30">{getIssueTypeIcon(report.issueType)}</span>
          </div>
        )}

        {/* Status Badge - Floating */}
        <motion.div
          className="absolute top-3 right-3 backdrop-blur-md bg-white/80 px-3 py-1 rounded-full flex items-center gap-1 shadow-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-lg">{getStatusIcon(report.status)}</span>
          <span className="text-xs font-bold text-gray-800">{report.status}</span>
        </motion.div>

        {/* Issue Type Badge - Top Left */}
        <motion.div
          className="absolute top-3 left-3 backdrop-blur-md bg-white/80 px-3 py-1 rounded-full flex items-center gap-1 shadow-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-lg">{getIssueTypeIcon(report.issueType)}</span>
          <span className="text-xs font-bold text-gray-800">{report.issueType}</span>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Title */}
        <motion.h3
          className="font-bold text-lg text-gray-900 line-clamp-2 mb-2 leading-tight"
          whileHover={{ color: '#06B6D4' }}
        >
          {report.title}
        </motion.h3>

        {/* Description */}
        <p className="text-gray-700 text-sm line-clamp-2 mb-4 leading-relaxed">
          {report.description}
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 mb-4 bg-white rounded-lg p-3">
          <motion.div
            className="text-center"
            whileHover={{ scale: 1.05 }}
          >
            <p className="text-xs text-gray-500">Location</p>
            <p className="text-sm font-semibold text-gray-800 truncate">
              📍 {(report.location?.address || 'Unknown').split(',')[0]}
            </p>
          </motion.div>

          <motion.div
            className="text-center border-l border-r border-gray-300"
            whileHover={{ scale: 1.05 }}
          >
            <p className="text-xs text-gray-500">Time</p>
            <p className="text-sm font-semibold text-gray-800">
              ⏰ {getTimeAgo(report.createdAt)}
            </p>
          </motion.div>

          <motion.div
            className="text-center"
            whileHover={{ scale: 1.05 }}
          >
            <p className="text-xs text-gray-500">Reporter</p>
            <p className="text-sm font-semibold text-gray-800 truncate">
              👤 {report.createdBy?.name ? report.createdBy.name.split(' ')[0] : 'Guest'}
            </p>
          </motion.div>
        </div>

        {/* Details Footer */}
        <div className="border-t pt-3 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-1 text-xs text-gray-600"
            whileHover={{ scale: 1.05 }}
          >
            <span>📌</span>
            <span className="font-medium">{report.location?.address || 'Location'}</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-1 text-xs text-gray-600"
            whileHover={{ scale: 1.05 }}
          >
            <span>✍️</span>
            <span>{new Date(report.createdAt).toLocaleDateString()}</span>
          </motion.div>
        </div>

        {/* CTA Button */}
        <motion.button
          className="w-full mt-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-lg font-semibold hover:shadow-lg transition-all text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/report/${report._id}`);
          }}
        >
          View Full Report 👉
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ReportCard;

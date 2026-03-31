import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { reportAPI } from '../services/api';
import Loader from '../components/Loader';

const AdminPanel = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editingStatus, setEditingStatus] = useState('');
  const [comment, setComment] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('-createdAt');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await reportAPI.getAllReports({ limit: 100 });
      setReports(response.data.reports || []);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id) => {
    try {
      const data = { status: editingStatus };
      if (comment) {
        data.comment = comment;
      }
      await reportAPI.updateReport(id, data);
      toast.success('Report updated successfully');
      setEditingId(null);
      setEditingStatus('');
      setComment('');
      fetchReports();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update report');
    }
  };

  // Filter and search reports
  let filteredReports = [...reports];
  if (statusFilter !== 'all') {
    filteredReports = filteredReports.filter((r) => r.status === statusFilter);
  }
  if (searchQuery) {
    filteredReports = filteredReports.filter(
      (r) =>
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.location?.address?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Calculate stats
  const stats = {
    total: reports.length,
    pending: reports.filter((r) => r.status === 'Pending').length,
    inProgress: reports.filter((r) => r.status === 'In Progress').length,
    resolved: reports.filter((r) => r.status === 'Resolved').length,
  };

  if (loading) {
    return <Loader />;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Resolved':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 px-4 sm:px-6 lg:px-8 pt-24 pb-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            🛠️ Admin Control Center
          </h1>
          <p className="text-xl text-gray-600">
            Manage and resolve water issues across your region
          </p>
        </motion.div>

        {/* Stats Dashboard */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {[
            { label: 'Total Issues', value: stats.total, color: 'from-blue-500', icon: '📋' },
            { label: 'Pending', value: stats.pending, color: 'from-yellow-500', icon: '⏳' },
            { label: 'In Progress', value: stats.inProgress, color: 'from-purple-500', icon: '🔧' },
            { label: 'Resolved', value: stats.resolved, color: 'from-green-500', icon: '✅' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className={`bg-gradient-to-br ${stat.color} to-cyan-400 rounded-xl p-4 text-white shadow-lg`}
              whileHover={{ y: -4, scale: 1.02 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
            >
              <div className="text-3xl mb-1">{stat.icon}</div>
              <p className="text-xs opacity-90">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Controls */}
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <input
                type="text"
                placeholder="🔍 Search by title, description or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none"
              />
            </motion.div>

            {/* Filter */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 }}>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none"
              >
                <option value="all">All Status</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </motion.div>

            {/* Refresh */}
            <motion.button
              onClick={fetchReports}
              className="px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              🔄 Refresh Reports
            </motion.button>
          </div>
          <p className="text-sm text-gray-500 mt-3">Found {filteredReports.length} report(s)</p>
        </motion.div>

        {/* Reports Container */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {filteredReports.length > 0 ? (
            filteredReports.map((report, index) => (
              <motion.div
                key={report._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all border-l-4 border-blue-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
                whileHover={{ x: 4 }}
              >
                {/* Report Row */}
                <div
                  className="p-6 cursor-pointer"
                  onClick={() => setExpandedId(expandedId === report._id ? null : report._id)}
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    {/* Left Section */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{getIssueTypeIcon(report.issueType)}</span>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-lg text-gray-900 line-clamp-2">
                            {report.title}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            {report.location?.address || 'Unknown Location'} • Reported{' '}
                            {Math.floor(
                              (new Date() - new Date(report.createdAt)) / (1000 * 60 * 60)
                            )}{' '}
                            hours ago
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right Section - Badges */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <motion.span
                        className="px-3 py-1 text-xs font-semibold rounded-full bg-cyan-100 text-cyan-800"
                        whileHover={{ scale: 1.05 }}
                      >
                        {report.issueType}
                      </motion.span>
                      <motion.span
                        className={`px-3 py-1 text-xs font-semibold rounded-full border-2 flex items-center gap-1 ${getStatusColor(
                          report.status
                        )}`}
                        whileHover={{ scale: 1.05 }}
                      >
                        {getStatusIcon(report.status)} {report.status}
                      </motion.span>

                      {/* Expand Icon */}
                      <motion.div
                        animate={{ rotate: expandedId === report._id ? 180 : 0 }}
                        className="text-xl"
                      >
                        ▼
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: expandedId === report._id ? 'auto' : 0,
                    opacity: expandedId === report._id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="border-t bg-gray-50 p-6 space-y-4">
                    {/* Description */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">📝 Description</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{report.description}</p>
                    </div>

                    {/* Reporter Info */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-gray-500 text-xs">Reported By</p>
                        <p className="font-semibold text-gray-900">
                          {report.createdBy?.name || 'Unknown'}
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-gray-500 text-xs">Contact</p>
                        <p className="font-semibold text-gray-900">
                          {report.createdBy?.phone || 'N/A'}
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-gray-500 text-xs">Email</p>
                        <p className="font-semibold text-gray-900 break-all text-xs">
                          {report.createdBy?.email || 'N/A'}
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <p className="text-gray-500 text-xs">Created</p>
                        <p className="font-semibold text-gray-900">
                          {new Date(report.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Image */}
                    {report.image && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">📸 Evidence Photo</h4>
                        <img
                          src={report.image}
                          alt={report.title}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                    )}

                    {/* Update Status Section */}
                    <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                      {editingId === report._id ? (
                        <motion.div className="space-y-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                          <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                              Update Status
                            </label>
                            <select
                              value={editingStatus}
                              onChange={(e) => setEditingStatus(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                            >
                              <option value="">Select Status</option>
                              <option value="Pending">Pending</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Resolved">Resolved</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                              Admin Comment (Optional)
                            </label>
                            <textarea
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              placeholder="Add work notes or update message..."
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                              rows="3"
                            />
                          </div>
                          <div className="flex gap-2">
                            <motion.button
                              onClick={() => handleUpdateStatus(report._id)}
                              className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              ✅ Save Changes
                            </motion.button>
                            <motion.button
                              onClick={() => {
                                setEditingId(null);
                                setComment('');
                              }}
                              className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              ❌ Cancel
                            </motion.button>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.button
                          onClick={() => {
                            setEditingId(report._id);
                            setEditingStatus(report.status);
                          }}
                          className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          ✏️ Update Status & Add Comment
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))
          ) : (
            <motion.div
              className="text-center py-16 bg-white rounded-xl shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <p className="text-5xl mb-4">📭</p>
              <p className="text-2xl text-gray-600 mb-2">No Reports Found</p>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPanel;

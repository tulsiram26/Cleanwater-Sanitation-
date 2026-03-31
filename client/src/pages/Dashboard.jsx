import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { reportAPI } from '../services/api';
import ReportCard from '../components/ReportCard';
import MapView from '../components/MapView';
import Loader from '../components/Loader';

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'map'
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [issueTypeFilter, setIssueTypeFilter] = useState('all');

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    filterReports();
  }, [reports, statusFilter, searchQuery, issueTypeFilter]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await reportAPI.getAllReports();
      const data = response.data?.reports || response.data || [];
      setReports(Array.isArray(data) ? data : []);
      if (Array.isArray(data) && data.length > 0) {
        toast.success(`Loaded ${data.length} reports`);
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message || 'Failed to load reports');
      console.error('Error fetching reports:', error);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  const filterReports = () => {
    let filtered = [...reports];

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter((r) => r.status === statusFilter);
    }

    // Filter by issue type
    if (issueTypeFilter !== 'all') {
      filtered = filtered.filter((r) => r.issueType === issueTypeFilter);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (r) =>
          r.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredReports(filtered);
  };

  if (loading) {
    return <Loader />;
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 px-4 sm:px-6 lg:px-8 pt-24 pb-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-red-50 border-2 border-red-300 rounded-2xl p-8 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">Unable to Load Reports</h2>
            <p className="text-red-600 mb-6">{error}</p>
            <motion.button
              onClick={fetchReports}
              className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🔄 Try Again
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  const stats = {
    total: reports.length,
    pending: reports.filter((r) => r.status === 'Pending').length,
    inProgress: reports.filter((r) => r.status === 'In Progress').length,
    resolved: reports.filter((r) => r.status === 'Resolved').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 px-4 sm:px-6 lg:px-8 pt-24 pb-10">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          className="mb-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-8 md:p-12 text-white shadow-2xl"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                💧 Water Crisis Dashboard
              </h1>
              <p className="text-lg opacity-90 mb-6">
                Monitor water issues in real-time, track progress, and make a difference in your community.
              </p>
              <Link
                to="/report-issue"
                className="inline-block"
              >
                <motion.button
                  className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                  whileHover={{ scale: 1.05, x: 4 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🚀 Report Issue Now
                </motion.button>
              </Link>
            </div>
            <motion.div
              className="text-6xl md:text-7xl opacity-20"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🌊
            </motion.div>
          </div>
        </motion.div>

        {/* Stats with Counter Animation */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {[
            { label: 'Total Issues', value: stats.total, color: 'from-blue-500', icon: '📋', bg: 'from-blue-600 to-blue-400' },
            { label: 'Pending', value: stats.pending, color: 'from-yellow-500', icon: '⏳', bg: 'from-yellow-500 to-orange-400' },
            { label: 'In Progress', value: stats.inProgress, color: 'from-purple-500', icon: '⚙️', bg: 'from-purple-600 to-purple-400' },
            { label: 'Resolved', value: stats.resolved, color: 'from-green-500', icon: '✅', bg: 'from-green-600 to-emerald-400' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className={`bg-gradient-to-br ${stat.bg} rounded-2xl p-6 text-white shadow-xl overflow-hidden relative`}
              whileHover={{ y: -12, scale: 1.03 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 opacity-10 text-4xl">{stat.icon}</div>
              <p className="text-sm opacity-90 font-semibold">{stat.label}</p>
              <motion.p
                className="text-5xl font-bold mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
              >
                {stat.value}
              </motion.p>
              <motion.div
                className="mt-3 h-1 bg-white/30 rounded-full overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.6 + index * 0.1, duration: 1 }}
              >
                <motion.div
                  className="h-full bg-white"
                  initial={{ width: 0 }}
                  animate={{ width: `${(stat.value / stats.total || 0) * 100}%` }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Stats Section */}
        {reports.length > 0 && (
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border-l-4 border-blue-500">
                <p className="text-gray-600 text-sm font-semibold">Most Report Type</p>
                <p className="text-2xl font-bold text-blue-600 mt-2">
                  {reports.length > 0
                    ? Object.entries(
                        reports.reduce((acc, r) => {
                          acc[r.issueType] = (acc[r.issueType] || 0) + 1;
                          return acc;
                        }, {})
                      ).sort((a, b) => b[1] - a[1])[0]?.[0]
                    : 'N/A'}
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border-l-4 border-green-500">
                <p className="text-gray-600 text-sm font-semibold">Last Report</p>
                <p className="text-2xl font-bold text-green-600 mt-2">
                  {reports.length > 0
                    ? new Date(
                        Math.max(
                          ...reports.map((r) => new Date(r.createdAt).getTime())
                        )
                      ).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                    : 'N/A'}
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border-l-4 border-purple-500">
                <p className="text-gray-600 text-sm font-semibold">Resolution Rate</p>
                <p className="text-2xl font-bold text-purple-600 mt-2">
                  {reports.length > 0
                    ? `${Math.round((stats.resolved / reports.length) * 100)}%`
                    : '0%'}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Controls */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 mb-10 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="space-y-4">
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">🔍 Search Issues</label>
              <input
                type="text"
                placeholder="Search by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
              />
            </motion.div>

            {/* Filters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Status Filter */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">📊 Status Filter</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
                >
                  <option value="all">All Status</option>
                  <option value="Pending">⏳ Pending</option>
                  <option value="In Progress">⚙️ In Progress</option>
                  <option value="Resolved">✅ Resolved</option>
                </select>
              </motion.div>

              {/* Issue Type Filter */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.48 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">💧 Issue Type</label>
                <select
                  value={issueTypeFilter}
                  onChange={(e) => setIssueTypeFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
                >
                  <option value="all">All Types</option>
                  <option value="dirty water">💧 Dirty Water</option>
                  <option value="leakage">🚰 Leakage</option>
                  <option value="no supply">⚠️ No Supply</option>
                </select>
              </motion.div>

              {/* View Mode & Refresh */}
              <motion.div
                className="flex gap-2 items-end"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  onClick={() => setViewMode('grid')}
                  className={`flex-1 py-3 rounded-xl font-semibold transition-all text-sm ${
                    viewMode === 'grid'
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg'
                      : 'border border-gray-300 text-gray-700 hover:border-cyan-500 hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  📑 Grid
                </motion.button>
                <motion.button
                  onClick={() => setViewMode('map')}
                  className={`flex-1 py-3 rounded-xl font-semibold transition-all text-sm ${
                    viewMode === 'map'
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg'
                      : 'border border-gray-300 text-gray-700 hover:border-cyan-500 hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🗺️ Map
                </motion.button>
                <motion.button
                  onClick={fetchReports}
                  className="py-3 px-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.05, rotate: 180 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🔄
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        {viewMode === 'grid' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {filteredReports.length > 0 ? (
              <div>
                <motion.h2
                  className="text-2xl font-bold text-gray-900 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  📋 {filteredReports.length} {filteredReports.length === 1 ? 'Report' : 'Reports'} Found
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredReports.map((report, index) => (
                    <motion.div
                      key={report._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <ReportCard report={report} />
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {reports.length === 0 ? (
                  <div className="bg-white rounded-3xl p-12 shadow-lg">
                    <motion.p
                      className="text-7xl mb-6"
                      animate={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      📝
                    </motion.p>
                    <p className="text-3xl font-bold text-gray-900 mb-2">No Reports Yet</p>
                    <p className="text-lg text-gray-600 mb-8">
                      Be the first to report a water issue in your area and make an impact!
                    </p>
                    <Link to="/report-issue">
                      <motion.button
                        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-xl font-bold shadow-lg"
                        whileHover={{ scale: 1.05, y: -4 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        🚀 Create First Report
                      </motion.button>
                    </Link>
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl p-12 shadow-lg">
                    <motion.p
                      className="text-7xl mb-6"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      🔍
                    </motion.p>
                    <p className="text-3xl font-bold text-gray-900 mb-2">No Reports Match Your Filters</p>
                    <p className="text-lg text-gray-600">Try adjusting your search or filters</p>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {filteredReports.length > 0 ? (
              <MapView reports={filteredReports} height="600px" />
            ) : (
              <motion.div
                className="text-center py-20 bg-white rounded-3xl shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.p
                  className="text-7xl mb-6"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🗺️
                </motion.p>
                <p className="text-3xl font-bold text-gray-900 mb-2">No Reports to Show on Map</p>
                <p className="text-lg text-gray-600">Create or filter reports to see them on the map</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { reportAPI } from '../services/api';
import { useAuth } from '../hooks/useAuth';

const ReportIssue = () => {
  const [formData, setFormData] = useState({
    title: '',
    issueType: 'dirty water',
    description: '',
    latitude: '',
    longitude: '',
    address: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }
      setFormData((prev) => ({ ...prev, image: file }));
      toast.success('Image selected');
    }
  };

  const getLocation = () => {
    setLocationLoading(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData((prev) => ({
            ...prev,
            latitude: latitude.toFixed(6),
            longitude: longitude.toFixed(6),
          }));
          toast.success('Location detected');
          setLocationLoading(false);
        },
        (error) => {
          toast.error('Unable to get location. Please enter manually.');
          setLocationLoading(false);
        }
      );
    } else {
      toast.error('Geolocation is not supported by your browser');
      setLocationLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.address) {
      toast.error('Please fill in Title, Description, and Location');
      return;
    }

    // If no coordinates detected, use default coordinates (user's general location)
    const latitude = formData.latitude || '20.5937';
    const longitude = formData.longitude || '78.9629';

    setLoading(true);
    try {
      await reportAPI.createReport({
        ...formData,
        latitude,
        longitude,
      });
      toast.success('Report submitted successfully! 🎉');
      // Navigate after a short delay to ensure form clears
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 px-4 sm:px-6 lg:px-8 pt-24 pb-10">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Report Water Issue
          </h1>
          <p className="text-xl text-gray-600">
            Help us fix water problems in your area. Your report matters!
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Issue Title *
              </label>
              <motion.input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., No water supply in sector 5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-colors"
                whileFocus={{ scale: 1.02 }}
              />
            </motion.div>

            {/* Issue Type */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Issue Type *
              </label>
              <motion.select
                name="issueType"
                value={formData.issueType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-colors"
                whileFocus={{ scale: 1.02 }}
              >
                <option value="dirty water">💧 Dirty Water</option>
                <option value="leakage">🚰 Leakage</option>
                <option value="no supply">⚠️ No Supply</option>
              </motion.select>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Description *
              </label>
              <motion.textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the issue in detail..."
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-colors resize-none"
                whileFocus={{ scale: 1.02 }}
              />
            </motion.div>

            {/* Address - MAIN LOCATION FIELD */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                🏘️ Location / Address *
                <span className="text-gray-500 text-xs font-normal">(City, Area, Street, or Landmark)</span>
              </label>
              <motion.input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="e.g., Sector 5 near Water Tank, Mumbai"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-colors"
                whileFocus={{ scale: 1.02 }}
              />
              <p className="text-xs text-gray-500 mt-1">💡 Tip: Be as specific as possible so others can find this location easily</p>
            </motion.div>

            {/* Auto Detect Location Button */}
            <motion.button
              type="button"
              onClick={getLocation}
              disabled={locationLoading}
              className="w-full py-2 border border-cyan-500 text-cyan-600 rounded-lg font-semibold hover:bg-cyan-50 transition-colors disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
            >
              {locationLoading ? '🔄 Detecting GPS...' : '📍 Detect Precise GPS Location (Optional)'}
            </motion.button>

            {/* Latitude & Longitude - Now Optional with auto-filled values */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.65 }}
            >
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  Latitude (Auto-detected or Default)
                </label>
                <motion.input
                  type="number"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  placeholder="20.5937"
                  step="0.0001"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-colors bg-white"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">
                  Longitude (Auto-detected or Default)
                </label>
                <motion.input
                  type="number"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  placeholder="78.9629"
                  step="0.0001"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-colors bg-white"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
            </motion.div>

            {/* Image Upload */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                📸 Upload Photo (Optional but Recommended)
              </label>
              <div className="flex items-center justify-center w-full">
                <label className={`w-full px-4 py-8 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
                  formData.image 
                    ? 'border-green-400 bg-green-50 hover:border-green-500' 
                    : 'border-cyan-300 bg-cyan-50 hover:border-cyan-500'
                }`}>
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-3xl mb-2">{formData.image ? '✅' : '📷'}</span>
                    <span className="text-gray-600 font-medium text-center">
                      {formData.image 
                        ? `✓ ${formData.image.name}` 
                        : 'Click to upload or drag and drop'
                      }
                    </span>
                    {!formData.image && <span className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</span>}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-lg font-bold text-lg hover:shadow-lg disabled:opacity-70 mt-8"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {loading ? 'Submitting...' : '🚀 Submit Report'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ReportIssue;

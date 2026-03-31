import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { reportAPI } from '../services/api';
import Loader from '../components/Loader';

const ReportDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedReports, setRelatedReports] = useState([]);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState({});

  // UN World Water Issues Data with better image URLs
  const worldWaterIssues = [
    {
      id: 1,
      title: 'Global Water Scarcity Crisis',
      region: 'Sub-Saharan Africa',
      description: 'Over 2 billion people worldwide suffer from high water stress. UN reports indicate that by 2050, 5.7 billion people could face water scarcity.',
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&h=400&fit=crop',
      issueType: 'Scarcity',
      status: 'Critical',
      date: '2024-12-15',
      source: 'UN Water'
    },
    {
      id: 2,
      title: 'Groundwater Depletion in Asia',
      region: 'India & Bangladesh',
      description: 'Aquifers in the Indo-Gangetic Plains are being depleted at alarming rates. Agricultural demands and population growth are worsening the crisis.',
      image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=500&h=400&fit=crop',
      issueType: 'Depletion',
      status: 'Critical',
      date: '2024-11-20',
      source: 'UN Environment Program'
    },
    {
      id: 3,
      title: 'Water Pollution in Major Rivers',
      region: 'Southeast Asia',
      description: 'The Mekong River faces severe contamination from industrial waste and agricultural runoff, affecting 60 million people.',
      image: 'https://images.unsplash.com/photo-1513569018514-591f3dba8d4d?w=500&h=400&fit=crop',
      issueType: 'Pollution',
      status: 'Alarming',
      date: '2024-10-30',
      source: 'UN Water'
    },
    {
      id: 4,
      title: 'Glacial Melt Accelerating',
      region: 'Himalayas & Antarctica',
      description: 'Climate change is accelerating glacial melt in high-altitude regions, threatening water supply for 2 billion people downstream.',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
      issueType: 'Climate Impact',
      status: 'Critical',
      date: '2024-09-12',
      source: 'UN Climate Action'
    },
    {
      id: 5,
      title: 'Sewage Crisis in Urban Areas',
      region: 'Sub-Saharan Africa & South Asia',
      description: 'Inadequate wastewater treatment affects urban water bodies. Only 8% of wastewater in developing countries is treated.',
      image: 'https://images.unsplash.com/photo-1559399810-46d1c3ee4881?w=500&h=400&fit=crop',
      issueType: 'Sanitation',
      status: 'Severe',
      date: '2024-08-22',
      source: 'UN Development Program'
    }
  ];

  const handleImageLoad = (id) => {
    setImageLoading(prev => ({ ...prev, [id]: true }));
  };

  useEffect(() => {
    fetchReport();
  }, [id]);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const response = await reportAPI.getReportById(id);
      setReport(response.data.report);
      
      // Fetch related reports of same type
      const allReports = await reportAPI.getAllReports({ limit: 100 });
      const related = allReports.data.reports?.filter(
        (r) => r.issueType === response.data.report.issueType && r._id !== id
      ) || [];
      setRelatedReports(related.slice(0, 3));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load report');
    } finally {
      setLoading(false);
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'from-yellow-100 to-yellow-50 border-yellow-300';
      case 'In Progress':
        return 'from-blue-100 to-blue-50 border-blue-300';
      case 'Resolved':
        return 'from-green-100 to-green-50 border-green-300';
      default:
        return 'from-gray-100 to-gray-50';
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

  // Educational content for each issue type
  const educationalContent = {
    'dirty water': {
      title: 'Dirty Water Issues',
      icon: '💧',
      causes: [
        'Aging water infrastructure causing rust and contamination',
        'Industrial waste discharge into water sources',
        'Improper sewage treatment and disposal',
        'Climate change affecting water quality',
        'Microbial contamination from broken pipes',
      ],
      effects: [
        'Health risks: Diarrhea, cholera, typhoid fever',
        'Skin infections and gastrointestinal diseases',
        'Long-term: Kidney damage and cancer risks',
        'Impact on children\'s development and immunity',
        'Economic loss: Medical treatment and lost productivity',
      ],
      solutions: [
        'Regular water testing and monitoring',
        'Infrastructure upgrades and pipe replacement',
        'Advanced water treatment facilities',
        'Community awareness programs',
        'Government intervention and regulation',
      ],
      resources: [
        { title: 'Water Quality Standards', url: 'https://youtu.be/dQw4w9WgXcQ', type: 'video' },
        { title: 'Health Impacts of Contaminated Water', url: 'https://youtu.be/dQw4w9WgXcQ', type: 'video' },
        { title: 'Water Testing Guide', url: 'https://youtu.be/dQw4w9WgXcQ', type: 'video' },
      ],
    },
    'leakage': {
      title: 'Water Leakage Issues',
      icon: '🚰',
      causes: [
        'Corroded or damaged water pipes',
        'High water pressure damaging pipe joints',
        'Natural ground movement and earthquakes',
        'Tree roots breaking underground pipes',
        'Poor pipe installation and maintenance',
      ],
      effects: [
        'Water wastage: 50+ liters per day from single leak',
        'Increased water bills and resource loss',
        'Soil erosion and property damage',
        'Spread of pollutants through cracks',
        'Disruption of water supply to other areas',
      ],
      solutions: [
        'Early leak detection using smart meters',
        'Regular pipe inspection and maintenance',
        'Pipe replacement with modern materials',
        'Pressure regulation systems',
        'Regular community inspections',
      ],
      resources: [
        { title: 'Detecting Leaks Early', url: 'https://youtu.be/dQw4w9WgXcQ', type: 'video' },
        { title: 'Pipe Maintenance Guide', url: 'https://youtu.be/dQw4w9WgXcQ', type: 'video' },
        { title: 'Water Loss Prevention', url: 'https://youtu.be/dQw4w9WgXcQ', type: 'video' },
      ],
    },
    'no supply': {
      title: 'No Water Supply Issues',
      icon: '⚠️',
      causes: [
        'Pump failure or power outages',
        'Main pipeline breakage',
        'Insufficient water at source',
        'Maintenance work on main lines',
        'Distribution system failure',
      ],
      effects: [
        'Severe dehydration and health risks',
        'Hygiene and sanitation crisis',
        'Economic disruption: Industries shut down',
        'Increased disease transmission',
        'Social unrest and community distress',
      ],
      solutions: [
        'Backup water supply systems',
        'Regular maintenance and inspection schedules',
        'Quick repair response teams',
        'Alternative water source development',
        'Emergency water distribution centers',
      ],
      resources: [
        { title: 'Emergency Water Management', url: 'https://youtu.be/dQw4w9WgXcQ', type: 'video' },
        { title: 'Water Supply Systems', url: 'https://youtu.be/dQw4w9WgXcQ', type: 'video' },
        { title: 'Crisis Response Guide', url: 'https://youtu.be/dQw4w9WgXcQ', type: 'video' },
      ],
    },
  };

  if (loading) {
    return <Loader />;
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 px-4 sm:px-6 lg:px-8 pt-24 pb-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p className="text-6xl mb-4">😕</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Report Not Found</h2>
            <p className="text-gray-600 mb-6">The report you're looking for doesn't exist or has been removed.</p>
            <motion.button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-lg font-semibold hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ← Back to Dashboard
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  const content = educationalContent[report.issueType] || educationalContent['dirty water'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 px-4 sm:px-6 lg:px-8 pt-24 pb-10">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate('/dashboard')}
          className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold"
          whileHover={{ x: -4 }}
        >
          ← Back to Dashboard
        </motion.button>

        {/* Main Report Card */}
        <motion.div
          className={`bg-gradient-to-br ${getStatusColor(report.status)} rounded-2xl shadow-xl overflow-hidden border-2 mb-10`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-8">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-5xl">{getIssueTypeIcon(report.issueType)}</span>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">{report.title}</h1>
                    <p className="text-blue-100">
                      📍 {report.location?.address || 'Unknown Location'}
                    </p>
                  </div>
                </div>
              </div>
              <motion.div
                className="bg-white/20 backdrop-blur-md px-4 py-3 rounded-xl"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-center">
                  <p className="text-blue-100 text-sm">Status</p>
                  <div className="flex items-center gap-2 text-xl font-bold mt-1">
                    <span>{getStatusIcon(report.status)}</span>
                    <span>{report.status}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 space-y-8">
            {/* Main Image */}
            {report.image && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">📸 Evidence Photo</h3>
                <img
                  src={report.image}
                  alt={report.title}
                  className="w-full h-96 object-cover rounded-xl shadow-lg"
                />
              </motion.div>
            )}

            {/* Report Details Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
                <p className="text-gray-600 text-sm">Issue Type</p>
                <p className="font-bold text-gray-900 text-lg mt-1">{report.issueType}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500">
                <p className="text-gray-600 text-sm">Reported By</p>
                <p className="font-bold text-gray-900 text-lg mt-1">{report.createdBy?.name || 'Anonymous'}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
                <p className="text-gray-600 text-sm">Reported On</p>
                <p className="font-bold text-gray-900 text-lg mt-1">
                  {new Date(report.createdAt).toLocaleDateString()}
                </p>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3">📝 Full Description</h3>
              <p className="text-gray-700 leading-relaxed bg-white p-6 rounded-lg shadow-md">
                {report.description}
              </p>
            </motion.div>

            {/* GPS Coordinates */}
            {report.location?.latitude && report.location?.longitude && (
              <motion.div
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">🗺️ Location Coordinates</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-gray-600 text-sm">Latitude</p>
                    <p className="font-mono font-bold text-gray-900">{report.location.latitude}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-gray-600 text-sm">Longitude</p>
                    <p className="font-mono font-bold text-gray-900">{report.location.longitude}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Educational Content Section */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl overflow-hidden p-8 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">{content.icon}</span>
            <h2 className="text-3xl font-bold text-gray-900">{content.title}</h2>
          </div>

          {/* Three Column Layout: Causes, Effects, Solutions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Causes */}
            <motion.div
              className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border-2 border-red-200"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
                🔴 What Causes This?
              </h3>
              <ul className="space-y-2">
                {content.causes.map((cause, idx) => (
                  <motion.li
                    key={idx}
                    className="text-gray-700 flex gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + idx * 0.05 }}
                  >
                    <span className="text-red-500 font-bold min-w-fit">•</span>
                    <span>{cause}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Effects */}
            <motion.div
              className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border-2 border-yellow-200"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl font-bold text-yellow-600 mb-4 flex items-center gap-2">
                ⚠️ Effects on People
              </h3>
              <ul className="space-y-2">
                {content.effects.map((effect, idx) => (
                  <motion.li
                    key={idx}
                    className="text-gray-700 flex gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + idx * 0.05 }}
                  >
                    <span className="text-yellow-500 font-bold min-w-fit">•</span>
                    <span>{effect}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Solutions */}
            <motion.div
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl font-bold text-green-600 mb-4 flex items-center gap-2">
                ✅ How to Solve It
              </h3>
              <ul className="space-y-2">
                {content.solutions.map((solution, idx) => (
                  <motion.li
                    key={idx}
                    className="text-gray-700 flex gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + idx * 0.05 }}
                  >
                    <span className="text-green-500 font-bold min-w-fit">•</span>
                    <span>{solution}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* News Carousel - UN World Water Issues */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              🌍 Global Water Issues - UN Reports
            </h3>
            {worldWaterIssues.length > 0 ? (
              <div className="relative">
                {/* Carousel Container */}
                <div className="relative overflow-hidden rounded-xl bg-gray-100">
                  <motion.div
                    className="flex"
                    animate={{ x: `-${carouselIndex * 100}%` }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    {worldWaterIssues.map((issue, idx) => (
                      <div
                        key={issue.id}
                        className="w-full flex-shrink-0 px-2"
                      >
                        <motion.div
                          className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all cursor-pointer border-2 border-teal-300"
                          whileHover={{ scale: 1.02, y: -4 }}
                        >
                          {/* Image Section */}
                          {issue.image && (
                            <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
                              {!imageLoading[issue.id] && (
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 animate-pulse" />
                              )}
                              <motion.img
                                src={issue.image}
                                alt={issue.title}
                                onLoad={() => handleImageLoad(issue.id)}
                                className={`w-full h-full object-cover hover:scale-110 transition-transform duration-300 ${
                                  imageLoading[issue.id] ? 'opacity-100' : 'opacity-0'
                                }`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: imageLoading[issue.id] ? 1 : 0 }}
                                transition={{ duration: 0.3 }}
                              />
                              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full">
                                <span className="text-xs font-bold text-teal-600">
                                  {issue.issueType.toUpperCase()}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Content Section */}
                          <div className="p-6 space-y-3">
                            {/* Title */}
                            <h4 className="text-xl font-bold text-gray-900 line-clamp-2 hover:text-teal-600 transition-colors">
                              {issue.title}
                            </h4>

                            {/* Region */}
                            <div className="flex items-center gap-2 text-gray-700">
                              <span className="text-lg">🌐</span>
                              <p className="text-sm font-semibold line-clamp-1">
                                {issue.region}
                              </p>
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 text-sm line-clamp-3">
                              {issue.description}
                            </p>

                            {/* Status, Source and Date */}
                            <div className="flex items-center justify-between pt-3 border-t border-teal-100 flex-wrap gap-2">
                              <div className="flex items-center gap-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                  issue.status === 'Critical'
                                    ? 'bg-red-100 text-red-800'
                                    : issue.status === 'Alarming'
                                    ? 'bg-orange-100 text-orange-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {issue.status}
                                </span>
                              </div>
                              <div className="flex flex-col items-end">
                                <span className="text-xs text-gray-500 font-medium">
                                  {new Date(issue.date).toLocaleDateString()}
                                </span>
                                <span className="text-xs text-teal-600 font-semibold">
                                  {issue.source}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* Navigation Buttons */}
                {worldWaterIssues.length > 1 && (
                  <>
                    {/* Previous Button */}
                    <motion.button
                      onClick={() =>
                        setCarouselIndex((prev) =>
                          prev === 0 ? worldWaterIssues.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 bg-white hover:bg-teal-500 hover:text-white text-gray-800 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-10"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      ←
                    </motion.button>

                    {/* Next Button */}
                    <motion.button
                      onClick={() =>
                        setCarouselIndex((prev) =>
                          prev === worldWaterIssues.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 bg-white hover:bg-teal-500 hover:text-white text-gray-800 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:shadow-xl transition-all z-10"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      →
                    </motion.button>

                    {/* Carousel Indicators */}
                    <div className="flex justify-center gap-2 mt-6">
                      {worldWaterIssues.map((_, idx) => (
                        <motion.button
                          key={idx}
                          onClick={() => setCarouselIndex(idx)}
                          className={`h-3 rounded-full transition-all ${
                            carouselIndex === idx
                              ? 'bg-teal-600 w-8'
                              : 'bg-gray-300 w-3 hover:bg-gray-400'
                          }`}
                          whileHover={{ scale: 1.2 }}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : null}
          </motion.div>
        </motion.div>

        {/* Related Incidents Section */}
        {relatedReports.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              🔗 Related {content.title} Reports
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedReports.map((relatedReport, idx) => (
                <motion.div
                  key={relatedReport._id}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer border-l-4 border-blue-500"
                  whileHover={{ y: -4 }}
                  onClick={() => {
                    navigate(`/report/${relatedReport._id}`);
                    window.scrollTo(0, 0);
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + idx * 0.1 }}
                >
                  {relatedReport.image && (
                    <img
                      src={relatedReport.image}
                      alt={relatedReport.title}
                      className="w-full h-40 object-cover rounded-lg mb-3"
                    />
                  )}
                  <h4 className="font-bold text-gray-900 mb-2 line-clamp-2">{relatedReport.title}</h4>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">{relatedReport.description}</p>
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-800`}>
                      {relatedReport.status}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(relatedReport.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ReportDetail;

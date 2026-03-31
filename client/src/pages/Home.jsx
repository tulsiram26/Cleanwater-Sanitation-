import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [hoveredGoal, setHoveredGoal] = useState(null);

  const features = [
    {
      id: 1,
      icon: "📱",
      title: "Easy Reporting",
      description:
        "Report water issues with just a few clicks and attach photos",
      briefInfo:
        "Instantly report water problems with location, photos & description",
      detailedInfo:
        "Simple 3-step process to report any water issue with photos and GPS location",
      route: "/report-issue",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 2,
      icon: "🗺️",
      title: "Location Tracking",
      description:
        "GPS-based issue tracking to pinpoint exact problem locations",
      briefInfo: "Real-time GPS mapping of all water issues in your area",
      detailedInfo:
        "View all reported issues on an interactive map with live updates",
      route: "/dashboard",
      color: "from-green-500 to-green-600",
    },
    {
      id: 3,
      icon: "📊",
      title: "Dashboard Analytics",
      description: "Real-time tracking of issue status and resolution progress",
      briefInfo: "Monitor issues, status updates, and resolution timeline",
      detailedInfo:
        "Comprehensive dashboard with statistics and detailed analytics",
      route: "/dashboard",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: 4,
      icon: "👨‍💻",
      title: "Admin Management",
      description: "Administrators can manage and resolve issues efficiently",
      briefInfo: "Complete admin panel for issue management and resolution",
      detailedInfo:
        "Manage, assign, update status, and resolve issues from admin panel",
      route: "/dashboard",
      color: "from-orange-500 to-orange-600",
    },
  ];

  // All 17 SDG Goals
  const sdgGoals = [
    {
      id: 1,
      emoji: "🚫",
      title: "No Poverty",
      color: "from-red-500 to-red-600",
      description: "Eradicate extreme poverty and hunger in all its forms"
    },
    {
      id: 2,
      emoji: "🍽️",
      title: "Zero Hunger",
      color: "from-yellow-500 to-yellow-600",
      description: "End hunger, achieve food security and better nutrition"
    },
    {
      id: 3,
      emoji: "⚕️",
      title: "Good Health",
      color: "from-green-500 to-green-600",
      description: "Ensure healthy lives and promote well-being for all ages"
    },
    {
      id: 4,
      emoji: "📚",
      title: "Quality Education",
      color: "from-red-400 to-red-500",
      description: "Ensure inclusive and equitable quality education for all"
    },
    {
      id: 5,
      emoji: "👩‍🦰",
      title: "Gender Equality",
      color: "from-red-300 to-red-400",
      description: "Achieve gender equality and empower women & girls"
    },
    {
      id: 6,
      emoji: "💧",
      title: "Clean Water",
      color: "from-blue-500 to-blue-600",
      description: "Ensure safe water, sanitation & hygiene for all"
    },
    {
      id: 7,
      emoji: "⚡",
      title: "Renewable Energy",
      color: "from-yellow-400 to-yellow-500",
      description: "Ensure access to affordable, reliable clean energy"
    },
    {
      id: 8,
      emoji: "💼",
      title: "Decent Work",
      color: "from-red-600 to-red-700",
      description: "Promote sustained economic growth & decent work"
    },
    {
      id: 9,
      emoji: "🏭",
      title: "Innovation",
      color: "from-orange-500 to-orange-600",
      description: "Build resilient infrastructure & foster innovation"
    },
    {
      id: 10,
      emoji: "⚖️",
      title: "Reduced Inequality",
      color: "from-red-500 to-pink-600",
      description: "Reduce inequality within and among countries"
    },
    {
      id: 11,
      emoji: "🏙️",
      title: "Sustainable Cities",
      color: "from-orange-400 to-orange-500",
      description: "Make cities inclusive, safe & sustainable"
    },
    {
      id: 12,
      emoji: "♻️",
      title: "Responsible Consumption",
      color: "from-orange-600 to-orange-700",
      description: "Ensure sustainable consumption patterns"
    },
    {
      id: 13,
      emoji: "🌍",
      title: "Climate Action",
      color: "from-green-600 to-green-700",
      description: "Take urgent action to combat climate change"
    },
    {
      id: 14,
      emoji: "🐠",
      title: "Life Below Water",
      color: "from-blue-600 to-blue-700",
      description: "Conserve and sustainably use oceans & marine life"
    },
    {
      id: 15,
      emoji: "🌳",
      title: "Life on Land",
      color: "from-green-700 to-green-800",
      description: "Protect and restore terrestrial ecosystems"
    },
    {
      id: 16,
      emoji: "⚔️",
      title: "Peace & Justice",
      color: "from-blue-700 to-blue-800",
      description: "Promote peaceful & inclusive societies"
    },
    {
      id: 17,
      emoji: "🤝",
      title: "Partnerships",
      color: "from-purple-600 to-purple-700",
      description: "Strengthen global partnership for sustainable goals"
    },
  ];

  // UN Discussion Points
  const unDiscussions = [
    {
      title: "2023 UN Water Conference",
      points: [
        "Water scarcity affects 2.3 billion people globally",
        "By 2050, 5.7 billion may face water scarcity",
        "Only 26% of water withdrawals are sustainable",
        "Water-related disasters account for 90% of natural disasters",
      ],
    },
    {
      title: "SDG 6 Goals by 2030",
      points: [
        "Provide safe and affordable drinking water for all",
        "Improve water quality and reduce pollution",
        "Protect and restore water-related ecosystems",
        "Increase water use efficiency across all sectors",
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // Animated Background Circles
  const AnimatedBackground = () => (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          x: [0, 50, -50, 0],
          y: [0, 50, 0, -50],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-40 right-0 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          x: [0, -50, 50, 0],
          y: [0, -50, 0, 50],
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 left-1/2 w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{
          x: [0, 30, -30, 0],
          y: [0, 30, -30, 0],
        }}
        transition={{ duration: 14, repeat: Infinity }}
      />
    </div>
  );

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 px-4 sm:px-6 lg:px-8 pt-20 relative overflow-hidden">
        <AnimatedBackground />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-block mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-600 rounded-full text-sm font-semibold shadow-lg">
                ✨ SDG 6: Clean Water & Sanitation - Sustainable Development
                Goal
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
               JalRakshak
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-700 mb-4 max-w-3xl mx-auto font-semibold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Your Voice for Clean Water | Empowering Communities | Sustainable
              Change
            </motion.p>

            <motion.p
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Empower citizens to report water issues and help authorities
              resolve them faster. Together, we ensure clean water for everyone
              and contribute to the United Nations Sustainable Development
              Goals.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <motion.button
                onClick={() =>
                  navigate(isAuthenticated ? "/report-issue" : "/register")
                }
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                {isAuthenticated ? "🚀 Report Issue" : "🚀 Get Started"}
              </motion.button>

              <motion.button
                onClick={() => navigate("/dashboard")}
                className="px-8 py-4 border-2 border-cyan-400 text-cyan-600 rounded-xl font-bold text-lg hover:bg-cyan-50 transition-all bg-white/50 backdrop-blur"
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                📊 View Dashboard
              </motion.button>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              className="mt-12"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <p className="text-gray-600">↓ Scroll to learn more ↓</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* UN Impact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-900 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="text-9xl"
          >
            💧
          </motion.div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              🌍 UN Water Crisis Discussion
            </h2>
            <p className="text-xl opacity-90">
              Critical facts from UN Water 2023 Conference
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {unDiscussions.map((discussion, discIdx) => (
              <motion.div
                key={discIdx}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -8 }}
              >
                <h3 className="text-2xl font-bold mb-6 text-cyan-300">
                  {discussion.title}
                </h3>
                <ul className="space-y-4">
                  {discussion.points.map((point, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-xl min-w-fit">✓</span>
                      <span className="text-lg">{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-12 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-2xl p-8 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-xl font-bold text-blue-900">
              💡 Without intervention, water scarcity will affect more people
              than the world population today
            </p>
          </motion.div>
        </div>
      </section>

      {/* Importance Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-cyan-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              🌎 Why Clean Water Matters for Life
            </h2>
            <p className="text-xl text-gray-600">
              Understanding the universal importance of water
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: "👥",
                title: "Human Health",
                desc: "Clean water prevents waterborne diseases. 1 in 4 deaths in developing countries is caused by water-related diseases.",
              },
              {
                icon: "🌱",
                title: "Ecosystem Health",
                desc: "Aquatic ecosystems that depend on clean water support biodiversity and food security for billions.",
              },
              {
                icon: "🏭",
                title: "Economic Growth",
                desc: "Water scarcity costs economies trillions annually in lost productivity and healthcare expenses.",
              },
              {
                icon: "🧒",
                title: "Child Development",
                desc: "Contaminated water affects cognitive development. Every child deserves safe water to learn and grow.",
              },
              {
                icon: "🌾",
                title: "Food Security",
                desc: "70% of freshwater is used for agriculture. Water security ensures global food stability.",
              },
              {
                icon: "🔮",
                title: "Future Generations",
                desc: "Water is a finite resource. We must protect it today to ensure survival for future generations.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-cyan-500"
                variants={itemVariants}
                whileHover={{ y: -8, shadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-lg">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 17 SDG Goals Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-slate-900 text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="text-9xl absolute top-10 right-20"
          >
            🎯
          </motion.div>
        </div>

        <motion.div
          className="absolute top-1/3 left-0 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />

        <motion.div
          className="absolute bottom-1/4 right-0 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-12 sm:mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-cyan-500/50"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <span className="text-sm font-semibold text-cyan-400">
                🌍 Global Goals
              </span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              🎯 United Nations <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Sustainable Development Goals</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              JalRakshak contributes to SDG 6 while supporting all 17 goals for a sustainable future
              <br className="hidden sm:block" />
              <motion.span 
                className="text-cyan-400 font-semibold inline-block"
                animate={{ opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Hover over each goal to learn more
              </motion.span>
            </p>
          </motion.div>

          {/* SDG Goals Grid - Enhanced with Hover */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 mb-12 sm:mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          >
            {sdgGoals.map((goal, idx) => (
              <motion.div
                key={goal.id}
                className="relative group"
                variants={itemVariants}
              >
                {/* Main Goal Card */}
                <motion.div
                  className={`bg-gradient-to-br ${goal.color} rounded-2xl p-4 sm:p-6 text-center cursor-pointer border-2 border-white/20`}
                  whileHover={{ scale: 1.05, y: -3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {/* Emoji Icon */}
                  <motion.div
                    className="text-4xl sm:text-5xl mb-2 inline-block"
                  >
                    {goal.emoji}
                  </motion.div>

                  {/* Goal Title */}
                  <motion.p
                    className="font-bold text-xs sm:text-sm line-clamp-2 mb-1"
                  >
                    {goal.title}
                  </motion.p>

                  {/* Goal Number */}
                  <motion.p
                    className="text-xs opacity-70 font-semibold"
                  >
                    Goal {goal.id}
                  </motion.p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* SDG 6 Focus Box */}
          <motion.div
            className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-cyan-500/50 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Highlight accent */}
            <motion.div
              className="absolute top-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-400"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
            />

            <div className="relative z-10">
              <motion.div
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl sm:text-6xl">💧</div>
                <div className="flex-1">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                    🌟 SDG 6: Clean Water & Sanitation
                  </h3>
                  <p className="text-base sm:text-lg text-gray-300 mb-4">
                    JalRakshak directly supports SDG 6 by empowering communities to identify and resolve water issues, ensuring universal access to safe and affordable drinking water and sanitation for all.
                  </p>

                  {/* Impact Grid */}
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="bg-white/5 rounded-lg p-3 sm:p-4 border border-cyan-500/20 hover:border-cyan-500/50 transition-all">
                      <p className="font-bold text-cyan-400 mb-2 text-sm sm:text-base">Direct Impact:</p>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-gray-300">
                        <li className="flex items-center gap-2">
                          <span className="text-cyan-400">✓</span>
                          <span>Improve water quality monitoring</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-cyan-400">✓</span>
                          <span>Reduce response time to issues</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-cyan-400">✓</span>
                          <span>Increase water access awareness</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 sm:p-4 border border-blue-500/20 hover:border-blue-500/50 transition-all">
                      <p className="font-bold text-blue-400 mb-2 text-sm sm:text-base">Broader Impact:</p>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-gray-300">
                        <li className="flex items-center gap-2">
                          <span className="text-blue-400">✓</span>
                          <span>Support Goals 1-5 (Health, Education, Equality)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-blue-400">✓</span>
                          <span>Enable Goal 13 (Climate Action)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-blue-400">✓</span>
                          <span>Strengthen Goal 17 (Global Partnerships)</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 relative overflow-hidden">
        {/* Decorative floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-10 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
            animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
            transition={{ duration: 12, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 left-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10"
            animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
            transition={{ duration: 14, repeat: Infinity }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-12 sm:mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                ✨ Core Features
              </span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                JalRakshak
              </span>
              ?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              A comprehensive platform for water issue management
              <br className="hidden sm:block" />
              <motion.span
                className="text-blue-600 font-semibold"
                animate={{ opacity: [1, 0.6, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Hover & Click to Explore
              </motion.span>
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                className="relative group h-full"
                variants={itemVariants}
                onMouseEnter={() => setHoveredFeature(feature.id)}
                onMouseLeave={() => setHoveredFeature(null)}
                role="button"
                tabIndex={0}
                aria-label={`${feature.title}: ${feature.briefInfo}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    if (isAuthenticated || feature.route === "/dashboard") {
                      navigate(feature.route);
                    } else {
                      navigate("/register");
                    }
                  }
                }}
              >
                {/* Card Background Gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl opacity-0 group-hover:opacity-25 transition-opacity duration-300`}
                  initial={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                />

                {/* Main Card - Enhanced */}
                <motion.div
                  onClick={() => {
                    if (isAuthenticated || feature.route === "/dashboard") {
                      navigate(feature.route);
                    } else {
                      navigate("/register");
                    }
                  }}
                  className="relative z-10 flex flex-col h-full p-6 sm:p-8 rounded-2xl bg-white border-2 border-gray-100 cursor-pointer transition-all duration-300 group-hover:border-cyan-300 group-hover:shadow-2xl"
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  animate={{
                    boxShadow:
                      hoveredFeature === feature.id
                        ? "0 20px 60px rgba(0, 150, 200, 0.25)"
                        : "0 4px 20px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  {/* Top Accent Bar */}
                  <motion.div
                    className={`absolute top-0 left-0 h-1 rounded-t-2xl bg-gradient-to-r ${feature.color}`}
                    initial={{ width: 0 }}
                    animate={{
                      width: hoveredFeature === feature.id ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Icon with Enhanced Animation */}
                  <motion.div
                    className="text-5xl sm:text-6xl mb-4 inline-block"
                    animate={{
                      scale: hoveredFeature === feature.id ? 1.4 : 1,
                      rotate: hoveredFeature === feature.id ? 12 : 0,
                      y: hoveredFeature === feature.id ? -8 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 250, damping: 20 }}
                  >
                    {feature.icon}
                  </motion.div>

                  {/* Feature Index Badge */}
                  <motion.div
                    className="absolute top-6 right-6 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center text-sm font-bold text-blue-600"
                    initial={{ scale: 0 }}
                    animate={{
                      scale: 1,
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {index + 1}
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>

                  {/* Divider */}
                  <motion.div
                    className="h-1 w-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-4"
                    initial={{ width: 0 }}
                    whileInView={{ width: 48 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    viewport={{ once: true }}
                  />

                  {/* Main Description */}
                  <motion.p
                    className="text-gray-600 text-sm sm:text-base mb-4 flex-grow"
                    animate={{
                      opacity: hoveredFeature === feature.id ? 0 : 1,
                      height: hoveredFeature === feature.id ? 0 : "auto",
                      marginBottom: hoveredFeature === feature.id ? 0 : 16,
                    }}
                    transition={{ duration: 0.25 }}
                  >
                    {feature.description}
                  </motion.p>

                  {/* Hover Info - Enhanced */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: hoveredFeature === feature.id ? 1 : 0,
                      height: hoveredFeature === feature.id ? "auto" : 0,
                    }}
                    transition={{ duration: 0.35 }}
                    className="overflow-hidden space-y-3 flex-grow"
                  >
                    <motion.div
                      className={`bg-gradient-to-br ${feature.color} bg-opacity-10 border border-current border-opacity-20 rounded-xl p-4`}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <p className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                        💡 Quick Overview
                      </p>
                      <p className="text-xs sm:text-sm text-gray-700 mt-2 font-medium">
                        {feature.briefInfo}
                      </p>
                    </motion.div>

                    <motion.p
                      className="text-xs sm:text-sm text-gray-600 leading-relaxed"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.15 }}
                    >
                      {feature.detailedInfo}
                    </motion.p>
                  </motion.div>

                  {/* Explore Button - Enhanced */}
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: hoveredFeature === feature.id ? 1 : 0,
                      y: hoveredFeature === feature.id ? 0 : 10,
                    }}
                    transition={{
                      delay: hoveredFeature === feature.id ? 0.15 : 0,
                    }}
                    className="w-full mt-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    🚀 Explore {feature.title}
                  </motion.button>

                  {/* Side Accent Indicator */}
                  <motion.div
                    className={`absolute top-0 right-0 w-1.5 h-full bg-gradient-to-b ${feature.color} rounded-r-2xl`}
                    initial={{ height: 0 }}
                    animate={{
                      height: hoveredFeature === feature.id ? "100%" : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                {/* Enhanced Glow Effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl filter blur-2xl opacity-0 -z-10 transition-opacity duration-300`}
                  animate={{
                    opacity: hoveredFeature === feature.id ? 0.2 : 0,
                  }}
                />

                {/* Focus Ring for Accessibility */}
                <motion.div className="absolute inset-0 rounded-2xl border-2 border-transparent focus-within:border-blue-500" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 relative overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          <div className="text-9xl text-center text-white/50">🌊</div>
        </motion.div>

        <motion.div
          className="absolute top-1/4 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />

        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-300/10 rounded-full blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4 leading-tight">
              📊 Real-Time Community Impact
            </h2>
            <p className="text-lg sm:text-xl text-white/90 opacity-90">
              Making a difference together in water sanitation
            </p>
          </motion.div>

          {/* Stats Grid - Enhanced */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          >
            {[
              {
                label: "Water Issues Reported",
                value: "1000",
                suffix: "+",
                emoji: "🚨",
                color: "from-red-400 to-orange-400",
                description: "Community members raising awareness",
              },
              {
                label: "Successfully Resolved",
                value: "850",
                suffix: "+",
                emoji: "✅",
                color: "from-green-400 to-emerald-400",
                description: "Issues fixed and verified",
              },
              {
                label: "Active Participants",
                value: "5000",
                suffix: "+",
                emoji: "👥",
                color: "from-purple-400 to-pink-400",
                description: "Citizens contributing to SDG 6",
              },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
              >
                {/* Card Background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-300`}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                {/* Main Stat Card */}
                <motion.div
                  className="relative z-10 p-6 sm:p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-center cursor-pointer transition-all hover:bg-white/20 hover:border-white/40"
                  whileHover={{ y: -8, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {/* Top Emoji Badge */}
                  <motion.div
                    className="text-5xl sm:text-6xl mb-4"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: idx * 0.3,
                    }}
                  >
                    {stat.emoji}
                  </motion.div>

                  {/* Stats Data */}
                  <motion.div
                    className="mb-4"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: idx * 0.15 + 0.2,
                      duration: 0.6,
                      type: "spring",
                    }}
                    viewport={{ once: true }}
                  >
                    <div className="text-5xl sm:text-6xl lg:text-7xl font-black mb-2">
                      <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: idx * 0.15 + 0.3,
                          duration: 0.8,
                          type: "spring",
                        }}
                        viewport={{ once: true }}
                      >
                        {stat.value}
                      </motion.span>
                      <motion.span
                        className="text-3xl sm:text-4xl ml-1"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{
                          delay: idx * 0.15 + 0.5,
                          duration: 0.6,
                        }}
                        viewport={{ once: true }}
                      >
                        {stat.suffix}
                      </motion.span>
                    </div>
                  </motion.div>

                  {/* Label */}
                  <p className="text-lg sm:text-xl font-bold mb-2 opacity-90">
                    {stat.label}
                  </p>

                  {/* Divider */}
                  <motion.div
                    className={`h-1 w-16 bg-gradient-to-r ${stat.color} rounded-full mx-auto mb-3`}
                    initial={{ width: 0 }}
                    whileInView={{ width: 64 }}
                    transition={{ delay: idx * 0.15 + 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                  />

                  {/* Description */}
                  <motion.p
                    className="text-sm sm:text-base opacity-85 leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: idx * 0.15 + 0.35, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    {stat.description}
                  </motion.p>

                  {/* Progress Ring Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-transparent"
                    animate={{
                      borderColor: [
                        "rgba(255,255,255,0)",
                        "rgba(255,255,255,0.3)",
                        "rgba(255,255,255,0)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Impact Message */}
          <motion.div
            className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.p
              className="text-lg sm:text-xl font-semibold"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🌍 Together, we're making clean water accessible to everyone and
              supporting SDG 6!
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white relative overflow-hidden">
        <AnimatedBackground />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              🌍 Be Part of the Global Change
            </h2>
            <p className="text-xl text-gray-300 mb-4">
              Join thousands of citizens making a difference in water sanitation
            </p>
            <p className="text-lg opacity-75 mb-8">
              Contribute to SDG 6 and help build a sustainable future for all
            </p>
            <motion.button
              onClick={() =>
                navigate(isAuthenticated ? "/report-issue" : "/register")
              }
              className="px-10 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
              whileHover={{ scale: 1.1, y: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              {isAuthenticated
                ? "✨ Report Your First Issue"
                : "✨ Create Account Now"}
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer Info */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 text-gray-400 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-cyan-400 font-semibold">JalRakshak</span> -
          Building a sustainable water future 💧
          <br />
          Supporting UN Sustainable Development Goal 6 | Contributing to 2030
          Agenda
        </motion.p>
      </section>
    </div>
  );
};

export default Home;

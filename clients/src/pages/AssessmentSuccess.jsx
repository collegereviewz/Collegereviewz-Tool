import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const arrowAnim = {
  animate: {
    x: [0, 80, 0],
  },
  transition: {
    duration: 1.8,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const fadeIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
};

const AssessmentSuccess = () => {
  const navigate = useNavigate();

  const handleRestart = () => {
    navigate("/assessment"); // adjust route if needed
  };

  const handleDownload = () => {
    // your existing PDF download logic
    alert("PDF Download Triggered");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-sky-100 to-purple-100 dark:from-slate-900 dark:to-black">
      <motion.div
        {...fadeIn}
        transition={{ duration: 0.6 }}
        className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl
        rounded-3xl shadow-2xl p-10 max-w-lg w-full text-center border-4 border-indigo-400"
      >
        {/* ✅ Processing Arrow */}
        <div className="flex justify-center mb-6 relative h-10">
          <motion.div
            className="absolute text-green-500 text-3xl font-bold"
            {...arrowAnim}
          >
            ➜
          </motion.div>
        </div>

        {/* ✅ Title */}
        <h1 className="text-3xl font-extrabold mb-4 text-indigo-600">
          Assessment Completed 🎉
        </h1>

        {/* ✅ Subtitle */}
        <p className="text-gray-700 dark:text-gray-300 mb-10">
          Your Career report has been generated successfully.
        </p>

        {/* ✅ Buttons */}
        <div className="flex flex-col gap-5">
          {/* Download Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            className="w-full py-4 rounded-xl bg-indigo-500 text-white
            font-bold text-lg shadow-lg"
          >
            📄 Download Career Report (PDF)
          </motion.button>

          {/* Restart Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRestart}
            className="w-full py-4 rounded-xl bg-green-500 text-white
            font-bold text-lg shadow-lg"
          >
            🔁 Take Assessment Again
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default AssessmentSuccess;

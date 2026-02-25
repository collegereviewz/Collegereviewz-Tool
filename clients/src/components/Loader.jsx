import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Analyzing your responses...");

  const statusMessages = [
    "Analyzing your signal responses...",
    "Computing career compatibility...",
    "Analyzing cognitive and interest patterns...",
    "Cross-referencing global career database...",
    "Generating personalized career handbook...",
    "Finalizing your assessment report...",
  ];

  useEffect(() => {
    // Progress bar simulation
    // Moves to 90% over ~15 seconds, then hangs until done
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(timer);
          return 90;
        }
        // Random increment for realistic feel
        const diff = Math.random() * 5;
        return Math.min(prev + diff, 90);
      });
    }, 800);

    // Status message rotation
    const messageTimer = setInterval(() => {
      setStatus((prev) => {
        const currentIndex = statusMessages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % statusMessages.length;
        return statusMessages[nextIndex];
      });
    }, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(messageTimer);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0B1120]/90 backdrop-blur-sm p-6"
    >
      <div className="w-full max-w-md">
        {/* Main Icon Animation */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: 360,
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
              className="w-20 h-20 rounded-full border-b-2 border-l-2 border-indigo-500"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: -360,
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 w-20 h-20 rounded-full border-t-2 border-r-2 border-sky-400 opacity-60"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-sky-400"
              />
            </div>
          </div>
        </div>

        {/* Text Area */}
        <div className="text-center space-y-4">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-2xl font-bold text-white tracking-tight"
          >
            Processing Assessment
          </motion.h2>

          <div className="h-6">
            <AnimatePresence mode="wait">
              <motion.p
                key={status}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-slate-400 text-sm font-medium"
              >
                {status}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="mt-10">
          <div className="flex justify-between items-end mb-2">
            <span className="text-[10px] uppercase tracking-widest text-indigo-400 font-bold">
              Analysis Progress
            </span>
            <span className="text-xs font-mono text-slate-300">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-white/5 shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-indigo-600 via-sky-400 to-indigo-500 relative"
            >
              <motion.div
                animate={{ x: ["0%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            </motion.div>
          </div>
        </div>

        {/* Floating Background Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 bg-indigo-500/10 blur-[120px] w-[300px] h-[300px] rounded-full" />
      </div>
    </motion.div>
  );
};

export default Loader;
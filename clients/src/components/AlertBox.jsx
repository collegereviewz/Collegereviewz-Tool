import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function AlertBox({ message, type = "error", onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  const styles = {
    error:
      "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200",
    success:
      "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200",
    info:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200",
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.95 }}
        transition={{ duration: 0.25 }}
        className={`
          fixed top-6 left-1/2 z-50
          -translate-x-1/2
          rounded-xl px-6 py-4 shadow-xl backdrop-blur
          ${styles[type]}
        `}
      >
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">{message}</span>

          <button
            onClick={onClose}
            className="ml-2 text-lg font-bold opacity-70 hover:opacity-100"
          >
            ×
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

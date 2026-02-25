import { motion } from "framer-motion";

export default function AnimatedPageWrapper({ children, direction = "up" }) {
  const variants = {
    initial: {
      opacity: 0,
      x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
    },
    animate: { opacity: 1, x: 0, y: 0 },
    exit: {
      opacity: 0,
      x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
      y: direction === "up" ? -50 : direction === "down" ? 50 : 0,
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ type: "spring", stiffness: 100, damping: 15, mass: 1 }}
      className="w-full flex justify-center items-center px-4 py-4 flex-grow"
    >
      {children}
    </motion.div>
  );
}

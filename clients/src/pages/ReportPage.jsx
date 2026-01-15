import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

/* ✅ ENV-AWARE BASE URL */
const BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const ReportPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [theme, setTheme] = useState("dark");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const root = document.getElementById("root");
    root.style.minHeight = "100vh";
    root.style.transition = "background 0.9s ease-in-out";
    root.style.background =
      theme === "dark"
        ? "radial-gradient(circle at top right, #2563eb 0%, #020617 55%, #000000 100%)"
        : "radial-gradient(circle at bottom left, #e0f2fe 0%, #f8fafc 55%, #ffffff 100%)";
  }, [theme]);

  if (!state || !state.reportPath) {
    return (
      <div style={{ padding: 20 }}>
        <h2>No report available</h2>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  const reportUrl = `${BASE_URL}/${state.reportPath}`;

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.brand}>
          <img src={logo} alt="CollegeReviewZ Logo" style={{ width: 42, height: 42 }} />
          <h1 style={{ color: theme === "dark" ? "#e5e7eb" : "#000" }}>
            CollegeReview
            <span style={{ color: theme === "dark" ? "#6366f1" : "#dc2626" }}>
              Z
            </span>
          </h1>
        </div>

        <motion.button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          style={{
            ...styles.modeToggle,
            padding: isMobile ? "12px" : "12px 24px",
            width: isMobile ? 50 : "auto",
            height: isMobile ? 50 : "auto",
            borderRadius: isMobile ? "50%" : 12,
            background:
              theme === "dark"
                ? "linear-gradient(135deg, #4f46e5, #6d28d9)"
                : "#facc15",
            color: theme === "dark" ? "#fff" : "#111",
          }}
        >
          {theme === "dark"
            ? isMobile ? "🌙" : "🌙 Dark Mode"
            : isMobile ? "☀" : "☀ Light Mode"}
        </motion.button>
      </div>

      {/* CARD */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{
          ...styles.card,
          background: theme === "dark"
            ? "rgba(15,23,42,0.95)"
            : "rgba(255,255,255,0.95)",
          color: theme === "dark" ? "#e5e7eb" : "#020617"
        }}
      >
        {/* ✅ WATERMARK FIXED */}
        <div style={styles.cardWatermark}>CollegeReviewZ</div>

        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          style={styles.check}
        >
          ✔
        </motion.div>

        <motion.h1 variants={itemVariants}>Assessment Completed</motion.h1>

        <motion.p variants={itemVariants}>
          Your Career Report PDF has been generated successfully.
        </motion.p>

        {/* ✅ BUTTONS NOW CLICKABLE */}
        <motion.a
          variants={itemVariants}
          href={reportUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...styles.button, ...styles.green }}
        >
          Download PDF Report
        </motion.a>

        <motion.button
          variants={itemVariants}
          onClick={() => navigate("/")}
          style={{ ...styles.button, ...styles.blue }}
        >
          Take Assessment Again
        </motion.button>
      </motion.div>

      <footer
        style={{
          ...styles.footer,
          color: theme === "dark" ? "rgba(255,255,255,0.6)" : "#000"
        }}
      >
        © 2026 CollegeReviewZ.com
      </footer>
    </div>
  );
};

export default ReportPage;

/* ---------------- STYLES ---------------- */

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  header: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    display: "flex",
    justifyContent: "space-between",
    zIndex: 10
  },

  brand: { display: "flex", alignItems: "center", gap: 10 },

  modeToggle: {
    border: "none",
    cursor: "pointer",
    fontWeight: 600
  },

  card: {
    position: "relative",
    padding: "50px 40px",
    borderRadius: 18,
    maxWidth: 520,
    width: "90%",
    textAlign: "center",
    zIndex: 2
  },

  /* 🔥 CRITICAL FIX */
  cardWatermark: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 72,
    fontWeight: 800,
    opacity: 0.05,
    transform: "rotate(-35deg)",
    pointerEvents: "none",   // ✅ THIS FIXES EVERYTHING
    userSelect: "none",
    zIndex: 0
  },

  check: { fontSize: 64, color: "#22c55e", marginBottom: 20 },

  button: {
    marginTop: 18,
    padding: "14px 28px",
    fontSize: 16,
    borderRadius: 8,
    cursor: "pointer",
    textDecoration: "none",
    zIndex: 5,
    position: "relative"
  },

  green: { background: "#16a34a", color: "#fff" },
  blue: { background: "#2563eb", color: "#fff" },

  footer: {
    position: "absolute",
    bottom: 16,
    fontSize: 14,
    opacity: 0.6,
    zIndex: 10
  }
};

/* ---------------- ANIMATIONS ---------------- */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.6 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

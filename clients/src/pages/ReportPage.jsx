import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

const ReportPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  /* ---------------- THEME STATE ---------------- */
  const [theme, setTheme] = useState("dark"); // default dark


  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth < 640); // mobile < 640px
  handleResize(); // initial check
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);


  /* ---------------- ROOT GRADIENT ---------------- */
  useEffect(() => {
    const root = document.getElementById("root");

    root.style.minHeight = "100vh";
    root.style.transition = "background 0.9s ease-in-out";

    root.style.background =
      theme === "dark"
        ? "radial-gradient(circle at top right, #2563eb 0%, #020617 55%, #000000 100%)"
        : "radial-gradient(circle at bottom left, #e0f2fe 0%, #f8fafc 55%, #ffffff 100%)";
  }, [theme]);

  // SAFETY: backend returns ONLY reportPath
  if (!state || !state.reportPath) {
    return (
      <div style={{ padding: 20 }}>
        <h2>No report available</h2>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
{/* ---------------- HEADER ---------------- */}
<div style={styles.header}>
  <div style={styles.brand}>
    <img
      src={logo}
      alt="CollegeReviewZ Logo"
      style={{ width: 42, height: 42, objectFit: "contain" }}
    />

    <h1
      className="font-extrabold text-xl tracking-wide select-none"
      style={{
        color: theme === "dark" ? "#e5e7eb" : "#000000" // "CollegeReview" black in light mode
      }}
    >
      CollegeReview
      <span
        style={{ color: theme === "dark" ? "#6366f1" : "#dc2626" }} // "Z" indigo in dark, red in light
      >
        Z
      </span>
    </h1>
  </div>

  {/* ---------------- MODE TOGGLE BUTTON ---------------- */}
  <motion.button
  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
  style={{
    ...styles.modeToggle,
    padding: isMobile ? "12px" : "12px 24px", // circular on mobile
    width: isMobile ? 50 : "auto", // fixed width for circle
    height: isMobile ? 50 : "auto", // fixed height for circle
    fontSize: 16,
    borderRadius: isMobile ? "50%" : 12, // full circle on mobile
    fontWeight: 600,
    background:
      theme === "dark"
        ? "linear-gradient(135deg, #4f46e5, #6d28d9)"
        : "#facc15", // single color in light mode
    color: theme === "dark" ? "#fff" : "#111827",
    boxShadow: "0 5px 15px rgba(0,0,0,0.25)",
    textShadow:
      theme === "dark"
        ? "0 1px 2px rgba(0,0,0,0.4)"
        : "0 1px 2px rgba(255,255,255,0.3)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  animate={{ scale: [1, 1.05, 1] }}
  transition={{ duration: 2, repeat: Infinity }}
>
  {theme === "dark" ? (isMobile ? "🌙" : "🌙 Dark Mode") : isMobile ? "☀" : "☀ Light Mode"}
</motion.button>


</div>

      {/* ---------------- MAIN CARD ---------------- */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{
          ...styles.card,
          background:
            theme === "dark"
              ? "rgba(15,23,42,0.95)"
              : "rgba(255,255,255,0.95)",
          color: theme === "dark" ? "#e5e7eb" : "#020617"
        }}
      >
        {/* CARD FOREGROUND WATERMARK */}
        <div style={styles.cardWatermark}>CollegeReviewZ</div>

        {/* Blinking Check */}
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          style={styles.check}
        >
          ✔
        </motion.div>

        <motion.h1 variants={itemVariants}>
          Assessment Completed
        </motion.h1>

        <motion.p variants={itemVariants}>
          Your Career Report PDF has been generated successfully.
        </motion.p>

        <motion.a
          variants={itemVariants}
          href={`http://localhost:5000/${state.reportPath}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...styles.button, ...styles.green }}
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          Download PDF Report
        </motion.a>

        <motion.button
          variants={itemVariants}
          onClick={() => navigate("/")}
          style={{ ...styles.button, ...styles.blue }}
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          Take Assessment Again
        </motion.button>
      </motion.div>
      

      {/* ---------------- FOOTER ---------------- */}
<footer
  style={{
    ...styles.footer,
    color: theme === "dark" ? "rgba(255,255,255,0.6)" : "#000000" // black in light mode
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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  },

  /* HEADER */
  header: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  brand: {
    display: "flex",
    alignItems: "center",
    gap: 10
  },

  logo: {
    width: 36,
    height: 36,
    borderRadius: 8,
    background: "#2563eb",
    color: "#fff",
    fontWeight: 800,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  brandText: {
    fontWeight: 700,
    fontSize: 18,
    color: "#e5e7eb"
  },

  modeToggle: {
    padding: "8px 14px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    fontWeight: 600
  },

  /* CARD */
  card: {
    position: "relative",
    padding: "50px 40px",
    borderRadius: 18,
    boxShadow: "0 25px 50px rgba(0,0,0,0.35)",
    textAlign: "center",
    maxWidth: 520,
    width: "90%",
    zIndex: 2,
    overflow: "hidden"
  },

  cardWatermark: {
  position: "absolute",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 72,
  fontWeight: 800,
  opacity: 0.05,
  pointerEvents: "none",
  userSelect: "none",

  /* ✅ THIS IS THE KEY CHANGE */
  transform: "rotate(-35deg)"
},

  check: {
    fontSize: 64,
    color: "#22c55e",
    marginBottom: 20
  },

  button: {
    display: "inline-block",
    marginTop: 18,
    padding: "14px 28px",
    fontSize: 16,
    fontWeight: 600,
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    textDecoration: "none"
  },

  green: { background: "#16a34a", color: "#fff" },
  blue: { background: "#2563eb", color: "#fff" },

  /* FOOTER */
  footer: {
    position: "absolute",
    bottom: 16,
    fontSize: 14,
    opacity: 0.6
  }
};

/* ---------------- ANIMATIONS ---------------- */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.6 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};
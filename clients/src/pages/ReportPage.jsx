import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/Header";
// import basiclogo1 from "../assets/basiclogo1.png"; // No longer needed

export default function ReportPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.reportUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        No report found
      </div>
    );
  }

  const { reportUrl } = state;

  return (
    <div className="min-h-screen font-sans text-slate-900 dark:text-white bg-[#0B1120] flex flex-col justify-between overflow-x-hidden">
      <Header isLanding={true} />

      <div className="flex-grow w-full flex flex-col items-center justify-center relative px-4">
          {/* Global Background Effects */}
          <div className="absolute inset-0 -z-10 h-full w-full bg-[#0B1120] overflow-hidden pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0B1120] via-[#1a2c55] to-[#0B1120] opacity-80"></div>
              <div className="absolute bottom-0 right-0 h-[500px] w-[500px] bg-indigo-600/20 blur-[100px] rounded-full mix-blend-screen"></div>
          </div>

        {/* CARD */}
        <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="bg-slate-900 rounded-3xl p-6 md:p-10 max-w-md w-full text-center shadow-2xl z-10"
        >
            <h1 className="text-3xl font-extrabold mb-4 text-indigo-400">
            Assessment Completed 🎉
            </h1>

            <p className="text-gray-300 mb-8">
            Your career report is ready.
            </p>

            <a
            href={reportUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden group block w-full py-4 mb-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 font-bold text-white shadow-lg hover:shadow-xl transition-all"
            >
            <span className="absolute inset-0 bg-white transition-transform duration-[250ms] ease-out scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left"></span>
            <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-green-800 transition-colors duration-300">
                📄 Download PDF Report
            </span>
            </a>

            <button
            onClick={() => navigate("/")}
            className="relative overflow-hidden group w-full py-4 rounded-xl bg-gradient-to-r from-[#007ACC] to-[#47B5FF] font-bold text-white shadow-lg hover:shadow-xl transition-all"
            >
            <span className="absolute inset-0 bg-white transition-transform duration-[250ms] ease-out scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left"></span>
            <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-[#002D62] transition-colors duration-300">
                🔁 Take Assessment Again
            </span>
            </button>
        </motion.div>
      </div>

       <footer className="w-full py-4 text-center text-gray-500 text-xs bg-[#0B1120] border-t border-white/5 mt-auto relative z-10">
          <p>Copyright © 2026 All Rights Reserved. | Designed by CRZ Academic Review Pvt Ltd.</p>
       </footer>
    </div>
  );
}

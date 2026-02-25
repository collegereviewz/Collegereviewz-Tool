import logo from "../assets/logo6.png"; // FIX PATH IF NEEDED
// import DarkModeToggle from "./DarkModeToggle";

export default function Header({ darkMode, setDarkMode, isLanding = false }) {
  return (
    <header 
      className={`w-full px-4 lg:px-12 py-4 flex items-center justify-between sticky top-0 z-50 transition-colors duration-300 ${
        isLanding 
          ? "bg-[#0B1120] text-white border-b border-white/10" 
          : "bg-white text-slate-800 shadow-sm"
      }`}
    >
      <div className="flex items-center gap-2">
        <img src={logo} alt="CollegeReview" className="h-8 w-auto" />
        <span className={`text-2xl font-bold tracking-tight ${
          isLanding 
            ? "bg-gradient-to-r from-white to-sky-400 bg-clip-text text-transparent" 
            : "text-sky-600"
        }`}>
          CollegeReviewZ
        </span>
      </div>

    </header>
  );
}

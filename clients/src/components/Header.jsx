import logo from "../assets/logo.png"; // FIX PATH IF NEEDED
// import DarkModeToggle from "./DarkModeToggle";

export default function Header({ darkMode, setDarkMode }) {
  return (
    <header className="w-full px-6 py-4 flex items-center justify-between bg-black/40 backdrop-blur border-b border-indigo-500/20">
      <div className="flex items-center gap-3">
        <img
          src={logo}
          alt="CollegeReviewZ"
          className="h-8 w-auto"
        />
        <span className="text-white font-semibold text-lg">
          CollegeReview<span className="text-indigo-400">Z</span>
        </span>
      </div>

      {/* <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} /> */}
    </header>
  );
}

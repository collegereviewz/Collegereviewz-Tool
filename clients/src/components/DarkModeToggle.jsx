export default function DarkModeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="fixed top-4 right-4 z-50 px-4 py-2 rounded-full bg-gray-900 text-white dark:bg-white dark:text-black shadow-lg"
    >
      {darkMode ? "☀ Light" : "🌙 Dark"}
    </button>
  );
}

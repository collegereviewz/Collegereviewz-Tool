export default function Card({ children }) {
  return (
    <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-10">
      {children}
    </div>
  );
}

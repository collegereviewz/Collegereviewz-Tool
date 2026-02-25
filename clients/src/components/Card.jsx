export default function Card({ children }) {
  return (
    <div className="w-full max-w-4xl rounded-3xl border border-indigo-500/40 bg-gradient-to-br from-[#0f172a] to-[#020617] p-6 shadow-2xl backdrop-blur-xl">
      {children}
    </div>
  );
}

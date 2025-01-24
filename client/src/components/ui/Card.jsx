export function Card({ children }) {
  return <div className="bg-zinc-800 min-w-[600px] max-w-[800px] p-6 rounded-2xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-lg">{children}</div>;
}
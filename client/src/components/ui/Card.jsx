export function Card({ children }) {
  return <div className="bg-zinc-800 h-[auto] p-4 rounded-2xl shadow-md transition-transform transform hover:scale-[103%] hover:shadow-md">{children}</div>;
}
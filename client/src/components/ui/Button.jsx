export function Button({ onClick, children }) {
  return (
    <button
      className="bg-red-600 px-2 py-2 rounded-md text-zinc-300 text-xs hover:text-zinc-400"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

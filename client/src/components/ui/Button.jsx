export function Button({ onClick, children }) {
  return (
    <button
      className="bg-red-600 px-4 py-1 mr-3 rounded-md my-2"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

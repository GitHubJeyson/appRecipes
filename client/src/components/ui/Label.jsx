export function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} 
    className="text-xs my-1 text-zinc-300">
      {children}
    </label>
  );
}

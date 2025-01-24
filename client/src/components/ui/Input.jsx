import { forwardRef } from "react";

export const Input = forwardRef((props, ref) => (
  <input
    {...props}
    ref={ref}
    className="w-full bg-zinc-700 text-zinc-400 px-4 py-2 my-2 rounded-md from-zinc-800 via-transparent to-transparent"
    onKeyDown={(event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
      }
    }}
  />
));

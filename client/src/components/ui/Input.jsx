import { forwardRef } from "react";

export const Input = forwardRef((props, ref) => (
  <input
    {...props}
    ref={ref}
    className="w-full bg-zinc-700 text-zinc-400 placeholder:text-zinc-500 text-xs p-1 mt-1 mb-2 rounded-md bg-gradient-to-t from-zinc-800 via-transparent to-transparent"
    onKeyDown={(event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
      }
    }}
  />
));

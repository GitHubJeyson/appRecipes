import { forwardRef } from "react";

export const Textarea = forwardRef(({maxLenght, rows, ...props}, ref) => (
  <textarea
    {...props}
    ref={ref}
    rows={rows}
    maxLength={maxLenght}
    className="w-full bg-zinc-700 text-zinc-400 placeholder:text-zinc-500 text-xs p-1 rounded-md bg-gradient-to-t from-zinc-800 via-transparent to-transparent overflow-auto scrollbar-hide"
  />
));

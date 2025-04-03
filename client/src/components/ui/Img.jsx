import { forwardRef } from "react";

export const Img = forwardRef((props, ref) => (
    <img
    {...props}
    ref={ref}
    className="w-full h-[300px] text-xs object-cover rounded-xl mb-4 border-2 border-zinc-900 opacity-80"
    />
));

import { forwardRef } from "react";

export const Img = forwardRef((props, ref) => (
    <img
    {...props}
    ref={ref}
    className="w-full h-60 object-cover rounded-xl shadow-lg mb-6 border-2 border-zinc-900 opacity-80"
    />
));

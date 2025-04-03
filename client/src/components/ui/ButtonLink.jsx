import { Link } from "react-router-dom";

export const ButtonLink = ({ to, children }) => (
  <Link to={to} className="flex bg-red-600 px-2 py-2 rounded-md text-zinc-300 text-xs hover:text-zinc-400">
    {children}
  </Link>
);

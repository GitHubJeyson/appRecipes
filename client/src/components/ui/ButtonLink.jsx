import { Link } from "react-router-dom";

export const ButtonLink = ({ to, children }) => (
  <Link to={to} className="bg-red-600 px-4 py-1 mr-3 rounded-md my-2">
    {children}
  </Link>
);

import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function Sidebar() {
  const { isAuthenticated, user } = useAuth();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebarContent = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <>
    {isAuthenticated && user?.role === 'admin' && (
    <div className={`fixed ${isOpen ? 'w-48' : 'w-16'} bg-zinc-800 text-zinc-300 text-xs p-2 ml-6 rounded-xl shadow-md z-10 transition-all`}>
          <button
            onClick={toggleSidebarContent}
            className="absolute top-0 right-0 bg-zinc-700 p-2 rounded-full hover:bg-zinc-600 transition-colors">
            {isOpen ? '<' : '>'}
          </button>
          <h2 className={`text-sm font-bold mb-2 ${isOpen ? '' : 'hidden'}`}>
            Admin Panel
          </h2>

      {isOpen && (
      <ul>
        <li>
          <Link
            to="/users-manager"
            className="block py-2 px-2 w-full text-left hover:bg-zinc-700 transition-colors">
            User Manager
          </Link>
        </li>
        <li>
          <Link
            to="/category-manager"
            className="block py-2 px-2 w-full text-left hover:bg-zinc-700 transition-colors">
            Category Manager
          </Link>
        </li>
        <li>
          <Link
            to="/content-manager"
            className="block py-2 px-2 w-full text-left hover:bg-zinc-700 transition-colors">
            Content Manager
          </Link>
        </li>   
      </ul>
      )}
    </div>
      )}
    </>
  );
}

export default Sidebar;

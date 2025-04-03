import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { ButtonLink } from "./ui/ButtonLink";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-zinc-900 my-2 mx-4 md:mx-60 flex justify-between min-w-[300px] py-1 px-4 rounded-xl shadow-md transition-transform transform hover:scale-105 hover:shadow-md relative z-40">
      <button
        onClick={toggleMenu}
        className="block lg:hidden text-zinc-300 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <h1 className="font-black text-zinc-300 opacity-90 text-xs lg:text-lg hidden lg:block">
        <Link className="ml-2 mr-4 hover:text-zinc-400" to="/">Home</Link>
        {isAuthenticated && (
          <>
            <Link className="text-xs font-thin text-zinc-300 hover:text-zinc-400 mr-2" to="/recipes">~Recetas</Link>
            <Link className="text-xs font-thin text-zinc-300 hover:text-zinc-400 mr-4" to="/favorites">~Favoritos</Link>
          </>
        )}
      </h1>

      <div className="flex gap-x-2 items-center">
        {isAuthenticated ? (
          <>
            <h3 className="text-zinc-300 text-xs lg:text-xs pl-2">Bienvenido <span className="text-amber-400 pl-1">{user.username}</span></h3>
            <ButtonLink to="/add-recipe">Añadir Receta</ButtonLink>
            <Link
              to="/"
              onClick={() => logout()}
              className="text-zinc-300 mr-1 text-xs lg:text-xs hover:text-zinc-400 transition-colors"
            >
              Cerrar sesión
            </Link>
          </>
        ) : (
          <div className="flex gap-x-4 mx-2">
            <ButtonLink to="/login">Iniciar sesión</ButtonLink>
            <ButtonLink to="/register">Regístrate</ButtonLink>
          </div>
        )}
      </div>

      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } absolute top-11 left-0 right-0 bg-zinc-900 py-2 px-4 rounded-b-lg lg:hidden z-50`}
      >
        <Link
          to="/"
          className="block text-zinc-300 text-xs hover:text-zinc-400 py-1"
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </Link>
        {isAuthenticated && (
          <>
            <Link
              to="/recipes"
              className="block text-zinc-300 text-xs hover:text-zinc-400 py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Mis Recetas
            </Link>
            <Link
              to="/favorites"
              className="block text-zinc-300 text-xs hover:text-zinc-400 py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Mis Favoritos
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ButtonLink } from "./ui/ButtonLink";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-zinc-900 my-4 mx-60 mb-8 flex justify-between py-5 px-10 rounded-xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-lg">
      <h1 className="text-2xl font-black text-zinc-300 opacity-90">
        <Link className="mr-4" to={"/"}>Home</Link>
        <Link className="text-lg text-zinc-300 mr-4" to={isAuthenticated ? "/" : "/recipes"}>/Recetas</Link>
      </h1>
      <ul className="flex gap-x-4 items-center">{isAuthenticated ?
        (
          <>
            <li  className="text-white">
              Bienvenido {user.username}
            </li>
            <li>
              <ButtonLink to="/add-recipe">Añadir Receta</ButtonLink>
            </li>
            <li>
              <Link to="/" onClick={() => logout()} className="text-white hover:text-zinc-400 transition-colors" > Cerrar sesión </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <ButtonLink to="/login"> Iniciar sesión </ButtonLink>
            </li>
            <li>
              <ButtonLink to="/register">Regístrate </ButtonLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

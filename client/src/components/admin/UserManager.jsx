import { useEffect } from "react"; 
import { useAuth } from "../../hooks/useAuth";
import { ImFileEmpty } from "react-icons/im";
import { Button } from "../ui";

export function UserManager() {
  const { users, getUsers, deleteUser } = useAuth();

  useEffect(() => {
    getUsers();
  }, []);

  const handleDeleteUser = (userId, userRole) => {
    const adminUsers = users.filter(user => user.role === "admin");
    if (userRole === "admin" && adminUsers.length === 1) {
      alert("No se puede eliminar el único usuario admin.");
      return;
    }
    deleteUser(userId);
  };

  return (
    <div className="w-[calc(80vh-100px)] p-6 bg-zinc-900 rounded-lg shadow-lg shadow-zinc-950">
      <h2 className="text-2xl mb-6 text-zinc-200 font-semibold">Usuarios Autenticados</h2>
      
      {users.length === 0 ? (
        <div className="text-center text-zinc-400">
          <ImFileEmpty className="text-6xl text-zinc-500 mb-4" />
          <h1 className="text-lg text-zinc-400">Aún no hay usuarios registrados.</h1>
        </div>
      ) : (
        <div>
          {users.map((user) => (
            <div key={user._id} className="flex justify-between items-center mb-4 p-2 bg-zinc-700 rounded-lg shadow-md hover:bg-zinc-800 transition duration-200">
              <div className="text-zinc-300 text-sm">
                <p>{user.username} - {user.email} - <span className="font-semibold">{user.role}</span></p>
              </div>
              <Button 
                onClick={() => handleDeleteUser(user._id, user.role)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
              >
                Eliminar
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserManager;

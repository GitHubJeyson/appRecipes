import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { Card, Message, Button, Input, Label } from "../../components/ui";
import { useForm } from "react-hook-form";
import { registerSchema } from "../../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkAdminExists } from "../../services/apiAuth";

function Register() {
  const { signup, errors: registerErrors, isAuthenticated } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(registerSchema) });
  const [adminExists, setAdminExists] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const exists = await checkAdminExists();
      setAdminExists(exists);
    };
    checkAdmin();
  }, []);

  const onSubmit = async (value) => {
    await signup(value);
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/recipes");
  }, [isAuthenticated]);

  return (
    <div className="h-[calc(95vh-100px)] flex items-center justify-center w-full lg:w-1/2 2xl:w-1/4 min-w-[300px]">
      <Card>
        {registerErrors.map((error, i) => (
          <Message message={error} key={i} />
        ))}
        <h1 className="text-xl text-zinc-300 font-bold py-2">Regístrate</h1>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="username">Nombre de Usuario:</Label>
          <Input type="text" name="username" placeholder="Escribe tu nombre" autoComplete="username"
            {...register("username")}
            autoFocus
          />
          {errors.username?.message && (
            <p className="text-red-500">{errors.username?.message}</p>
          )}

          <Label htmlFor="email">Correo Electrónico:</Label>
          <Input name="email" placeholder="example@gmail.com" autoComplete="username"
            {...register("email")}
          />
          {errors.email?.message && (
            <p className="text-red-500">{errors.email?.message}</p>
          )}

          <Label htmlFor="password">Contraseña:</Label>
          <Input type="password" name="password" placeholder="********" autoComplete="new-password"
            {...register("password")}
          />
          {errors.password?.message && (
            <p className="text-red-500">{errors.password?.message}</p>
          )}

          <Label htmlFor="confirmPassword">Confirmar Contraseña:</Label>
          <Input type="password" name="confirmPassword" placeholder="********" autoComplete="new-password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword?.message && (
            <p className="text-red-500">{errors.confirmPassword?.message}</p>
          )}

          {!adminExists && (
            <div className="flex items-center space-x-4 my-4">
              <Label htmlFor="role">Rol:</Label>
              <select {...register("role")} className="bg-zinc-700 text-zinc-400 text-xs px-1 py-2 rounded-md">
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
          )}          
          <Button>Enviar</Button>
        </form>
        <p className="text-zinc-300 text-xs">
          ¿Ya tienes una cuenta?
          <Link className="text-blue-500" to="/login"> Iniciar sesión</Link>
        </p>
      </Card>
    </div>
  );
}

export default Register;

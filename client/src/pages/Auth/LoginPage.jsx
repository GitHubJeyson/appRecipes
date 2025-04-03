import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Message, Button, Input, Label } from "../../components/ui";
import { loginSchema } from "../../schemas/auth";

function LoginPage() {
  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: zodResolver(loginSchema),
  });


  const { signin, errors: loginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => signin(data);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/recipes");
    }
  }, [isAuthenticated]);

  return (
    <div className="h-[calc(95vh-100px)] flex items-center justify-center w-full lg:w-1/2 2xl:w-1/4 min-w-[300px]">
      <Card>
        {loginErrors.map((error, i) => (
          <Message message={error} key={i} />
        ))}
        <h1 className="text-xl font-bold text-zinc-300 py-2">Iniciar sesión</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="username">Nombre de usuario:</Label>
          <Input type="text" name="username" placeholder="Escribe tu usuario" autoComplete="username"
            {...register("username")}
          />
          {errors.username?.message && (
            <h1 className="text-red-500">{errors.username?.message}</h1>
          )}

          <Label htmlFor="password">Contraseña:</Label>
          <Input type="password" name="password" placeholder="********" autoComplete="new-password"
            {...register("password")}
          />
          {errors.password?.message && (
            <h1 className="text-red-500">{errors.password?.message}</h1>
          )}

          <Button>Enviar</Button>
        </form>
        <p className="text-zinc-300 text-xs">
          ¿No tienes una cuenta?
          <Link to="/register" className="text-blue-500"> Inscribirse</Link>
        </p>
      </Card>
    </div>
  );
}


export default LoginPage;
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Message, Button, Input, Label } from "../components/ui";
import { loginSchema } from "../schemas/auth";

export function LoginPage() {
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
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
      <Card>
        {loginErrors.map((error, i) => (
          <Message message={error} key={i} />
        ))}
        <h1 className="text-2xl font-bold py-2">Iniciar sesión</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="username">Nombre de usuario:</Label>
          <Input type="text" name="username" placeholder="Escribe tu usuario"
            {...register("username", { required: true })}
          />
          <p>{errors.username?.message}</p>

          <Label htmlFor="password">Contraseña:</Label>
          <Input type="password" name="password" placeholder="********"
            {...register("password", { required: true, minLength: 6 })}
          />
          <p>{errors.password?.message}</p>

          <Button>Enviar</Button>
        </form>

        <p>
        ¿No tienes una cuenta? <Link to="/register" className="text-sky-500">inscribirse</Link>
        </p>
      </Card>
    </div>
  );
}

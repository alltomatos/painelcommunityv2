import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const schema = z.object({
  username: z.string().min(1, "Usuário obrigatório"),
  password: z.string().min(1, "Senha obrigatória"),
});

type LoginForm = z.infer<typeof schema>;

const mockUser = { username: "admin", password: "admin" };

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(schema) });

  const onSubmit = (data: LoginForm) => {
    if (
      data.username === mockUser.username &&
      data.password === mockUser.password
    ) {
      localStorage.setItem("auth", "true");
      navigate("/");
    } else {
      setError("Usuário ou senha inválidos");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-sm p-6 space-y-4 border-2 border-gray-200 shadow-md">
        <h2 className="text-xl font-bold text-center mb-2">Login Painel Admin</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <Input
              placeholder="Usuário"
              {...register("username")}
              autoFocus
              className="mb-1"
            />
            {errors.username && (
              <span className="text-xs text-red-500">{errors.username.message}</span>
            )}
          </div>
          <div>
            <Input
              type="password"
              placeholder="Senha"
              {...register("password")}
              className="mb-1"
            />
            {errors.password && (
              <span className="text-xs text-red-500">{errors.password.message}</span>
            )}
          </div>
          {error && <div className="text-xs text-red-500 text-center">{error}</div>}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            Entrar
          </Button>
        </form>
        <div className="text-xs text-gray-400 text-center mt-2">
          Usuário: <b>admin</b> | Senha: <b>admin</b>
        </div>
      </Card>
    </div>
  );
} 
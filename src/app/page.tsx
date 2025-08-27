"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useAuthStore } from "@/stores/authStore";
import { loginSchema, LoginSchema } from "@/schemas/loginSchema";
import { authService } from "@/services/authService";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function Cadastro() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      const result = await authService.login(data);

      useAuthStore.getState().setToken(result.token, result.userId);

      router.push("/home");
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      alert("Falha ao realizar login: " + (error as Error).message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-xl p-6">
        <CardContent>
          <h1 className="text-2xl font-bold text-center mb-6 ">
            Bem-vindo ao Intelli
            <span className="text-2xl font-bold text-blue-600">Trip</span>
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className="border-slate-300"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="senha">Senha</Label>
              <Input
                id="senha"
                type="password"
                {...register("senha")}
                required
                className="border-slate-300"
              />
              {errors.senha && (
                <p className="text-red-500 text-sm">{errors.senha.message}</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Login
            </Button>
          </form>
          <div className="mt-1">
            <p>
              Não possui conta?{" "}
              <Link href="/register" className="text-blue-600 hover:underline">
                Fazer Registro.
              </Link>{" "}
            </p>
            <Link href="/password" className="text-blue-600 hover:underline">
              Esqueci a senha.
            </Link>{" "}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

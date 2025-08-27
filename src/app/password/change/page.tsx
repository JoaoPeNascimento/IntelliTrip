"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ResetPassword = () => {
  const router = useRouter();
  const [password, setFormPassword] = useState("");
  const [confirmPassword, setFormConfirmPassword] = useState("");

  async function handleUpdateUser() {
    const { token } = useAuthStore.getState();

    if (!token) {
      console.error("Usuário não autenticado!");
      return;
    }

    try {
      if (password == confirmPassword) {
        const updatedUser = await authService.updateUser({ password }, token);
        router.push("/");
      }
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-xl p-6">
        <CardContent>
          <h1 className="text-2xl font-bold text-center mb-6">Alterar senha</h1>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateUser();
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="email">Nova senha</Label>
              <Input
                id="senha"
                className="border-slate-300"
                required
                type="password"
                value={password}
                onChange={(e) => setFormPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Confirmar senha</Label>
              <Input
                id="confirmar-senha"
                className="border-slate-300"
                required
                type="password"
                value={confirmPassword}
                onChange={(e) => setFormConfirmPassword(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Alterar senha
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;

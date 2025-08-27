"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService } from "@/services/authService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/stores/authStore";
const Password = () => {
  const router = useRouter();
  const [email, setFormEmail] = useState("");
  const setEmailGlobal = useAuthStore((state) => state.setEmail);

  const onSubmit = async (email: string) => {
    try {
      const { exists } = await authService.checkEmail(email);

      if (exists) {
        setEmailGlobal(email);
        router.push("/password/change");
      } else {
        alert("E-mail não encontrado!");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-xl p-6">
        <CardContent>
          <h1 className="text-2xl font-bold text-center mb-6">Alterar senha</h1>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(email);
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                className="border-slate-300"
                required
                value={email}
                onChange={(e) => setFormEmail(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Enviar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Password;

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { authService } from "@/services/authService";
import Header from "@/components/Header";
import Title from "@/components/Title";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UserPage() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Estados do formulário
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        router.push("/");
        return;
      }

      try {
        const user = await authService.getUser(token);
        setName(user.name);
        setEmail(user.email);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        alert("Sessão expirada. Por favor, faça login novamente.");
        useAuthStore.getState().clearToken();
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token, router]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    // Validação básica de senha se o campo estiver preenchido
    if (password && password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    setUpdating(true);

    try {
      const updateData: { name?: string; password?: string } = { name };

      if (password) {
        updateData.password = password;
      }

      await authService.updateUser(updateData, token);

      alert("Perfil atualizado com sucesso!");

      // Limpar campos de senha após sucesso
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      alert("Erro ao atualizar o perfil. Tente novamente.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <LoadingSpinner visible={true} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="p-5 max-w-2xl mx-auto space-y-6">
        <div className="space-y-1">
          <Title>Minha Conta</Title>
          <p className="text-sm text-muted-foreground">
            Gerencie suas informações pessoais e segurança.
          </p>
        </div>

        <form onSubmit={handleUpdateProfile} className="space-y-6">
          {/* Dados Pessoais */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  disabled
                  className="bg-muted text-muted-foreground cursor-not-allowed"
                />
                <p className="text-xs text-muted-foreground">
                  O e-mail não pode ser alterado.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Segurança */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Alterar Senha</CardTitle>
              <CardDescription>
                Deixe em branco se não deseja alterar sua senha atual.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Nova Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Nova senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirme a nova senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4 pb-10">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={updating}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={updating}
              className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
            >
              {updating ? "Salvando..." : "Salvar Alterações"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { authService } from "@/services/authService";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { travelService } from "@/services/travelService";
import TravelCard from "@/components/TravelCard";

interface Travel {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
}

export default function Perfil() {
  const token = useAuthStore((state) => state.token);
  const [travels, setTravels] = useState<Travel[]>([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    const userFetchData = async () => {
      if (!token) return;

      try {
        const user = await authService.getUser(token);
        setUserData({
          name: user.name,
          email: user.email,
        });
      } catch (error) {
        console.log("Erro ao buscar dados do usuário: " + error);
      }
    };

    const travelsFetchData = async () => {
      if (!token) return;

      try {
        const data = await travelService.getAllTravels(token);
        setTravels(data);
      } catch (error) {
        console.log("Erro ao buscar viagens do usuário: " + error);
      } finally {
        setLoading(false);
      }
    };

    travelsFetchData();
    userFetchData();
  }, [token]);

  if (!userData) return <p>Carregando...</p>;
  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <Header />
      <div className="p-5">
        <div>
          <h2 className="text-lg font-medium">
            Olá, {userData.name} Bem-vindo!
          </h2>
          <p>
            <span className="capitalize">
              {format(new Date(), "EEEE, dd", { locale: ptBR })}
            </span>
            <span>&nbsp;de&nbsp;</span>
            <span className="capitalize">
              {format(new Date(), "MMMM", { locale: ptBR })}
            </span>
          </p>
        </div>
        <Title>Minhas viagens</Title>
        <div className="space-y-2">
          {travels.map((travel) => (
            <TravelCard
              destination={travel.destination}
              startDate={travel.startDate}
              endDate={travel.endDate}
              id={travel.id}
              key={travel.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState, use } from "react";
import { travelService } from "@/services/travelService";
import { TravelWithDetails } from "@/schemas/travelSchema";

interface TravelDetailProps {
  params: Promise<{ id: string }>;
}

const TravelInvite = ({ params }: TravelDetailProps) => {
  const { id } = use(params); // 🔹 aqui usamos React.use() para resolver o Promise
  const [travel, setTravel] = useState<TravelWithDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTravel = async () => {
      try {
        const data = await travelService.getTravelWithDetails(id);
        setTravel(data);
      } catch (error) {
        setError("Erro ao carregar viagem" + error);
      } finally {
        setLoading(false);
      }
    };

    fetchTravel();
  }, [id]);

  if (loading) return <p>Carregando viagem...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!travel) return <p>Nenhuma viagem encontrada.</p>;

  return (
    <div>
      <h1>{travel.destination}</h1>
      <p>
        <strong>Data:</strong> {new Date(travel.startDate).toLocaleDateString()}{" "}
        - {new Date(travel.endDate).toLocaleDateString()}
      </p>

      <h2>Atividades</h2>
      <ul>
        {travel.activities.length > 0 ? (
          travel.activities.map((act) => (
            <li key={act.id}>
              <strong>{act.title}</strong> –{" "}
              {new Date(act.date).toLocaleDateString()}
              {act.description && <p>{act.description}</p>}
            </li>
          ))
        ) : (
          <p>Nenhuma atividade cadastrada</p>
        )}
      </ul>

      <h2>Convites</h2>
      <ul>
        {travel.invites.length > 0 ? (
          travel.invites.map((inv) => <li key={inv.id}>{inv.recieverEmail}</li>)
        ) : (
          <p>Nenhum convite enviado</p>
        )}
      </ul>
    </div>
  );
};

export default TravelInvite;

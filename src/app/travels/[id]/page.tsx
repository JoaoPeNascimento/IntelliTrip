"use client";

import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import Title from "@/components/Title";
import { travelService } from "@/services/travelService";
import { useAuthStore } from "@/stores/authStore";
import { PlaneLanding, PlaneTakeoff } from "lucide-react";
import { useEffect, useState } from "react";

interface Travel {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
}

interface TravelDetailProps {
  params: {
    id: string;
  };
}

const TravelDetail = ({ params }: TravelDetailProps) => {
  const { id } = params;
  const token = useAuthStore((state) => state.token);
  const [travelData, setTravel] = useState<Travel | null>(null);
  const [showSpinner, setShowSpinner] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const travelFetch = async () => {
      if (!token) return;

      try {
        const travel = await travelService.getTravelById(id, token);
        setTravel(travel);
      } catch (error) {
        console.error("Erro ao buscar dados da viagem: " + error);
      }
    };

    const loadWithDelay = async () => {
      const delay = new Promise((resolve) => setTimeout(resolve, 2000));
      await Promise.all([travelFetch(), delay]);
      setLoading(false);
      setShowSpinner(false);
    };

    loadWithDelay();
  }, [token, id]);

  return (
    <>
      <LoadingSpinner visible={showSpinner} />
      {!showSpinner && travelData && (
        <>
          <Header />
          <div className="p-5">
            <h1 className="text-2xl font-semibold capitalize">
              Viagem para{" "}
              <span className="text-blue-600">{travelData.destination}</span>
            </h1>
            <p className="text-lg text-muted-foreground truncate flex gap-5">
              <span className="flex gap-1">
                <PlaneTakeoff />{" "}
                {new Date(travelData.startDate).toLocaleDateString()}{" "}
              </span>
              <span className="flex gap-1">
                <PlaneLanding />
                {new Date(travelData.endDate).toLocaleDateString()}
              </span>
            </p>
            <Title>Convidados</Title>
          </div>
        </>
      )}
    </>
  );
};

export default TravelDetail;

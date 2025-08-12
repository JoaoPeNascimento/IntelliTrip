"use client";

import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { activityService } from "@/services/activityService";
import { inviteService } from "@/services/inviteService";
import { travelService } from "@/services/travelService";
import { useAuthStore } from "@/stores/authStore";
import { PlaneLanding, PlaneTakeoff, PlusCircleIcon } from "lucide-react";
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

interface Activity {
  id: string;
  name: string;
  description: string;
  date: string;
}

const TravelDetail = ({ params }: TravelDetailProps) => {
  const { id } = params;
  const token = useAuthStore((state) => state.token);
  const [travelData, setTravel] = useState<Travel | null>(null);
  const [invites, setInvites] = useState<string[]>([]);
  const [activitys, setActivitys] = useState<Activity[]>([]);
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

    const fetchInvites = async () => {
      if (!token) return;

      try {
        const invites = await inviteService.getInvitesByTrip(id, token);
        setInvites(invites);
      } catch (error) {
        console.error("Erro ao buscar dados da viagem: " + error);
      }
    };

    const fetchActivitys = async () => {
      if (!token) return;

      try {
        const activitys = await activityService.getActivitysByTrip(id, token);
        setActivitys(activitys);
      } catch (error) {
        console.error("Erro ao buscar dados da viagem: " + error);
      }
    };

    const loadWithDelay = async () => {
      const delay = new Promise((resolve) => setTimeout(resolve, 2000));
      await Promise.all([
        travelFetch(),
        fetchInvites(),
        fetchActivitys(),
        delay,
      ]);
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
            <div className="space-y-1">
              {invites.map((invite) => (
                <p className="text-gray-500" key={invite}>
                  {invite}
                </p>
              ))}
              <Button>
                Criar convite
                <PlusCircleIcon />{" "}
              </Button>
            </div>
            <Title>Atividades</Title>
            {activitys.map((activity) => (
              <p className="text-gray-500" key={activity.id}>
                {activity.name}
              </p>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default TravelDetail;

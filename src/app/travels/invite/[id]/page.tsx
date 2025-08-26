"use client";

import React, { useEffect, useState, use } from "react";
import { travelService } from "@/services/travelService";
import { TravelWithDetails } from "@/schemas/travelWithDetails";
import LoadingSpinner from "@/components/LoadingSpinner";
import Header from "@/components/Header";
import TravelTitle from "@/components/TravelTitle";
import InvitesSection from "@/components/InvitesSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Title from "@/components/Title";
import { ChevronDown } from "lucide-react";
import ActivityCard from "@/components/ActivityCardNoChange";
import ActivityCardNoChange from "@/components/ActivityCardNoChange";

interface TravelDetailProps {
  params: Promise<{ id: string }>;
}

const TravelInvite = ({ params }: TravelDetailProps) => {
  const { id } = use(params);
  const [travel, setTravel] = useState<TravelWithDetails | null>(null);
  const [showSpinner, setShowSpinner] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

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

    const loadWithDelay = async () => {
      const delay = new Promise((resolve) => setTimeout(resolve, 2000));
      await Promise.all([fetchTravel(), delay]);
      setLoading(false);
      setShowSpinner(false);
    };

    loadWithDelay();
  }, [id]);

  return (
    <>
      <LoadingSpinner visible={showSpinner} />
      {!showSpinner && travel && (
        <>
          <Header />
          <div className="p-5">
            <TravelTitle
              destination={travel.destination}
              startDate={travel.startDate}
              endDate={travel.endDate}
            />

            <Collapsible open={open} onOpenChange={setOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full">
                <Title>Convidados</Title>
                <ChevronDown
                  className={`transition-transform duration-300 ${
                    open ? "rotate-180" : ""
                  } text-blue-600`}
                />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="space-y-1">
                  {travel.invites.map((inv) => (
                    <p className="text-gray-500" key={inv.id}>
                      {inv.email}
                    </p>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>

            <div className="flex items-baseline justify-between mb-2">
              <Title>Atividades</Title>
            </div>
            <div className="space-y-2">
              {travel.activities.map((activity) => (
                <ActivityCardNoChange
                  key={activity.id}
                  name={activity.name}
                  description={activity.description}
                  date={activity.date}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TravelInvite;

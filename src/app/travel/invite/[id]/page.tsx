"use client";

import { useEffect, useState, use } from "react";
import { travelService } from "@/services/travelService";
import { TravelWithDetails } from "@/schemas/travelWithDetails";
import LoadingSpinner from "@/components/LoadingSpinner";
import Header from "@/components/Header";
import TravelTitle from "@/components/TravelTitle";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Title from "@/components/Title";
import { ChevronDown, CircleCheckBig } from "lucide-react";
import ActivityCardNoChange from "@/components/ActivityCardNoChange";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/authStore";
import { inviteService } from "@/services/inviteService";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface TravelDetailProps {
  params: Promise<{ id: string }>;
}

const TravelInvite = ({ params }: TravelDetailProps) => {
  const { id } = use(params);
  const token = useAuthStore((state) => state.token);
  const userId = useAuthStore((state) => state.userId);
  const [travel, setTravel] = useState<TravelWithDetails | null>(null);
  const [showSpinner, setShowSpinner] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // Estados para Dialog de deleção
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const openDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const handleConfirmDeleteInvite = async () => {
    if (!token) {
      alert("Usuário não autenticado.");
      return;
    }

    if (!travel) {
      alert("Viagem não encontrada.");
      return;
    }

    const inviteId = travel.invites.find((inv) => inv.userId === userId)?.id;

    if (!inviteId) {
      alert("Convite não encontrado para o usuário atual.");
      return;
    }

    try {
      await inviteService.deleteInvite(token, inviteId);
      setDeleteDialogOpen(false);
      toast.custom(() => (
        <div className="flex border border-gray-300 rounded-xl p-2">
          <p>Convite deletado com sucesso</p>
          <CircleCheckBig />
        </div>
      ));
    } catch (error) {
      alert("Falha ao excluir o convite. Tente novamente." + error);
    }
  };

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
              deleteTravel={openDeleteDialog}
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

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogTitle>Excluir Viagem</AlertDialogTitle>
          <AlertDialogHeader>
            <p>
              Tem certeza que deseja excluir esta viagem? Esta ação não pode ser
              desfeita.
            </p>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDeleteInvite}
              className="bg-red-600 hover:bg-red-700"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TravelInvite;

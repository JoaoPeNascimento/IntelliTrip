"use client";

import { useEffect, useState, use } from "react";
import { travelService } from "@/services/travelService";
import { inviteService } from "@/services/inviteService";
import { authService } from "@/services/authService"; // Adicionado para buscar dados do usuário
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
import { ChevronDown } from "lucide-react";
import ActivityCardNoChange from "@/components/ActivityCardNoChange";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  // Auth Store
  const token = useAuthStore((state) => state.token);
  const storedEmail = useAuthStore((state) => state.email);
  const setEmail = useAuthStore((state) => state.setEmail); // Para salvar o email se buscarmos da API

  const [travel, setTravel] = useState<TravelWithDetails | null>(null);
  const [showSpinner, setShowSpinner] = useState(true);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Efeito para garantir que temos o email do usuário
  useEffect(() => {
    const ensureUserEmail = async () => {
      if (token && !storedEmail) {
        try {
          // Se tem token mas não tem email, busca na API
          const userData = await authService.getUser(token);
          if (userData && userData.email) {
            setEmail(userData.email);
          }
        } catch (error) {
          console.error("Erro ao atualizar dados do usuário:", error);
        }
      }
    };
    ensureUserEmail();
  }, [token, storedEmail, setEmail]);

  const openDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const handleConfirmDeleteInvite = async () => {
    // Verifica apenas o token inicialmente
    if (!token) {
      toast.error("Você precisa estar logado para realizar esta ação.");
      return;
    }

    // Tenta obter o email do store ou busca novamente como fallback
    let userEmail = storedEmail;

    if (!userEmail) {
      try {
        const userData = await authService.getUser(token);
        userEmail = userData.email;
        setEmail(userData.email); // Atualiza o store para futuras ações
      } catch (error) {
        toast.error("Erro ao identificar usuário. Faça login novamente.");
        return;
      }
    }

    if (!travel) {
      toast.error("Viagem não encontrada.");
      return;
    }

    // Busca o convite comparando o email
    const inviteId = travel.invites.find((inv) => inv.email === userEmail)?.id;

    if (!inviteId) {
      toast.error("Não foi possível localizar o seu convite nesta viagem.");
      console.log(
        "Emails disponíveis na viagem:",
        travel.invites.map((i) => i.email),
      );
      console.log("Email do usuário:", userEmail);
      return;
    }

    try {
      await inviteService.deleteInvite(token, inviteId);
      setDeleteDialogOpen(false);

      toast.success("Convite removido com sucesso!");

      router.push("/home");
    } catch (error) {
      toast.error("Falha ao excluir o convite.");
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchTravel = async () => {
      try {
        const data = await travelService.getTravelWithDetails(id);
        setTravel(data);
      } catch (error) {
        console.error("Erro ao carregar viagem", error);
        toast.error("Erro ao carregar detalhes da viagem.");
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
          <AlertDialogTitle>Sair da Viagem</AlertDialogTitle>
          <AlertDialogHeader>
            <p>
              Tem certeza que deseja remover o seu convite desta viagem? Você
              perderá o acesso a estas informações.
            </p>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDeleteInvite}
              className="bg-red-600 hover:bg-red-700"
            >
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TravelInvite;

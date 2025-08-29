"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { authService } from "@/services/authService";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import Header from "@/components/Header";
import Title from "@/components/Title";
import LoadingSpinner from "@/components/LoadingSpinner";
import { travelService } from "@/services/travelService";
import TravelCard from "@/components/TravelCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { CircleCheckBig } from "lucide-react";
import { inviteService } from "@/services/inviteService";
import { useUIStore } from "@/stores/uiStore";

interface Travel {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
}

interface Invite {
  id: string;
  inviteId: string;
  destination: string;
  startDate: string;
  endDate: string;
}

export default function Perfil() {
  const token = useAuthStore((state) => state.token);
  const { showMyTravels, showMyInvites } = useUIStore();
  const [showSpinner, setShowSpinner] = useState(true);
  const [travels, setTravels] = useState<Travel[]>([]);
  const [loading, setLoading] = useState(true);
  const [invites, setInvites] = useState<Invite[]>([]);
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
  } | null>(null);

  // Estados para criação de viagem
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [createFormDestination, createSetFormDestination] = useState("");
  const [createFormStartDate, createSetFormStartDate] = useState("");
  const [createFormEndDate, createSetFormEndDate] = useState("");

  //Estados para exclusão de viagem
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTravelId, setSelectedTravelId] = useState<string | null>(null);

  //Estados para exclusão de convite
  const [deleteInviteDialogOpen, setDeleteInviteDialogOpen] = useState(false);
  const [selectedInviteId, setSelectedInviteId] = useState<string | null>(null);

  const openDeleteInviteDialog = (inviteId: string) => {
    setSelectedInviteId(inviteId);
    setDeleteInviteDialogOpen(true);
  };

  const openDeleteDialog = (travelId: string) => {
    setSelectedTravelId(travelId);
    setDeleteDialogOpen(true);
  };

  const handleOpenCreateDialog = () => {
    setCreateDialogOpen(true);
  };

  const handleCreateTrip = async () => {
    if (!token) return;

    if (!createFormDestination || !createFormStartDate || !createFormEndDate) {
      alert("Preencha todos os campos antes de criar a viagem.");
      return;
    }

    const TripData = {
      destination: createFormDestination,
      startDate: createFormStartDate,
      endDate: createFormEndDate,
    };

    try {
      const travel = await travelService.createTravel(token, TripData);

      if (!travel) {
        alert("Falha ao criar a viagem. Verifique os dados informados.");
        return;
      }

      setTravels((prev) => [...prev, travel]);

      setCreateDialogOpen(false);
    } catch (error) {
      alert("Erro ao criar a atividade. Tente novamente.");
    }
  };

  const handleConfirmDeleteInvite = async () => {
    if (!token || !selectedInviteId) return;

    try {
      await inviteService.deleteInvite(token, selectedInviteId);
      setInvites((prev) =>
        prev.filter((invites) => invites.inviteId !== selectedInviteId)
      );
      setDeleteDialogOpen(false);
      setSelectedTravelId(null);
      toast.custom(() => (
        <div className="flex border border-gray-300 rounded-xl p-2">
          <p>Convite deletado com sucesso</p>
          <CircleCheckBig />
        </div>
      ));
    } catch (error) {
      alert("Falha ao excluir o convite. Tente novamente.");
    }
  };

  const handleConfirmDelete = async () => {
    if (!token || !selectedTravelId) return;

    try {
      await travelService.deleteTravel(token, selectedTravelId);
      setTravels((prev) =>
        prev.filter((travel) => travel.id !== selectedTravelId)
      );
      setDeleteDialogOpen(false);
      setSelectedTravelId(null);
      toast.custom(() => (
        <div className="flex border border-gray-300 rounded-xl p-2">
          <p>Viagem deletada com sucesso</p>
          <CircleCheckBig />
        </div>
      ));
    } catch (error) {
      alert("Falha ao excluir a viagem. Tente novamente.");
    }
  };

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
        return;
      }
    };

    const userInviteFetchData = async () => {
      if (!token) return;
      try {
        const invites = await inviteService.getUserInvites(token);
        if (!invites) return;
        setInvites(invites);
      } catch (error) {
        return;
      }
    };

    const travelsFetchData = async () => {
      if (!token) return;
      try {
        const data = await travelService.getAllTravels(token);
        setTravels(data);
      } catch (error) {
        return;
      }
    };

    const loadWithDelay = async () => {
      const delay = new Promise((resolve) => setTimeout(resolve, 2000));
      await Promise.all([
        userFetchData(),
        travelsFetchData(),
        userInviteFetchData(),
        delay,
      ]);
      setLoading(false);
      setShowSpinner(false);
    };

    loadWithDelay();
  }, [token]);

  return (
    <>
      <LoadingSpinner visible={showSpinner} />
      {!showSpinner && userData && showMyTravels && (
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
                  key={travel.id}
                  url={`/travel/${travel.id}`}
                  onDelete={() => openDeleteDialog(travel.id)}
                />
              ))}
              <Button onClick={handleOpenCreateDialog} variant={"outline"}>
                Planejar Nova Viagem
              </Button>
            </div>
          </div>
        </div>
      )}

      {!showSpinner && userData && showMyInvites && (
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
            <Title>Meus Convites</Title>
            <div className="space-y-2">
              {invites.map((invite) => (
                <TravelCard
                  destination={invite.destination}
                  startDate={invite.startDate}
                  endDate={invite.endDate}
                  key={invite.id}
                  url={`/travel/invite/${invite.id}`}
                  onDelete={() => openDeleteInviteDialog(invite.inviteId)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent>
          <DialogTitle>Planejar Nova Viagem</DialogTitle>
          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="name">Destino</Label>
              <Input
                id="name"
                value={createFormDestination}
                onChange={(e) => {
                  createSetFormDestination(e.target.value);
                }}
              />
            </div>
            <div className="space-y-1 flex place-content-between">
              <div>
                <Label htmlFor="date">Data Inicio</Label>
                <Input
                  id="date"
                  type="date"
                  value={createFormStartDate}
                  onChange={(e) => {
                    createSetFormStartDate(e.target.value);
                  }}
                />
              </div>
              <div>
                <Label htmlFor="date">Data Fim</Label>
                <Input
                  id="date"
                  type="date"
                  value={createFormEndDate}
                  onChange={(e) => {
                    createSetFormEndDate(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setCreateDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={handleCreateTrip}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={deleteInviteDialogOpen}
        onOpenChange={setDeleteInviteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir convite</AlertDialogTitle>
            <p>
              Tem certeza que deseja excluir este convite? Esta ação não pode
              ser desfeita.
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
}

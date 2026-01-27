"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { authService } from "@/services/authService";
import { format, isAfter, differenceInDays, parseISO } from "date-fns";
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
import Link from "next/link";

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

  //Estados para exclusão de convite
  const [deleteInviteDialogOpen, setDeleteInviteDialogOpen] = useState(false);
  const [selectedInviteId, setSelectedInviteId] = useState<string | null>(null);

  const openDeleteInviteDialog = (inviteId: string) => {
    setSelectedInviteId(inviteId);
    setDeleteInviteDialogOpen(true);
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
        prev.filter((invites) => invites.inviteId !== selectedInviteId),
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

  const getNextTravel = () => {
    const futureTravels = travels
      .filter((t) => isAfter(parseISO(t.startDate), new Date()))
      .sort(
        (a, b) =>
          parseISO(a.startDate).getTime() - parseISO(b.startDate).getTime(),
      );

    return futureTravels[0] || null;
  };

  const nextTravel = getNextTravel();
  const daysToTrip = nextTravel
    ? differenceInDays(parseISO(nextTravel.startDate), new Date())
    : null;

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
            <div className="mb-2">
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

            {nextTravel && (
              <Link href={`/travel/${nextTravel.id}`} className="block mb-8">
                <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-blue-600 to-teal-500 p-6 text-white shadow-lg transition-transform active:scale-95">
                  <div className="relative z-10">
                    <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                      Sua próxima aventura
                    </span>
                    <h3 className="mt-1 text-2xl font-bold">
                      {nextTravel.destination}
                    </h3>

                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        <p className="text-sm opacity-90">
                          {format(
                            parseISO(nextTravel.startDate),
                            "dd 'de' MMMM",
                            { locale: ptBR },
                          )}
                        </p>
                        <p className="text-xs opacity-75">Partida em breve</p>
                      </div>

                      <div className="text-right">
                        <span className="text-3xl font-black">
                          {daysToTrip === 0 ? "É hoje!" : `${daysToTrip}`}
                        </span>
                        {daysToTrip !== 0 && (
                          <p className="text-[10px] uppercase font-bold">
                            Dias restantes
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Elemento decorativo de fundo */}
                  <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
                </div>
              </Link>
            )}

            <Title>Minhas viagens</Title>
            <div className="space-y-2">
              {travels.map((travel) => (
                <TravelCard
                  destination={travel.destination}
                  startDate={travel.startDate}
                  endDate={travel.endDate}
                  key={travel.id}
                  url={`/travel/${travel.id}`}
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

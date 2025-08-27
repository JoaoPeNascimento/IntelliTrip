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
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Travel {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
}

export default function Perfil() {
  const token = useAuthStore((state) => state.token);
  const [showSpinner, setShowSpinner] = useState(true);
  const [travels, setTravels] = useState<Travel[]>([]);
  const [loading, setLoading] = useState(true);
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
      console.error("Erro ao criar a atividade: " + error);
      alert("Erro ao criar a atividade. Tente novamente.");
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
      alert("Viagem excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar viagem:", error);
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
      }
    };

    const loadWithDelay = async () => {
      const delay = new Promise((resolve) => setTimeout(resolve, 2000));
      await Promise.all([userFetchData(), travelsFetchData(), delay]);
      setLoading(false);
      setShowSpinner(false);
    };

    loadWithDelay();
  }, [token]);

  return (
    <>
      <LoadingSpinner visible={showSpinner} />
      {!showSpinner && userData && (
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
                  onDelete={() => openDeleteDialog(travel.id)}
                />
              ))}
              <Button onClick={handleOpenCreateDialog} variant={"outline"}>
                Planejar Nova Viagem
              </Button>
            </div>
          </div>

          {/* Adicionar um footer */}
        </div>
      )}

      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Planejar Nova Viagem</DialogTitle>
          </DialogHeader>
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
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Viagem</AlertDialogTitle>
            <p>
              Tem certeza que deseja excluir esta viagem? Esta ação não pode ser
              desfeita.
            </p>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

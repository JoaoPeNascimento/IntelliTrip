"use client";

import ActivityCard from "@/components/ActivityCard";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { activityService } from "@/services/activityService";
import { inviteService } from "@/services/inviteService";
import { travelService } from "@/services/travelService";
import { useAuthStore } from "@/stores/authStore";
import { PlusCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import TravelTitle from "@/components/TravelTitle";
import { ActivityDialogContent } from "@/components/ActivityDialogContent";
import React from "react";
import InvitesSection from "@/components/InvitesSection";
import ActivitiesSection from "@/components/ActivitiesSection";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Travel {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
}

interface TravelDetailProps {
  params: Promise<{ id: string }>;
}

interface Activity {
  id: string;
  name: string;
  description: string;
  date: string;
}

const TravelDetail = ({ params }: TravelDetailProps) => {
  const { id } = React.use(params);
  const token = useAuthStore((state) => state.token);
  const [travelData, setTravel] = useState<Travel | null>(null);
  const [invites, setInvites] = useState<string[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [showSpinner, setShowSpinner] = useState(true);
  const [loading, setLoading] = useState(true);

  // Estados para edição de atividade
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formDate, setFormDate] = useState("");

  // Estados para exclusão de atividade
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [activityToDelete, setActivityToDelete] = useState<Activity | null>(
    null
  );

  // Estados para criação de atividade
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [createFormName, createSetFormName] = useState("");
  const [createFormDescription, createSetFormDescription] = useState("");
  const [createFormDate, createSetFormDate] = useState("");

  // Estados para criação de convite
  const [createInviteDialogOpen, setCreateInviteDialogOpen] = useState(false);

  const requestDeleteActivity = (activity: Activity) => {
    setActivityToDelete(activity);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteActivity = async () => {
    if (!activityToDelete || !token) return;
    setLoading(true);
    const success = await activityService.deleteActivity(
      activityToDelete.id,
      token
    );
    if (success) {
      setActivities((prev) => prev.filter((a) => a.id !== activityToDelete.id));
    } else {
      alert("Falha ao deletar atividade.");
    }
    setLoading(false);
    setDeleteDialogOpen(false);
  };

  const handleOpenEditDialog = (activity: Activity) => {
    setSelectedActivity(activity);
    setFormName(activity.name);
    setFormDescription(activity.description);
    setFormDate(activity.date.split("T")[0]);
    setEditDialogOpen(true);
  };

  const handleOpenCreateInviteDialog = () => {
    setCreateInviteDialogOpen(true);
  };

  const handleOpenCreateDialog = () => {
    setCreateDialogOpen(true);
  };

  const handleUpdateActivity = async () => {
    if (!selectedActivity || !token) return;

    const updatedData = {
      name: formName,
      description: formDescription,
      date: formDate,
    };

    const updated = await activityService.updateActivity(
      selectedActivity.id,
      token,
      updatedData
    );

    if (updated) {
      setActivities((prev) =>
        prev.map((a) => (a.id === updated.id ? updated : a))
      );
      setEditDialogOpen(false);
    } else {
      alert("Falha ao atualizar atividade.");
    }
  };

  const handleCreateActivity = async () => {
    if (!token) return;

    if (!createFormName || !createFormDescription || !createFormDate) {
      alert("Preencha todos os campos antes de criar a atividade.");
      return;
    }

    const activityData = {
      name: createFormName,
      description: createFormDescription,
      date: createFormDate,
    };

    try {
      const activity = await activityService.createActivity(
        id,
        token,
        activityData
      );

      if (!activity) {
        alert("Falha ao criar a atividade. Verifique os dados informados.");
        return;
      }

      setActivities((prev) => [...prev, activity]);

      setCreateDialogOpen(false);
    } catch (error) {
      console.error("Erro ao criar a atividade: " + error);
      alert("Erro ao criar a atividade. Tente novamente.");
    }
  };

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
        console.error("Erro ao buscar convites: " + error);
      }
    };

    const fetchActivities = async () => {
      if (!token) return;
      try {
        const activities = await activityService.getActivitiesByTrip(id, token);
        setActivities(activities);
      } catch (error) {
        console.error("Erro ao buscar atividades: " + error);
      }
    };

    const loadWithDelay = async () => {
      const delay = new Promise((resolve) => setTimeout(resolve, 2000));
      await Promise.all([
        travelFetch(),
        fetchInvites(),
        fetchActivities(),
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
            <TravelTitle
              destination={travelData.destination}
              startDate={travelData.startDate}
              endDate={travelData.endDate}
            />

            <InvitesSection
              invites={invites}
              onClick={handleOpenCreateInviteDialog}
            />

            <ActivitiesSection
              activities={activities}
              handleOpenCreateDialog={handleOpenCreateDialog}
              onDelete={requestDeleteActivity}
              onEdit={handleOpenEditDialog}
            />
          </div>
        </>
      )}

      {/* Dialog de edição */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <ActivityDialogContent
          tipo="Editar"
          formName={formName}
          formDescription={formDescription}
          formDate={formDate}
          setFormName={setFormName}
          setFormDescription={setFormDescription}
          setFormDate={setFormDate}
          onCancel={() => setEditDialogOpen(false)}
          onSave={handleUpdateActivity}
        />
      </Dialog>

      {/* Dialog de criação */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <ActivityDialogContent
          tipo="Criar"
          formName={createFormName}
          formDescription={createFormDescription}
          formDate={createFormDate}
          setFormName={createSetFormName}
          setFormDescription={createSetFormDescription}
          setFormDate={createSetFormDate}
          onCancel={() => setCreateDialogOpen(false)}
          onSave={handleCreateActivity}
        />
      </Dialog>

      {/* AlertDialog de exclusão */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza que deseja excluir?</AlertDialogTitle>
            <AlertDialogDescription>
              Essa ação não poderá ser desfeita. Isso irá remover
              permanentemente a atividade.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteActivity}
              className="bg-red-600 hover:bg-red-700"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog
        open={createInviteDialogOpen}
        onOpenChange={setCreateInviteDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enviar Convite</DialogTitle>
          </DialogHeader>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" />
          </div>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setCreateInviteDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button>Enviar Convite</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TravelDetail;

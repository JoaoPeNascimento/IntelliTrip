import { PlusCircleIcon } from "lucide-react";
import ActivityCard from "./ActivityCard";
import Title from "./Title";
import { Button } from "./ui/button";

interface Activity {
  id: string;
  name: string;
  description: string;
  date: string;
}

interface ActivityList {
  activities: Activity[];
  onEdit: (activity: Activity) => void;
  onDelete: (activity: Activity) => void;
  handleOpenCreateDialog: () => void;
}

const ActivitiesSection = ({
  activities,
  onDelete,
  onEdit,
  handleOpenCreateDialog,
}: ActivityList) => {
  return (
    <>
      <Title>Atividades</Title>
      <div className="space-y-2">
        {activities.map((activity) => (
          <ActivityCard
            key={activity.id}
            name={activity.name}
            description={activity.description}
            date={activity.date}
            onEdit={() => onEdit(activity)}
            onDelete={() => onDelete(activity)}
          />
        ))}
        <Button onClick={handleOpenCreateDialog} variant={"outline"}>
          Criar atividade
          <PlusCircleIcon />{" "}
        </Button>
      </div>
    </>
  );
};

export default ActivitiesSection;

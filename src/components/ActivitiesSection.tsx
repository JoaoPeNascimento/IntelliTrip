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
  onSugest: () => void;
}

const ActivitiesSection = ({
  activities,
  onDelete,
  onEdit,
  handleOpenCreateDialog,
  onSugest,
}: ActivityList) => {
  return (
    <>
      <div className="flex items-baseline justify-between mb-2">
        <Title>Atividades</Title>
        <span
          className="inline-block rounded-lg p-[2px] transition-colors bg-gray-200
                   hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-400"
        >
          <Button
            variant="outline"
            onClick={onSugest}
            className="rounded-lg border-2 border-transparent bg-white hover:bg-white hover:text-black"
          >
            Sugestões
          </Button>
        </span>
      </div>
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

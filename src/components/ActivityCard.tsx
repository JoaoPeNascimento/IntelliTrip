import { Edit2Icon, TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface ActivityData {
  name: string;
  description: string;
  date: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

function ActivityCard({
  name,
  description,
  date,
  onEdit,
  onDelete,
}: ActivityData) {
  return (
    <Card className="border-solid border-gray-300 max-w-[370px]">
      <CardContent>
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-xl">{name}</h1>
          <div className="flex gap-1">
            <Button variant="ghost" onClick={onEdit}>
              <Edit2Icon />
            </Button>
            <Button variant="ghost" onClick={onDelete}>
              <TrashIcon className="text-red-600" />
            </Button>
          </div>
        </div>
        <p className="text-muted-foreground">{description}</p>
        <p className="text-muted-foreground">
          {new Date(date).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
}

export default ActivityCard;

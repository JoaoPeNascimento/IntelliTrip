import { Edit2Icon, TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface ActivityData {
  name: string;
  description: string;
  date: string;
}

function ActivityCard(props: ActivityData) {
  return (
    <Card className="border-solid border-gray-300 max-w-[370px]">
      <CardContent>
        <div className="flex place-content-between">
          <h1 className="font-semibold text-xl">{props.name}</h1>
          <div className="gap-1">
            <Button variant={"ghost"}>
              <Edit2Icon />
            </Button>
            <Button variant={"ghost"}>
              <TrashIcon className="text-red-600" />
            </Button>
          </div>
        </div>
        <p className="text-muted-foreground">{props.description}</p>
        <p className="text-muted-foreground">
          {new Date(props.date).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
}

export default ActivityCard;

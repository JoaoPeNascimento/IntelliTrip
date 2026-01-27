import { PlaneLanding, PlaneTakeoff } from "lucide-react";
import { Button } from "./ui/button";

interface TravelTitle {
  destination: string;
  startDate: string;
  endDate: string;
  deleteTravel?: () => void;
}

const TravelTitle = (props: TravelTitle) => {
  return (
    <>
      <div className="flex gap-1">
        <h1 className="text-2xl font-semibold capitalize">
          Viagem para <span className="text-blue-600">{props.destination}</span>
        </h1>
        <Button
          className="bg-red-500 hover:bg-red-700"
          onClick={props.deleteTravel}
        >
          Deletar
        </Button>
      </div>
      <p className="text-lg text-muted-foreground truncate flex gap-5">
        <span className="flex gap-1">
          <PlaneTakeoff /> {new Date(props.startDate).toLocaleDateString()}{" "}
        </span>
        <span className="flex gap-1">
          <PlaneLanding />
          {new Date(props.endDate).toLocaleDateString()}
        </span>
      </p>
    </>
  );
};

export default TravelTitle;

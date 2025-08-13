import { PlaneLanding, PlaneTakeoff } from "lucide-react";

interface TravelTitle {
  destination: string;
  startDate: string;
  endDate: string;
}

const TravelTitle = (props: TravelTitle) => {
  return (
    <>
      <h1 className="text-2xl font-semibold capitalize">
        Viagem para <span className="text-blue-600">{props.destination}</span>
      </h1>
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

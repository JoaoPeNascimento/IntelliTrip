import { CalendarDays } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

interface TravelData {
  destination: string;
  startDate: string;
  endDate: string;
  id: string;
}

const TravelCard = ({ destination, startDate, endDate, id }: TravelData) => {
  return (
    <Card className="border-solid border-gray-300 max-w-[370px] w-full">
      <CardContent className="flex items-center justify-between gap-2 px-3 py-4">
        <CalendarDays className="flex-shrink-0" />

        <div className="flex flex-col overflow-hidden min-w-0">
          <h2 className="text-lg font-semibold truncate">{destination}</h2>
          <p className="text-sm text-muted-foreground truncate">
            {new Date(startDate).toLocaleDateString()} -{" "}
            {new Date(endDate).toLocaleDateString()}
          </p>
        </div>

        <Button className="capitalize p-2 rounded-xl whitespace-nowrap" asChild>
          <Link href={`/travels/${id}`}>Ver detalhes</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default TravelCard;

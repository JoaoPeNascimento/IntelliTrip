import { CalendarDays, TrashIcon } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

interface TravelData {
  destination: string;
  startDate: string;
  endDate: string;
  url: string;
}

const TravelCard = ({ destination, startDate, endDate, url }: TravelData) => {
  return (
    <Card className="border border-gray-300 max-w-[370px] w-full">
      <CardContent className="flex flex-col gap-2 px-3 py-4">
        {/* Topo: Destino + Botões */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <CalendarDays className="flex-shrink-0" />
            <h2 className="text-lg font-semibold truncate">{destination}</h2>
          </div>

          <div className="flex items-center gap-2">
            <Button
              className="capitalize p-1 rounded-xl whitespace-nowrap"
              asChild
            >
              <Link href={url}>Ver detalhes</Link>
            </Button>
          </div>
        </div>

        {/* Datas */}
        <p className="text-sm text-muted-foreground truncate mt-1">
          {new Date(startDate).toLocaleDateString()} -{" "}
          {new Date(endDate).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
};

export default TravelCard;

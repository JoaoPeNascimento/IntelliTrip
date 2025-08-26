import { Card, CardContent } from "./ui/card";
import { parseISO, format } from "date-fns";

interface ActivityData {
  name: string;
  description: string;
  date: string; // ISO como "YYYY-MM-DD" ou "YYYY-MM-DDTHH:mm:ssZ"
}

function formatDateSafe(input: string): string {
  if (!input) return "";

  const match = input.match(/^\d{4}-\d{2}-\d{2}/);
  if (match) {
    const [y, m, d] = match[0].split("-");
    return `${d}/${m}/${y}`;
  }

  try {
    return format(parseISO(input), "dd/MM/yyyy");
  } catch {
    return input;
  }
}

function ActivityCardNoChange({ name, description, date }: ActivityData) {
  return (
    <Card className="border-solid border-gray-300 max-w-[370px]">
      <CardContent>
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-xl">{name}</h1>
        </div>
        <p className="text-muted-foreground">{description}</p>
        <p className="text-muted-foreground">{formatDateSafe(date)}</p>
      </CardContent>
    </Card>
  );
}

export default ActivityCardNoChange;

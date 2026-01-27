import { Card, CardContent } from "@/components/ui/card";
import { Clock, Syringe } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Props = {
  availableVaccines: string[];
  workingHours: string;
};

export default function AdminHospitalOperationsSection({
  availableVaccines,
  workingHours,
}: Props) {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <h2 className="text-lg font-medium">Operations</h2>

        {/* working hours */}
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>
            <span className="text-muted-foreground">Working hours:</span>{" "}
            {workingHours}
          </span>
        </div>

        {/* vaccines */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Syringe className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Available vaccines</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {availableVaccines.map((vaccine) => (
              <Badge key={vaccine} variant="secondary">
                {vaccine}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import { Building2, MapPin } from "lucide-react";

type Props = {
  name: string;
  address: string;
};

export default function AdminHospitalOverviewSection({ name, address }: Props) {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <h2 className="text-lg font-medium">Overview</h2>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <span>{name}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{address}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

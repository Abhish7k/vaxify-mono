import { Card, CardContent } from "@/components/ui/card";
import { Hash, Calendar } from "lucide-react";

type Props = {
  hospitalId: string;
  createdAt: string;
};

export default function AdminHospitalMetaSection({
  hospitalId,
  createdAt,
}: Props) {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <h2 className="text-lg font-medium">Metadata</h2>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Hash className="h-4 w-4 text-muted-foreground" />
            <span>
              <span className="text-muted-foreground">Hospital ID:</span>{" "}
              {hospitalId}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>
              <span className="text-muted-foreground">Registered on:</span>{" "}
              {createdAt}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

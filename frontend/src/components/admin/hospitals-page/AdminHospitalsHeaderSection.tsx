import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RotateCcw } from "lucide-react";

type Props = {
  loading?: boolean;
  onRefresh?: () => void;
};

export default function AdminHospitalsHeaderSection({
  loading,
  onRefresh,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Hospital Approvals
        </h1>
        <p className="text-sm text-muted-foreground">
          Review and approve hospital registrations across the platform
        </p>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={onRefresh}
        disabled={loading}
        className="gap-2 text-xs sm:text-sm active:scale-95 transition-all min-w-[120px]"
      >
        <RotateCcw
          className={cn("size-3.5 sm:size-4", loading && "animate-spin")}
        />
        {loading ? "Refreshing..." : "Refresh Data"}
      </Button>
    </div>
  );
}

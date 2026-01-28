import { PackagePlus } from "lucide-react";

export function LowStockEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-muted/10 rounded-xl border border-dashed">
      <div className="bg-green-100 p-4 rounded-full mb-4">
        <PackagePlus className="h-8 w-8 text-green-600" />
      </div>
      <h3 className="text-xl font-semibold">Inventory Healthy</h3>
      <p className="text-muted-foreground mt-2 max-w-sm text-center">
        All vaccine stocks are above critical levels. No immediate actions
        required.
      </p>
    </div>
  );
}

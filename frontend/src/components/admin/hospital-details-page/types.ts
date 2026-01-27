import type { HospitalStatus } from "../hospitals-page/types";

export const statusVariant: Record<
  HospitalStatus,
  "default" | "secondary" | "destructive"
> = {
  PENDING: "secondary",
  APPROVED: "default",
  REJECTED: "destructive",
};

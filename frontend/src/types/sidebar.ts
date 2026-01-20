import type { LucideIcon } from "lucide-react";

export type SidebarNavItem = {
  label: string;
  path: string;
  icon: LucideIcon;
  disabled?: boolean;
};

export type SidebarNavGroup = {
  group: string;
  items: readonly SidebarNavItem[];
};

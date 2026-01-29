import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatTime(time: string) {
  if (!time) return "";
  // if time is in hh:mm:ss format, return hh:mm
  return time.split(":").slice(0, 2).join(":");
}

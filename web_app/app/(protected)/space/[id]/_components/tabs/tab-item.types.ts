import type React from "react";
import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons/lib";

export type TabItem = {
  value: string;
  label: string;
  description?: string;
  shortLabel?: string;
  icon?: LucideIcon | IconType;
  content: React.ReactNode;
};

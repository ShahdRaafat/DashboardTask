import { LucideIcon } from "lucide-react";
import { ChartNoAxesCombined, Package } from "lucide-react";
export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
  { label: "Overview", href: "/", icon: ChartNoAxesCombined },
  { label: "Orders", href: "/orders", icon: Package },
];

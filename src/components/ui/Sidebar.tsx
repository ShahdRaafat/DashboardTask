"use client";
import { NavItem } from "@/lib/NavItems";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  items: NavItem[];
  onNavigate?: () => void;
}
function Sidebar({ items, onNavigate }: SidebarProps) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-4 px-4 py-16 ">
      {items.map((item) => {
        const isActive = item.href === pathname;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`flex items-center gap-3 px-4 py-2 rounded-md ${isActive ? "bg-primary text-primary-foreground" : "text-muted hover:bg-surface hover:text-foreground"}`}
          >
            <span>
              <item.icon />
            </span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default Sidebar;

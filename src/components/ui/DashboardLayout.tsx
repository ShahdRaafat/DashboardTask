"use client";

import { navItems } from "@/lib/NavItems";
import { MenuIcon, X } from "lucide-react";
import { ReactNode, useState } from "react";
import Button from "./Button";
import Logo from "./Logo";
import Sidebar from "./Sidebar";

function DashboardLayout({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 border-r border-border bg-surface">
        <div className="px-4 pt-16 pb-6 flex items-center justify-center gap-2 border-b border-border">
          <Logo />
        </div>
        <Sidebar items={navItems} />
      </aside>

      {/* Mobile Sidebar */}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-full transform bg-surface border-r border-border transition-transform duration-300  md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-4 py-5 flex items-center justify-center gap-2 border-b border-border">
          <Logo />
        </div>

        <Sidebar items={navItems} onNavigate={() => setIsOpen(false)} />
        <Button
          variant="ghost"
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4"
        >
          <X className="h-5 w-5" />
        </Button>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-border bg-surface px-4 py-3 md:hidden">
          <Button variant="ghost" onClick={() => setIsOpen(true)}>
            <MenuIcon className="h-5 w-5" />
          </Button>
          <span className="text-lg font-semibold">Dashboard</span>
        </header>

        <main className="flex-1 m-12 md:p-6">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;

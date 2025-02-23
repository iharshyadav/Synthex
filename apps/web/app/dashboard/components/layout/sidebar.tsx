"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Trophy,
  History,
  Swords,
  Medal,
  Settings,
  Users,
  Code2,
  Command,
} from "lucide-react";
import { cn } from "@components/lib/utils";

const sidebarItems = [
  {
    title: "My Contests",
    href: "/contests",
    icon: Trophy,
  },
  {
    title: "Contest History",
    href: "/history",
    icon: History,
  },
  {
    title: "Practice Arena",
    href: "/practice",
    icon: Swords,
  },
  {
    title: "Leaderboard",
    href: "/leaderboard",
    icon: Medal,
  },
  {
    title: "Community Hub",
    href: "/community",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 z-50 w-[240px] h-screen dark:bg-[#09090B] bg-white flex flex-col border-r nav-blur">
      <div className="flex h-20 items-center gap-2 border-b px-6 bg-background/95 backdrop-blur-sm">
      <a href="/" className="group relative">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Option 3: Command icon */}
          <div
            className="relative bg-gradient-to-br from-gray-900 to-black p-2 sm:p-2.5 rounded-xl sm:rounded-2xl 
                  ring-1 ring-white/10 group-hover:ring-blue-500/50 transition-all duration-300 shadow-lg shadow-blue-500/20"
          >
            <Command className="w-4 h-4 sm:w-6 sm:h-6 text-blue-400 group-hover:text-blue-300 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
          </div>

          <div className="relative hidden sm:block">
            <h1
              className="text-lg sm:text-lg font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 
                    bg-clip-text text-transparent filter drop-shadow-lg"
            >
              Synthex
            </h1>
          </div>
        </div>
        </a>
      </div>
      <div className="flex-1 overflow-y-auto py-6 px-4 scrollbar-thin scrollbar-thumb-primary/10 hover:scrollbar-thumb-primary/20">
        <nav className="grid gap-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 hover:scale-[1.02]",
                pathname === item.href
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

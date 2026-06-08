"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  FolderKanban,
  Layers3,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-black h-screen p-6">
      <h1 className="text-2xl font-bold mb-10">
        RIPL Admin
      </h1>

      <nav className="space-y-2">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link
          href="/projects"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
        >
          <FolderKanban size={18} />
          Projects
        </Link>

        <Link
          href="/categories"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
        >
          <Layers3 size={18} />
          Categories
        </Link>

        <Link
          href="/settings"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
        >
          <Settings size={18} />
          Settings
        </Link>
      </nav>
    </aside>
  );
}
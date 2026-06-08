"use client";

import AdminLayout from "@/components/AdminLayout";

export default function DashboardPage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Welcome to RIPL Admin
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-white border rounded-2xl p-6">
            <p className="text-gray-500 text-sm">
              Projects
            </p>

            <h2 className="text-3xl font-bold mt-2">
              --
            </h2>
          </div>

          <div className="bg-white border rounded-2xl p-6">
            <p className="text-gray-500 text-sm">
              Categories
            </p>

            <h2 className="text-3xl font-bold mt-2">
              --
            </h2>
          </div>

          <div className="bg-white border rounded-2xl p-6">
            <p className="text-gray-500 text-sm">
              Featured Projects
            </p>

            <h2 className="text-3xl font-bold mt-2">
              --
            </h2>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
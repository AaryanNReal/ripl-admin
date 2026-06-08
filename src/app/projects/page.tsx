"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import AdminLayout from "@/components/AdminLayout";

import {
  getProjects,
  deleteProject,
} from "@/firebase/projects";

import { Project } from "../types/project";

export default function ProjectsPage() {
  const [projects, setProjects] =
    useState<Project[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [deleting, setDeleting] =
    useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data =
          await getProjects();

        setProjects(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const handleDelete = async (
    project: Project
  ) => {
    const confirmed =
      window.confirm(
        `Delete "${project.title}"?`
      );

    if (!confirmed) return;

    try {
      setDeleting(project.id);

      await deleteProject(
        project.id
      );

      setProjects((prev) =>
        prev.filter(
          (p) =>
            p.id !== project.id
        )
      );

      alert(
        "Project deleted successfully"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed to delete project"
      );
    } finally {
      setDeleting(null);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8 text-black">

        {/* HEADER */}

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Projects
            </h1>

            <p className="text-gray-500 mt-1">
              Manage website projects
            </p>
          </div>

          <Link
            href="/projects/new"
            className="
              px-4 py-2
              rounded-lg
              bg-black
              text-white
              hover:bg-neutral-800
              transition-colors
            "
          >
            Add Project
          </Link>
        </div>

        {/* TABLE */}

        <div className="bg-white border rounded-2xl overflow-hidden">

          <table className="w-full">

            <thead>
              <tr className="bg-gray-50 border-b">

                <th className="p-4 text-left">
                  Image
                </th>

                <th className="p-4 text-left">
                  Title
                </th>

                <th className="p-4 text-left">
                  Category
                </th>

                <th className="p-4 text-left">
                  Featured
                </th>

                <th className="p-4 text-left">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="p-10 text-center"
                  >
                    Loading...
                  </td>
                </tr>
              ) : projects.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="p-10 text-center"
                  >
                    No projects found
                  </td>
                </tr>
              ) : (
                projects.map(
                  (project) => (
                    <tr
                      key={project.id}
                      className="
                        border-b
                        hover:bg-gray-50
                      "
                    >

                      <td className="p-4">
                        {project.images?.[0] ? (
                          <img
                            src={
                              project.images[0]
                            }
                            alt={
                              project.title
                            }
                            className="
                              w-16
                              h-16
                              rounded-lg
                              object-cover
                              border
                            "
                          />
                        ) : (
                          <div className="text-gray-400">
                            No Image
                          </div>
                        )}
                      </td>

                      <td className="p-4 font-medium">
                        {project.title}
                      </td>

                      <td className="p-4">
                        {project.category}
                      </td>

                      <td className="p-4">
                        {project.featured
                          ? "⭐ Featured"
                          : "-"}
                      </td>

                      <td className="p-4">
                        <div className="flex gap-4">

                          <Link
                            href={`/projects/edit/${project.id}`}
                            className="
                              text-blue-600
                              hover:text-blue-800
                            "
                          >
                            Edit
                          </Link>

                          <button
                            onClick={() =>
                              handleDelete(
                                project
                              )
                            }
                            disabled={
                              deleting ===
                              project.id
                            }
                            className="
                              text-red-600
                              hover:text-red-800
                              disabled:opacity-50
                            "
                          >
                            {deleting ===
                            project.id
                              ? "Deleting..."
                              : "Delete"}
                          </button>

                        </div>
                      </td>

                    </tr>
                  )
                )
              )}

            </tbody>

          </table>

        </div>
      </div>
    </AdminLayout>
  );
}
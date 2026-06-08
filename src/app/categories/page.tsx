"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import AdminLayout from "@/components/AdminLayout";

import {
  getCategories,
  deleteCategory,
  categoryHasProjects,
} from "@/firebase/categories";

import { Category } from "../types/category";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleDelete = async (
    id: string,
    name: string
  ) => {
    try {
      const hasProjects =
        await categoryHasProjects(id);

      if (hasProjects) {
        alert(
          "Cannot delete category. Projects exist in this category."
        );

        return;
      }

      const confirmed = window.confirm(
        `Delete "${name}"?`
      );

      if (!confirmed) return;

      await deleteCategory(id);

      setCategories((prev) =>
        prev.filter(
          (category) =>
            category.id !== id
        )
      );

      alert(
        "Category deleted successfully"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed to delete category"
      );
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8 text-black">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-black">
              Categories
            </h1>

            <p className="text-gray-500 mt-1">
              Manage website categories
            </p>
          </div>

          <Link
            href="/categories/new"
            className="
              px-4 py-2
              rounded-lg
              bg-black
              text-white
              hover:bg-neutral-800
              transition-colors
            "
          >
            Add Category
          </Link>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">

          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b">

                <th className="p-4 text-left">
                  Image
                </th>

                <th className="p-4 text-left">
                  Name
                </th>

                <th className="p-4 text-left">
                  Tagline
                </th>

                <th className="p-4 text-left">
                  Order
                </th>

                <th className="p-4 text-left">
                  ID
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
                    colSpan={6}
                    className="p-10 text-center text-gray-500"
                  >
                    Loading...
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="p-10 text-center text-gray-500"
                  >
                    No categories found
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr
                    key={category.id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-4">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="
                          w-16
                          h-16
                          rounded-lg
                          object-cover
                          border
                        "
                      />
                    </td>

                    <td className="p-4 font-medium text-black">
                      {category.name}
                    </td>

                    <td className="p-4 text-gray-500">
                      {category.tagline}
                    </td>

                    <td className="p-4 text-black">
                      {category.order}
                    </td>

                    <td className="p-4 text-gray-400">
                      {category.id}
                    </td>

                    <td className="p-4">
                      <div className="flex gap-4">

                        <Link
                          href={`/categories/edit/${category.id}`}
                          className="
                            text-blue-600
                            hover:text-blue-800
                            font-medium
                          "
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() =>
                            handleDelete(
                              category.id,
                              category.name
                            )
                          }
                          className="
                            text-red-600
                            hover:text-red-800
                            font-medium
                          "
                        >
                          Delete
                        </button>

                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>

        </div>
      </div>
    </AdminLayout>
  );
}
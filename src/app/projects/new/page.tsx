"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import AdminLayout from "@/components/AdminLayout";

import { getCategories } from "@/firebase/categories";
import { createProject } from "@/firebase/projects";

import { uploadMultipleToImgBB } from "@/lib/imgbb";

import { Category } from "@/app/types/category";

export default function NewProjectPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [title, setTitle] =
    useState("");

  const [slug, setSlug] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [client, setClient] =
    useState("");

  const [architect, setArchitect] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [area, setArea] =
    useState("");

  const [duration, setDuration] =
    useState("");

  const [value, setValue] =
    useState("");

  const [scope, setScope] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [featured, setFeatured] =
    useState(false);

  const [imageFiles, setImageFiles] =
    useState<File[]>([]);

  const [previews, setPreviews] =
    useState<string[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data =
          await getCategories();

        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadCategories();
  }, []);

  const handleImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(
      e.target.files || []
    );

    setImageFiles(files);

    setPreviews(
      files.map((file) =>
        URL.createObjectURL(file)
      )
    );
  };
  const removeImage = (
  index: number
) => {
  setImageFiles((prev) =>
    prev.filter(
      (_, i) => i !== index
    )
  );

  setPreviews((prev) =>
    prev.filter(
      (_, i) => i !== index
    )
  );
};

  const handleCreateProject =
    async () => {
      try {
        if (!title.trim()) {
          alert(
            "Project title is required"
          );
          return;
        }

        if (!slug.trim()) {
          alert(
            "Slug is required"
          );
          return;
        }

        if (!category) {
          alert(
            "Please select a category"
          );
          return;
        }

        if (
          imageFiles.length === 0
        ) {
          alert(
            "Please select at least one image"
          );
          return;
        }

        setLoading(true);

        const imageUrls =
          await uploadMultipleToImgBB(
            imageFiles
          );

        await createProject({
          title,
          slug,

          category,

          client,
          architect,
          location,

          area,
          duration,
          value,
          scope,

          description,

          featured,

          images: imageUrls,
        });

        alert(
          "Project created successfully"
        );

        router.push("/projects");
      } catch (error) {
        console.error(error);

        alert(
          "Failed to create project"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <AdminLayout>
      <div className="max-w-6xl">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black">
            Create Project
          </h1>

          <p className="text-gray-500 mt-2">
            Add a new project
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">

          <div className="grid md:grid-cols-2 gap-6">

            <input
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              placeholder="Project Title"
              className="border border-gray-300 rounded-lg p-3 text-black"
            />

            <input
              value={slug}
              onChange={(e) =>
                setSlug(
                  e.target.value
                )
              }
              placeholder="Slug"
              className="border border-gray-300 rounded-lg p-3 text-black"
            />

            <select
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
              className="border border-gray-300 rounded-lg p-3 text-black"
            >
              <option value="">
                Select Category
              </option>

              {categories.map(
                (category) => (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                )
              )}
            </select>

            <input
              value={client}
              onChange={(e) =>
                setClient(
                  e.target.value
                )
              }
              placeholder="Client"
              className="border border-gray-300 rounded-lg p-3 text-black"
            />

            <input
              value={architect}
              onChange={(e) =>
                setArchitect(
                  e.target.value
                )
              }
              placeholder="Architect"
              className="border border-gray-300 rounded-lg p-3 text-black"
            />

            <input
              value={location}
              onChange={(e) =>
                setLocation(
                  e.target.value
                )
              }
              placeholder="Location"
              className="border border-gray-300 rounded-lg p-3 text-black"
            />

            <input
              value={area}
              onChange={(e) =>
                setArea(
                  e.target.value
                )
              }
              placeholder="Area"
              className="border border-gray-300 rounded-lg p-3 text-black"
            />

            <input
              value={duration}
              onChange={(e) =>
                setDuration(
                  e.target.value
                )
              }
              placeholder="Duration"
              className="border border-gray-300 rounded-lg p-3 text-black"
            />

            <input
              value={value}
              onChange={(e) =>
                setValue(
                  e.target.value
                )
              }
              placeholder="Value"
              className="border border-gray-300 rounded-lg p-3 text-black"
            />

            <input
              value={scope}
              onChange={(e) =>
                setScope(
                  e.target.value
                )
              }
              placeholder="Scope"
              className="border border-gray-300 rounded-lg p-3 text-black"
            />

          </div>

          <textarea
            rows={6}
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            placeholder="Description"
            className="
              w-full
              mt-6
              border
              border-gray-300
              rounded-lg
              p-3
              text-black
            "
          />

          <div className="mt-6">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) =>
                  setFeatured(
                    e.target.checked
                  )
                }
              />

              <span className="text-black">
                Featured Project
              </span>
            </label>
          </div>

          <div className="mt-6 text-black">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={
                handleImagesChange
              }
            />
          </div>

         {previews.length > 0 && (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

    {previews.map(
      (preview, index) => (
        <div
          key={index}
          className="relative"
        >
          <img
            src={preview}
            alt=""
            className="
              w-full
              h-32
              object-cover
              rounded-lg
              border
            "
          />

          <button
            type="button"
            onClick={() =>
              removeImage(index)
            }
            className="
              absolute
              top-2
              right-2
              w-8
              h-8
              rounded-full
              bg-red-600
              text-white
              text-sm
              hover:bg-red-700
            "
          >
            ×
          </button>
        </div>
      )
    )}

  </div>
)}

          <button
            onClick={
              handleCreateProject
            }
            disabled={loading}
            className="
              w-full
              mt-8
              bg-black
              text-white
              py-3
              rounded-lg
              disabled:opacity-50
            "
          >
            {loading
              ? "Creating Project..."
              : "Create Project"}
          </button>

        </div>

      </div>
    </AdminLayout>
  );
}
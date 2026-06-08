"use client";
import SortableImage from "../../SortableImage";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { uploadMultipleToImgBB } from "@/lib/imgbb";
import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";
import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import {
  getProjects,
  updateProject,
} from "@/firebase/projects";

import {
  getCategories,
} from "@/firebase/categories";

import { Project } from "@/app/types/project";
import { Category } from "@/app/types/category";

export default function EditProjectPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [project, setProject] =
    useState<Project | null>(null);

  const [categories, setCategories] =
    useState<Category[]>([]);
const [newImages, setNewImages] =
  useState<File[]>([]);
const handleDragEnd = (
  event: any
) => {
  if (!project) return;

  const {
    active,
    over,
  } = event;

  if (
    !over ||
    active.id === over.id
  )
    return;

  const oldIndex =
    project.images.indexOf(
      active.id
    );

  const newIndex =
    project.images.indexOf(
      over.id
    );

  setProject({
    ...project,
    images: arrayMove(
      project.images,
      oldIndex,
      newIndex
    ),
  });
};
const [newPreviews, setNewPreviews] =
  useState<string[]>([]);
  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          projects,
          categoryData,
        ] = await Promise.all([
          getProjects(),
          getCategories(),
        ]);

        const currentProject =
          projects.find(
            (p) => p.id === id
          );

        if (!currentProject) {
          alert(
            "Project not found"
          );

          router.push(
            "/projects"
          );

          return;
        }

        setProject(
          currentProject
        );

        setCategories(
          categoryData
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, router]);

const removeExistingImage = (
  index: number
) => {
  if (!project) return;

  setProject({
    ...project,
    images: project.images.filter(
      (_, i) => i !== index
    ),
  });
};

const handleNewImages = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const files = Array.from(
    e.target.files || []
  );

  setNewImages(files);

  setNewPreviews(
    files.map((file) =>
      URL.createObjectURL(file)
    )
  );
};

const removeNewImage = (
  index: number
) => {
  setNewImages((prev) =>
    prev.filter(
      (_, i) => i !== index
    )
  );

  setNewPreviews((prev) =>
    prev.filter(
      (_, i) => i !== index
    )
  );
};



  const handleSave = async () => {
  if (!project) return;

  try {
    setSaving(true);

    let uploadedUrls: string[] =
      [];

    if (newImages.length > 0) {
      uploadedUrls =
        await uploadMultipleToImgBB(
          newImages
        );
    }

    await updateProject(
      project.id,
      {
        ...project,
        images: [
          ...project.images,
          ...uploadedUrls,
        ],
      }
    );

    alert(
      "Project updated successfully"
    );

    router.push("/projects");
  } catch (error) {
    console.error(error);

    alert(
      "Failed to update project"
    );
  } finally {
    setSaving(false);
  }
};

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-black">
          Loading...
        </div>
      </AdminLayout>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <AdminLayout>
      <div className="max-w-6xl">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black">
            Edit Project
          </h1>

          <p className="text-gray-500 mt-2">
            Update project details
          </p>
        </div>

        <div className="bg-white border rounded-2xl p-8">

          <div className="grid md:grid-cols-2 gap-6">

            <input
              value={project.title}
              onChange={(e) =>
                setProject({
                  ...project,
                  title:
                    e.target.value,
                })
              }
              placeholder="Title"
              className="
                border
                rounded-lg
                p-3
                text-black
              "
            />

            <input
              value={project.slug}
              onChange={(e) =>
                setProject({
                  ...project,
                  slug:
                    e.target.value,
                })
              }
              placeholder="Slug"
              className="
                border
                rounded-lg
                p-3
                text-black
              "
            />

            <select
              value={
                project.category
              }
              onChange={(e) =>
                setProject({
                  ...project,
                  category:
                    e.target.value,
                })
              }
              className="
                border
                rounded-lg
                p-3
                text-black
              "
            >
              {categories.map(
                (
                  category
                ) => (
                  <option
                    key={
                      category.id
                    }
                    value={
                      category.id
                    }
                  >
                    {
                      category.name
                    }
                  </option>
                )
              )}
            </select>

            <input
              value={
                project.client
              }
              onChange={(e) =>
                setProject({
                  ...project,
                  client:
                    e.target.value,
                })
              }
              placeholder="Client"
              className="
                border
                rounded-lg
                p-3
                text-black
              "
            />

            <input
              value={
                project.architect
              }
              onChange={(e) =>
                setProject({
                  ...project,
                  architect:
                    e.target.value,
                })
              }
              placeholder="Architect"
              className="
                border
                rounded-lg
                p-3
                text-black
              "
            />

            <input
              value={
                project.location
              }
              onChange={(e) =>
                setProject({
                  ...project,
                  location:
                    e.target.value,
                })
              }
              placeholder="Location"
              className="
                border
                rounded-lg
                p-3
                text-black
              "
            />

            <input
              value={
                project.area
              }
              onChange={(e) =>
                setProject({
                  ...project,
                  area:
                    e.target.value,
                })
              }
              placeholder="Area"
              className="
                border
                rounded-lg
                p-3
                text-black
              "
            />

            <input
              value={
                project.duration
              }
              onChange={(e) =>
                setProject({
                  ...project,
                  duration:
                    e.target.value,
                })
              }
              placeholder="Duration"
              className="
                border
                rounded-lg
                p-3
                text-black
              "
            />

            <input
              value={
                project.value
              }
              onChange={(e) =>
                setProject({
                  ...project,
                  value:
                    e.target.value,
                })
              }
              placeholder="Value"
              className="
                border
                rounded-lg
                p-3
                text-black
              "
            />

            <input
              value={
                project.scope
              }
              onChange={(e) =>
                setProject({
                  ...project,
                  scope:
                    e.target.value,
                })
              }
              placeholder="Scope"
              className="
                border
                rounded-lg
                p-3
                text-black
              "
            />

          </div>

          <textarea
            rows={6}
            value={
              project.description
            }
            onChange={(e) =>
              setProject({
                ...project,
                description:
                  e.target.value,
              })
            }
            className="
              w-full
              mt-6
              border
              rounded-lg
              p-3
              text-black
            "
          />

          <div className="mt-6">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={
                  project.featured
                }
                onChange={(e) =>
                  setProject({
                    ...project,
                    featured:
                      e.target
                        .checked,
                  })
                }
              />

              

              <span className="text-black">
                Featured Project
              </span>
            </label>
          </div>



          <div className="mt-8">

  <h3 className="text-xl font-semibold text-black mb-4">
    Gallery Images
  </h3>

  <DndContext
  collisionDetection={
    closestCenter
  }
  onDragEnd={
    handleDragEnd
  }
>
  <SortableContext
    items={project.images}
    strategy={
      rectSortingStrategy
    }
  >
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {project.images.map(
        (
          image,
          index
        ) => (
          <SortableImage
            key={image}
            image={image}
            index={index}
            onDelete={
              removeExistingImage
            }
          />
        )
      )}
    </div>
  </SortableContext>
</DndContext>
</div>

<div className="mt-8 text-black">

  <label className="block mb-2 text-black">
    Upload New Images
  </label>

  <input
    type="file"
    multiple
    accept="image/*"
    onChange={handleNewImages}
  />

</div>

{newPreviews.length > 0 && (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">

    {newPreviews.map(
      (image, index) => (
        <div
          key={index}
          className="relative"
        >
          <img
            src={image}
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
              removeNewImage(
                index
              )
            }
            className="
              absolute
              top-2
              right-2
              bg-red-600
              text-white
              w-8
              h-8
              rounded-full
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
              handleSave
            }
            disabled={saving}
            className="
              w-full
              mt-8
              bg-black
              text-white
              py-3
              rounded-lg
            "
          >
            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>

        </div>

      </div>
    </AdminLayout>
  );
}
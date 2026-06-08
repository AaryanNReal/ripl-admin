"use client";

import { useState } from "react";

import AdminLayout from "@/components/AdminLayout";

import { createCategory } from "@/firebase/categories";
import { uploadToImgBB } from "@/lib/imgbb";

export default function NewCategoryPage() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [tagline, setTagline] = useState("");
  const [order, setOrder] = useState(1);

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const [preview, setPreview] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImageFile(file);

    setPreview(
      URL.createObjectURL(file)
    );
  };

  const handleSubmit = async () => {
    try {
      if (!name.trim()) {
        alert("Please enter a name");
        return;
      }

      if (!slug.trim()) {
        alert("Please enter a slug");
        return;
      }

      if (!imageFile) {
        alert("Please select an image");
        return;
      }

      setLoading(true);

      const imageUrl =
        await uploadToImgBB(imageFile);

      await createCategory({
        name,
        slug,
        tagline,
        order,
        image: imageUrl,
      });

      alert("Category Created");

      setName("");
      setSlug("");
      setTagline("");
      setOrder(1);

      setImageFile(null);
      setPreview("");
    } catch (error) {
      console.error(error);

      alert(
        "Error creating category"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black">
            Create Category
          </h1>

          <p className="text-gray-500 mt-2">
            Add a new category
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <div className="space-y-6">

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Healthcare"
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-lg
                  p-3
                  text-black
                "
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Slug
              </label>

              <input
                type="text"
                value={slug}
                onChange={(e) =>
                  setSlug(e.target.value)
                }
                placeholder="healthcare"
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-lg
                  p-3
                  text-black
                "
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Tagline
              </label>

              <input
                type="text"
                value={tagline}
                onChange={(e) =>
                  setTagline(e.target.value)
                }
                placeholder="Healing Environments"
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-lg
                  p-3
                  text-black
                "
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Display Order
              </label>

              <input
                type="number"
                value={order}
                onChange={(e) =>
                  setOrder(
                    Number(e.target.value)
                  )
                }
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-lg
                  p-3
                  text-black
                "
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Category Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={
                  handleImageChange
                }
              />
            </div>

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="
                  w-full
                  h-64
                  object-cover
                  rounded-xl
                  border
                "
              />
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="
                w-full
                bg-black
                text-white
                py-3
                rounded-lg
                disabled:opacity-50
              "
            >
              {loading
                ? "Creating..."
                : "Create Category"}
            </button>

          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
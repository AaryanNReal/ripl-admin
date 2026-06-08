"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import AdminLayout from "@/components/AdminLayout";

import {
  getCategories,
  updateCategory,
} from "@/firebase/categories";

import { uploadToImgBB } from "@/lib/imgbb";

export default function EditCategoryPage() {
  const params = useParams();

  const id = params.id as string;

  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [order, setOrder] = useState(1);

  const [image, setImage] = useState("");

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    const loadCategory = async () => {
      const categories =
        await getCategories();

      const category =
        categories.find(
          (c) => c.id === id
        );

      if (!category) return;

      setName(category.name);
      setTagline(category.tagline);
      setOrder(category.order);
      setImage(category.image);
    };

    loadCategory();
  }, [id]);

  const handleSave = async () => {
    try {
      setLoading(true);

      let imageUrl = image;

      if (imageFile) {
        imageUrl =
          await uploadToImgBB(
            imageFile
          );
      }

      await updateCategory(id, {
        name,
        tagline,
        order,
        image: imageUrl,
      });

      alert("Category Updated");
    } catch (error) {
      console.error(error);
      alert("Update Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl text-black">

        <h1 className="text-3xl font-bold mb-8">
          Edit Category
        </h1>

        <div className="bg-white border rounded-2xl p-8 space-y-6">

          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Name"
            className="
              w-full
              border
              rounded-lg
              p-3
            "
          />

          <input
            value={tagline}
            onChange={(e) =>
              setTagline(e.target.value)
            }
            placeholder="Tagline"
            className="
              w-full
              border
              rounded-lg
              p-3
            "
          />

          <input
            type="number"
            value={order}
            onChange={(e) =>
              setOrder(
                Number(
                  e.target.value
                )
              )
            }
            className="
              w-full
              border
              rounded-lg
              p-3
            "
          />

          {image && (
            <img
              src={image}
              alt=""
              className="
                w-full
                h-64
                object-cover
                rounded-xl
              "
            />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImageFile(
                e.target.files?.[0] ||
                  null
              )
            }
          />

          <button
            onClick={handleSave}
            disabled={loading}
            className="
              w-full
              bg-black
              text-white
              py-3
              rounded-lg
            "
          >
            {loading
              ? "Saving..."
              : "Save Changes"}
          </button>

        </div>
      </div>
    </AdminLayout>
  );
}
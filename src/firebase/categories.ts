import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "./config";

import { Category } from "@/app/types/category";

export const getCategories = async (): Promise<Category[]> => {
  const snapshot = await getDocs(
    collection(db, "categories")
  );

  const categories = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Category[];

  return categories.sort(
    (a, b) => a.order - b.order
  );
};

export const createCategory = async (
  data: {
    name: string;
    slug: string;
    tagline: string;
    order: number;
    image: string;
  }
) => {
  await setDoc(
    doc(db, "categories", data.slug),
    {
      name: data.name,
      tagline: data.tagline,
      order: data.order,
      image: data.image,
    }
  );
};

export const updateCategory = async (
  id: string,
  data: {
    name: string;
    tagline: string;
    order: number;
    image: string;
  }
) => {
  await updateDoc(
    doc(db, "categories", id),
    data
  );
};

export const deleteCategory = async (
  id: string
) => {
  await deleteDoc(
    doc(db, "categories", id)
  );
};

export const categoryHasProjects =
  async (
    categoryId: string
  ) => {
    const snapshot =
      await getDocs(
        collection(db, "projects")
      );

    const projects =
      snapshot.docs.filter(
        (doc) =>
          doc.data().category ===
          categoryId
      );

    return projects.length > 0;
  };
import {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "./config";

import { Project } from "@/app/types/project";

/* =========================
   GET ALL PROJECTS
========================= */

export const getProjects = async (): Promise<Project[]> => {
  const snapshot = await getDocs(
    collection(db, "projects")
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Project[];
};

/* =========================
   GET SINGLE PROJECT
========================= */

export const getProjectById = async (
  id: string
): Promise<Project | null> => {
  const projects =
    await getProjects();

  return (
    projects.find(
      (project) =>
        project.id === id
    ) || null
  );
};

/* =========================
   CREATE PROJECT
========================= */

export const createProject = async (
  data: Omit<Project, "id">
) => {
  await setDoc(
    doc(db, "projects", data.slug),
    data
  );
};

/* =========================
   UPDATE PROJECT
========================= */

export const updateProject = async (
  id: string,
  data: Partial<Project>
) => {
  await updateDoc(
    doc(db, "projects", id),
    data
  );
};

/* =========================
   DELETE PROJECT
========================= */

export const deleteProject = async (
  id: string
) => {
  await deleteDoc(
    doc(db, "projects", id)
  );
};
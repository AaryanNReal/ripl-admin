import axios from "axios";
import imageCompression from "browser-image-compression";

import { convertToWebP } from "./image";

/* =========================
   SINGLE IMAGE UPLOAD
========================= */

export const uploadToImgBB = async (
  file: File
): Promise<string> => {
  try {
    const compressedFile = await imageCompression(
      file,
      {
        maxSizeMB: 0.4,
        maxWidthOrHeight: 1600,
        useWebWorker: true,
        fileType: "image/webp",
      }
    );

    const formData = new FormData();

    formData.append(
      "image",
      compressedFile
    );

    const apiKey =
      process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    console.log(
      "IMGBB API KEY:",
      apiKey
    );

    if (!apiKey) {
      throw new Error(
        "NEXT_PUBLIC_IMGBB_API_KEY is undefined"
      );
    }

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      formData
    );

    console.log(
      "ImgBB Upload Success:",
      response.data
    );

    return response.data.data.url;
  } catch (error) {
    console.error(
      "ImgBB Upload Error:",
      error
    );
    throw error;
  }
};

/* =========================
   MULTIPLE IMAGE UPLOAD
========================= */

export const uploadMultipleToImgBB =
  async (
    files: File[]
  ): Promise<string[]> => {
    const urls: string[] = [];

    for (const file of files) {
      try {
        const webpFile =
          await convertToWebP(file);

        const url =
          await uploadToImgBB(
            webpFile
          );

        urls.push(url);
      } catch (error) {
        console.error(
          "Image upload failed:",
          error
        );
      }
    }

    return urls;
  };
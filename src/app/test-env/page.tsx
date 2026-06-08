"use client";

import { useState } from "react";

import { uploadToImgBB } from "@/lib/imgbb";

export default function TestUploadPage() {
  const [url, setUrl] = useState("");

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl =
      await uploadToImgBB(file);

    setUrl(imageUrl);
  };

  return (
    <div className="p-10 bg-white space-y-6">
      <input
        type="file"
        onChange={handleUpload}
      />

      {url && (
        <>
          <p>{url}</p>

          <img
            src={url}
            alt=""
            className="w-96 rounded-lg"
          />
        </>
      )}
    </div>
  );
}
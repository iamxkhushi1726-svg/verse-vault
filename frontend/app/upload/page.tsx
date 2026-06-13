"use client";

import { useState } from "react";
import api from "@/lib/api";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);

  const uploadSong = async () => {
    if (!file) return;

    const formData = new FormData();

    formData.append(
      "file",
      file
    );

    try {
      const response = await api.post(
        "/api/ai/detect",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        AI Upload
      </h1>

      <input
        type="file"
        accept=".mp3"
        onChange={(e) =>
          setFile(
            e.target.files?.[0] || null
          )
        }
      />

      <button
        onClick={uploadSong}
        className="border px-4 py-2 ml-4"
      >
        Analyze
      </button>

      {result && (
        <div className="mt-6">
          <h2 className="font-bold">
            Highlights
          </h2>

          <pre>
            {JSON.stringify(
              result,
              null,
              2
            )}
          </pre>
        </div>
      )}
    </main>
  );
}
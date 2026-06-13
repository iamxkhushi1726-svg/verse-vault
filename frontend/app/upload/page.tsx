"use client";

import { useState } from "react";
import api from "@/lib/api";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);

  const uploadSong = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post(
        "/api/ai/detect",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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
          setFile(e.target.files?.[0] || null)
        }
      />

      <button
        onClick={uploadSong}
        className="border px-4 py-2 ml-4"
      >
        Analyze
      </button>

      {result?.highlights && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">
            Detected Highlights
          </h2>

          {result.highlights.map(
            (time: number, index: number) => (
              <div
                key={index}
                className="border p-3 mb-2 rounded"
              >
                <div>
                  <strong>
                    Highlight #{index + 1}
                  </strong>
                </div>

                <div>
                  Time: {time}s
                </div>
              </div>
            )
          )}
        </div>
      )}
    </main>
  );
}
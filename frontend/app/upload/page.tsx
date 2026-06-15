"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import api from "@/lib/api";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const uploadSong = async () => {
    if (!file) {
      alert("Please select an MP3 file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <main className="p-10">
        <h1 className="text-4xl font-bold mb-6">
          AI Upload
        </h1>

        <p className="mb-6">
          Upload an MP3 file and detect song
          highlights using AI.
        </p>

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
          disabled={loading}
          className="border px-4 py-2 ml-4 rounded"
        >
          {loading
            ? "Analyzing..."
            : "Analyze"}
        </button>

        {result?.highlights && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">
              Detected Highlights
            </h2>

            <div className="space-y-2">
              {result.highlights.map(
                (
                  time: number,
                  index: number
                ) => (
                  <div
                    key={index}
                    className="border p-3 rounded"
                  >
                    <strong>
                      Highlight #
                      {index + 1}
                    </strong>

                    <div>
                      Time: {time}s
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </main>
    </ProtectedRoute>
  );
}
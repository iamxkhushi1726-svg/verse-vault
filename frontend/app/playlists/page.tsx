"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import api from "@/lib/api";

interface Playlist {
  id: number;
  name: string;
  description: string;
}

export default function PlaylistsPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    try {
      const response = await api.get("/api/playlists");
      setPlaylists(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createPlaylist = async () => {
    try {
      await api.post("/api/playlists", {
        name,
        description,
      });

      setName("");
      setDescription("");

      fetchPlaylists();
    } catch (error) {
      console.error(error);
      alert("Failed to create playlist");
    }
  };

  return (
    <ProtectedRoute>
      <main className="p-10">
        <h1 className="text-4xl font-bold mb-6">
          Playlists
        </h1>

        <div className="mb-8">
          <input
            className="border p-2 mr-2"
            placeholder="Playlist Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="border p-2 mr-2"
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />

          <button
            onClick={createPlaylist}
            className="border px-4 py-2 rounded"
          >
            Create Playlist
          </button>
        </div>

        {loading && <p>Loading...</p>}

        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className="border p-4 mb-4 rounded"
          >
            <h2 className="font-bold">
              {playlist.name}
            </h2>

            <p>{playlist.description}</p>
          </div>
        ))}
      </main>
    </ProtectedRoute>
  );
}
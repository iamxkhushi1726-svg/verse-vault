"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

interface Playlist {
  id: number;
  name: string;
  description: string;
}

export default function PlaylistsPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    try {
      const response = await api.get(
        "/api/playlists"
      );

      setPlaylists(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Playlists
      </h1>

      {playlists.map((playlist) => (
        <div
          key={playlist.id}
          className="border p-4 mb-4 rounded"
        >
          <h2 className="font-bold">
            {playlist.name}
          </h2>

          <p>
            {playlist.description}
          </p>
        </div>
      ))}
    </main>
  );
}
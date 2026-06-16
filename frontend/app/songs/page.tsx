"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import api from "@/lib/api";

interface Song {
  id: number;
  title: string;
  artist: string;
  genre: string;
}

export default function SongsPage() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await api.get(
        "/api/songs"
      );

      setSongs(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <main className="p-10">
        <h1 className="text-4xl font-bold mb-6">
          Songs
        </h1>

        {loading && (
          <p>Loading songs...</p>
        )}

        {!loading &&
          songs.length === 0 && (
            <p>
              No songs available.
            </p>
          )}

        {songs.map((song) => (
          <div
            key={song.id}
            className="border p-4 rounded mb-4"
          >
            <h2 className="text-xl font-bold">
              {song.title}
            </h2>

            <p>
              Artist: {song.artist}
            </p>

            <p>
              Genre: {song.genre}
            </p>
          </div>
        ))}
      </main>
    </ProtectedRoute>
  );
}
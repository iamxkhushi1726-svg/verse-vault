"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: number;
}

export default function SongsPage() {
  const [songs, setSongs] = useState<Song[]>([]);

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
    }
  };

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Songs
      </h1>

      {songs.map((song) => (
        <div
          key={song.id}
          className="border p-4 mb-4 rounded"
        >
          <h2 className="font-bold">
            {song.title}
          </h2>

          <p>{song.artist}</p>

          <p>{song.album}</p>

          <p>
            Duration: {song.duration}
          </p>
        </div>
      ))}
    </main>
  );
}
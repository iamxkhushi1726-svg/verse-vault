"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import api from "@/lib/api";

export default function PlaylistSongsPage() {
  const [playlists, setPlaylists] =
    useState<any[]>([]);

  const [songs, setSongs] =
    useState<any[]>([]);

  const [playlistId, setPlaylistId] =
    useState("");

  const [songId, setSongId] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const playlistResponse =
        await api.get("/api/playlists");

      const songResponse =
        await api.get("/api/songs");

      setPlaylists(
        playlistResponse.data
      );

      setSongs(
        songResponse.data
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addSong = async () => {
    if (!playlistId || !songId) {
      alert(
        "Select playlist and song"
      );
      return;
    }

    try {
      await api.post(
        "/api/playlist-songs",
        {
          playlist_id:
            Number(playlistId),

          song_id:
            Number(songId),
        }
      );

      alert(
        "Song added successfully!"
      );
    } catch (error) {
      console.error(error);
      alert(
        "Failed to add song"
      );
    }
  };

  return (
    <ProtectedRoute>
      <main className="p-10">
        <h1 className="text-4xl font-bold mb-6">
          Playlist Songs
        </h1>

        {loading && (
          <p>Loading...</p>
        )}

        {!loading && (
          <>
            <div className="mb-4">
              <select
                className="border p-2 mr-2"
                value={playlistId}
                onChange={(e) =>
                  setPlaylistId(
                    e.target.value
                  )
                }
              >
                <option value="">
                  Select Playlist
                </option>

                {playlists.map(
                  (playlist) => (
                    <option
                      key={playlist.id}
                      value={
                        playlist.id
                      }
                    >
                      {playlist.name}
                    </option>
                  )
                )}
              </select>

              <select
                className="border p-2 mr-2"
                value={songId}
                onChange={(e) =>
                  setSongId(
                    e.target.value
                  )
                }
              >
                <option value="">
                  Select Song
                </option>

                {songs.map((song) => (
                  <option
                    key={song.id}
                    value={song.id}
                  >
                    {song.title}
                  </option>
                ))}
              </select>

              <button
                onClick={addSong}
                className="border px-4 py-2 rounded"
              >
                Add Song
              </button>
            </div>
          </>
        )}
      </main>
    </ProtectedRoute>
  );
}
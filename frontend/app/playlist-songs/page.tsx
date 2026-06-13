"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function PlaylistSongsPage() {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [songs, setSongs] = useState<any[]>([]);

  const [playlistId, setPlaylistId] =
    useState("");

  const [songId, setSongId] =
    useState("");

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
    }
  };

  const addSong = async () => {
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
        "Song added to playlist!"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed to add song"
      );
    }
  };

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Add Song To Playlist
      </h1>

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

        {playlists.map((playlist) => (
          <option
            key={playlist.id}
            value={playlist.id}
          >
            {playlist.name}
          </option>
        ))}
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
        className="border px-4 py-2"
      >
        Add Song
      </button>
    </main>
  );
}
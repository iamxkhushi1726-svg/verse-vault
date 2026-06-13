"use client";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <main className="p-10">
        <h1 className="text-4xl font-bold">
          Verse Vault Dashboard
        </h1>

        <div className="mt-6 space-y-4">
          <a href="/songs">Songs</a>
          <a href="/playlists">Playlists</a>
          <a href="/playlist-songs">Playlist Songs</a>
          <a href="/upload">AI Upload</a>
          <a href="/profile">Profile</a>
        </div>
      </main>
    </ProtectedRoute>
  );
}
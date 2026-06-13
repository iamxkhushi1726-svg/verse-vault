"use client";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <main className="p-10">
        <h1 className="text-5xl font-bold mb-10">
          Verse Vault Dashboard
        </h1>

        <div className="grid gap-4 md:grid-cols-2">
          <a
            href="/songs"
            className="border rounded p-6 hover:bg-gray-900"
          >
            <h2 className="text-xl font-bold">
              Songs
            </h2>
            <p>Manage your songs</p>
          </a>

          <a
            href="/playlists"
            className="border rounded p-6 hover:bg-gray-900"
          >
            <h2 className="text-xl font-bold">
              Playlists
            </h2>
            <p>Create and manage playlists</p>
          </a>

          <a
            href="/playlist-songs"
            className="border rounded p-6 hover:bg-gray-900"
          >
            <h2 className="text-xl font-bold">
              Playlist Songs
            </h2>
            <p>Add songs to playlists</p>
          </a>

          <a
            href="/upload"
            className="border rounded p-6 hover:bg-gray-900"
          >
            <h2 className="text-xl font-bold">
              AI Upload
            </h2>
            <p>Analyze MP3 highlights</p>
          </a>

          <a
            href="/profile"
            className="border rounded p-6 hover:bg-gray-900"
          >
            <h2 className="text-xl font-bold">
              Profile
            </h2>
            <p>View account details</p>
          </a>
        </div>
      </main>
    </ProtectedRoute>
  );
}
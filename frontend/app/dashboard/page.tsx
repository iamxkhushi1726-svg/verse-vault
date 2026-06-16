"use client";

import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <main className="p-10">
        <h1 className="text-5xl font-bold mb-10">
          Verse Vault Dashboard
        </h1>

<div className="grid gap-4 md:grid-cols-2 mt-10">
  <Link
    href="/songs"
    className="border rounded p-6 hover:bg-gray-900"
  >
    <h2 className="text-xl font-bold">
      Songs
    </h2>
    <p>Manage your songs</p>
  </Link>

  <Link
    href="/playlists"
    className="border rounded p-6 hover:bg-gray-900"
  >
    <h2 className="text-xl font-bold">
      Playlists
    </h2>
    <p>Create and manage playlists</p>
  </Link>

  <Link
    href="/playlist-songs"
    className="border rounded p-6 hover:bg-gray-900"
  >
    <h2 className="text-xl font-bold">
      Playlist Songs
    </h2>
    <p>Add songs to playlists</p>
  </Link>

  <Link
    href="/upload"
    className="border rounded p-6 hover:bg-gray-900"
  >
    <h2 className="text-xl font-bold">
      AI Upload
    </h2>
    <p>Analyze MP3 highlights</p>
  </Link>

  <Link
    href="/profile"
    className="border rounded p-6 hover:bg-gray-900"
  >
    <h2 className="text-xl font-bold">
      Profile
    </h2>
    <p>View account details</p>
  </Link>
</div>
      </main>
    </ProtectedRoute>
  );
}
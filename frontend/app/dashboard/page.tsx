"use client";

export default function Dashboard() {
  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold">
        Verse Vault Dashboard
      </h1>

      <div className="mt-6 space-y-4">
        <a
          href="/songs"
          className="block border p-4"
        >
          Songs
        </a>

        <a
          href="/playlists"
          className="block border p-4"
        >
          Playlists
        </a>

        <a
          href="/upload"
          className="block border p-4"
        >
          AI Upload
        </a>
        <a
          href="/playlist-songs"
          className="block border p-4"
        >
          Playlist Songs
        </a>
      </div>
    </main>
  );
}
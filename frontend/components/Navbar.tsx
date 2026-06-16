"use client";

import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
export default function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="flex items-center justify-between border-b p-4">
  <div className="text-2xl font-bold">
    Verse Vault
  </div>
  
  <div className="flex items-center gap-4">
    <Link href="/dashboard">Dashboard</Link>
    <Link href="/songs">Songs</Link>
    <Link href="/playlists">Playlists</Link>
    <Link href="/playlist-songs">Playlist Songs</Link>
    <Link href="/upload">AI Upload</Link>
    <Link href="/profile">Profile</Link>

    <button
      onClick={logout}
      className="border px-4 py-2 rounded"
    >
      Logout
    </button>
  </div>
</nav>
  );
}
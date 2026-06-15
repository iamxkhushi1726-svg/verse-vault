"use client";

export default function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="border-b px-6 py-4 flex items-center">
      <h1 className="text-xl font-bold mr-8">
        Verse Vault
      </h1>

      <div className="flex gap-6">
        <a href="/dashboard">Dashboard</a>
        <a href="/songs">Songs</a>
        <a href="/playlists">Playlists</a>
        <a href="/playlist-songs">Playlist Songs</a>
        <a href="/upload">AI Upload</a>
        <a href="/profile">Profile</a>
      </div>

      <button
        onClick={logout}
        className="ml-auto border px-4 py-2 rounded"
      >
        Logout
      </button>
    </nav>
  );
}
"use client";

export default function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="border-b p-4 flex gap-6">
      <a href="/dashboard">Dashboard</a>
      <a href="/songs">Songs</a>
      <a href="/playlists">Playlists</a>
      <a href="/playlist-songs">Playlist Songs</a>
      <a href="/upload">AI Upload</a>
      <a href="/profile">Profile</a>

      <button
        onClick={logout}
        className="ml-auto border px-3 py-1 rounded"
      >
        Logout
      </button>
    </nav>
  );
}
export default function Navbar() {
  return (
    <nav className="border-b p-4 flex gap-6">
      <a href="/dashboard">Dashboard</a>
      <a href="/songs">Songs</a>
      <a href="/playlists">Playlists</a>
      <a href="/upload">AI Upload</a>
      <a href="/profile">Profile</a>
    </nav>
  );
}

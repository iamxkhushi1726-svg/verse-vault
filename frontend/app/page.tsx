export default function Home() {
  return (
    <main className="p-10">
      <h1 className="text-5xl font-bold">
        Verse Vault
      </h1>

      <p className="mt-4 text-lg">
        AI-Powered Music Highlight Detection
      </p>

      <div className="mt-8 space-y-4">
        <a
          href="/login"
          className="block border p-4 rounded"
        >
          Login
        </a>

        <a
          href="/dashboard"
          className="block border p-4 rounded"
        >
          Dashboard
        </a>

        <a
          href="/songs"
          className="block border p-4 rounded"
        >
          Songs
        </a>
      </div>
    </main>
  );
}
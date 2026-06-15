export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold mb-6">
        Verse Vault
      </h1>

      <p className="text-xl mb-8">
        AI-Powered Music Highlight Detection
      </p>

      <a
        href="/login"
        className="border px-6 py-3 rounded"
      >
        Get Started
      </a>
    </main>
  );
}
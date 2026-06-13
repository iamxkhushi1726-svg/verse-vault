"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const response = await api.post(
        "/api/auth/login",
        {
          username,
          password,
        }
      );

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <main className="p-10 max-w-md mx-auto">
      <h1 className="text-4xl font-bold mb-6">
        Verse Vault Login
      </h1>

      <input
        className="border p-2 w-full mb-4"
        placeholder="Username"
        value={username}
        onChange={(e) =>
          setUsername(e.target.value)
        }
      />

      <input
        type="password"
        className="border p-2 w-full mb-4"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button
        onClick={login}
        className="border px-4 py-2 rounded"
      >
        Login
      </button>
    </main>
  );
}
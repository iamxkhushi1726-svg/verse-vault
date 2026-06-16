"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import api from "@/lib/api";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response = await api.get(
        "/api/profile/me",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProtectedRoute>
      <main className="p-10">
        <h1 className="text-4xl font-bold mb-6">
          Profile
        </h1>

        {!user && <p>Loading...</p>}

        {user && (
          <div className="border p-4 rounded">
            <p>
              <strong>ID:</strong>{" "}
              {user.id}
            </p>

            <p>
              <strong>Username:</strong>{" "}
              {user.username}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {user.email}
            </p>
          </div>
        )}
      </main>
    </ProtectedRoute>
  );
}
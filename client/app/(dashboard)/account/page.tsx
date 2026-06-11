"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchUser() {
    try {
      const response = await apiFetch("/api/user");
      const data = await response.json();

      setUser(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUser();
  }, []);

  if (loading) {
    return <p>Loading account...</p>;
  }

  if (!user) {
    return <p>Unable to load account.</p>;
  }

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Account</h1>
        <p className="text-gray-500">Your account information.</p>
      </div>

      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">Name</p>
        <h2 className="mb-4 text-xl font-semibold">{user.name}</h2>

        <p className="text-sm text-gray-500">Email</p>
        <p>{user.email}</p>
      </section>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  async function handleLogout() {
    try {
      await apiFetch("/api/logout", {
        method: "POST",
      });
    } finally {
      localStorage.removeItem("token");
      router.replace("/login");
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCheckingAuth(false);
  }, [router]);

  if (checkingAuth) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r border-gray-200 bg-white p-6">
        <h1 className="mb-8 text-xl font-bold text-blue-900">Invoicer</h1>

        <nav className="space-y-2">
          <Link
            href="/dashboard"
            className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
          >
            Dashboard
          </Link>

          <Link
            href="/invoices"
            className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
          >
            Invoices
          </Link>

          <Link
            href="/clients"
            className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
          >
            Clients
          </Link>

          <Link
            href="/account"
            className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
          >
            Account
          </Link>

          <button
            type="button"
            className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>
      </aside>

      <div className="flex-1">
        <header className="border-b border-gray-200 bg-white px-8 py-4">
          <p className="text-sm text-gray-500">Full-stack invoice system</p>
        </header>

        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}

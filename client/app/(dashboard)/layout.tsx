"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { Home, Users, FileText, LogOut, User } from "lucide-react";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [accountOpen, setAccountOpen] = useState(false);

  const pathname = usePathname();
  const accountMenuRef = useRef<HTMLDivElement>(null);

  const [user, setUser] = useState<{
    name: string;
    email: string;
  } | null>(null);

  const router = useRouter();

  const initials =
    user?.name
      ?.split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() ?? "";

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

    async function loadUser() {
      try {
        const response = await apiFetch("/api/user");
        const userData = await response.json();

        setUser(userData);
        setCheckingAuth(false);
      } catch {
        localStorage.removeItem("token");
        router.replace("/login");
      }
    }

    loadUser();
  }, [router]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target as Node)
      ) {
        setAccountOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (checkingAuth) {
    return null;
  }

  return (
    <div className="flex min-h-screen ">
      <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r border-gray-200 bg-white">
        <div className="p-6">
          <h1 className="text-xl font-bold text-blue-900">Invoicer</h1>
        </div>

        <nav className="flex-1 px-3">
          <Link
            href="/dashboard"
            className={`flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium text-slate-600 transition-colors ${
              pathname === "/dashboard"
                ? "bg-slate-100 text-slate-900"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <Home size={18} />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/invoices"
            className={`flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium text-slate-600 transition-colors ${
              pathname === "/invoices"
                ? "bg-slate-100 text-slate-900"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <FileText size={18} />
            <span>Invoices</span>
          </Link>

          <Link
            href="/clients"
            className={`flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium text-slate-600 transition-colors ${
              pathname === "/clients"
                ? "bg-slate-100 text-slate-900"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <Users size={18} />
            <span>Clients</span>
          </Link>
        </nav>

        <div ref={accountMenuRef} className="relative mt-auto border-t border-slate-200 p-3">
          {accountOpen && (
            <div className="absolute bottom-full left-2 right-2 mb-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
              <div className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                  {initials}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-900">
                    {user?.name}
                  </p>

                  <p className="truncate text-xs text-slate-500">
                    {user?.email}
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-100">
                <Link
                  href="/account"
                  className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <User size={16} />
                  <span>View Profile</span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => setAccountOpen(!accountOpen)}
            className="flex w-full items-center gap-3 rounded-xl p-2 transition-colors hover:bg-slate-100"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
              {initials}
            </div>

            <div className="min-w-0 flex-1 text-left">
              <p className="truncate text-sm font-medium text-slate-900">
                {user?.name}
              </p>

              <p className="truncate text-xs text-slate-500">{user?.email}</p>
            </div>
          </button>
        </div>
      </aside>

      <div className="flex-1">
        <main className="mx-auto max-w-7xl p-8">{children}</main>
      </div>
    </div>
  );
}

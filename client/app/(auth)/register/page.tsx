"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [formError, setFormError] = useState("");

  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setFormError("");

    const validationErrors = {
      name: "",
      email: "",
      password: "",
    };

    if (!name.trim()) {
      validationErrors.name = "Name is required.";
    }

    if (!email.trim()) {
      validationErrors.email = "Email is required.";
    }

    if (!password.trim()) {
      validationErrors.password = "Password is required.";
    }

    if (
      validationErrors.name ||
      validationErrors.email ||
      validationErrors.password
    ) {
      setFieldErrors(validationErrors);
      return;
    }

    setFieldErrors(validationErrors);

    try {
      const response = await apiFetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      localStorage.setItem("token", data.token);

      router.replace("/invoices");
    } catch (error) {
      if (error instanceof Error) {
        setFormError(error.message);
      } else {
        setFormError("Registration failed. Please try again.");
      }
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.replace("/invoices");
    }
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-center text-2xl font-bold text-blue-900">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {formError && (
            <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {formError}
            </div>
          )}

          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              Name
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full rounded-md border px-3 py-2 ${
                fieldErrors.name
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              }`}
            />

            {fieldErrors.name && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full rounded-md border px-3 py-2 ${
                fieldErrors.email
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              }`}
            />

            {fieldErrors.email && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full rounded-md border px-3 py-2 ${
                fieldErrors.password
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              }`}
            />

            {fieldErrors.password && (
              <p className="mt-1 text-sm text-red-600">
                {fieldErrors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-900 px-4 py-2 text-white"
          >
            Register
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/login" className="text-sm text-blue-600 hover:underline">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </main>
  );
}

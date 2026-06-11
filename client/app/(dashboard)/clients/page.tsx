"use client";

import { useState, useEffect } from "react";
import { Client, ToastState } from "@/types/invoice";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

import Toast from "@/components/ui/Toast";
import ConfirmModal from "@/components/ui/ConfirmModal";

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  const [toast, setToast] = useState<ToastState>({
    message: "",
    type: "success",
  });

  const [clientToDelete, setClientToDelete] = useState<number | null>(null);

  async function fetchClients() {
    try {
      if (!token) return;

      setLoading(true);

      const response = await apiFetch("/api/clients");

      const data = await response.json();

      setClients(data);
    } catch (error) {
      setError("Something went wrong while loading clients.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const url = editingId ? `/api/clients/${editingId}` : "/api/clients";

    const method = editingId ? "PUT" : "POST";

    try {
      setError("");
      setSubmitting(true);

      const response = await apiFetch(url, {
        method,
        body: JSON.stringify(form),
      });

      const savedClient = await response.json();

      if (editingId) {
        setClients((prev) =>
          prev.map((client) =>
            client.id === editingId ? savedClient : client,
          ),
        );
      } else {
        setClients((prev) => [...prev, savedClient]);
      }

      resetForm();

      setToast({
        message: editingId
          ? "Client updated successfully."
          : "Client created successfully.",
        type: "success",
      });
    } catch (error) {
      setError("Something went wrong while saving the client.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleEdit(client: Client) {
    setEditingId(client.id);

    setForm({
      name: client.name,
      email: client.email,
      phone: client.phone ?? "",
      address: client.address ?? "",
    });
  }

  function handleDelete(id: number) {
    setClientToDelete(id);
  }

  async function confirmDeleteClient() {
    if (!clientToDelete) return;

    try {
      await apiFetch(`/api/clients/${clientToDelete}`, {
        method: "DELETE",
      });

      setClients((prev) =>
        prev.filter((client) => client.id !== clientToDelete),
      );

      setToast({
        message: "Client deleted successfully.",
        type: "success",
      });
    } catch (error) {
      setToast({
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong while deleting the client.",
        type: "error",
      });
    } finally {
      setClientToDelete(null);
    }
  }

  function resetForm() {
    setEditingId(null);

    setForm({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      router.push("/login");
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToken(storedToken);
  }, [router]);

  useEffect(() => {
    if (token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchClients();
    }
  }, [token]);

  useEffect(() => {
    if (!toast.message) return;

    const timer = setTimeout(() => {
      setToast((prev) => ({
        ...prev,
        message: "",
      }));
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast.message]);

  return (
    <main className="space-y-8">
      <Toast message={toast.message} type={toast.type} />

      <ConfirmModal
        open={clientToDelete !== null}
        title="Delete client?"
        message="This action cannot be undone."
        onCancel={() => setClientToDelete(null)}
        onConfirm={confirmDeleteClient}
      />

      <section>
        <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
        <p className="text-gray-500">
          Manage client records used for invoice creation.
        </p>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border bg-white p-6 shadow-sm space-y-4"
        >
          <input
            placeholder="Name"
            value={form.name}
            className="rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Email"
            value={form.email}
            className="rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            placeholder="Phone"
            value={form.phone}
            className="rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <input
            placeholder="Address"
            value={form.address}
            className="rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />

          <button type="submit" disabled={submitting}>
            {submitting
              ? "Saving..."
              : editingId
                ? "Update Client"
                : "Create Client"}
          </button>
        </form>

        {loading && <p className="text-gray-500">Loading clients...</p>}

        {error && <p className="text-red-600">{error}</p>}

        {!loading && clients.length === 0 && (
          <p className="text-gray-500">No clients found.</p>
        )}

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {clients.map((client) => (
            <div
              key={client.id}
              className="rounded-xl border bg-white p-5 shadow-sm space-y-3"
            >
              <h2>{client.name}</h2>
              <p>{client.email}</p>
              <p>{client.phone}</p>
              <p>{client.address}</p>
              <button
                onClick={() => handleDelete(client.id)}
                className="rounded-lg bg-red-100 px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-200"
              >
                Delete
              </button>
              <button
                onClick={() => handleEdit(client)}
                className="rounded-lg bg-gray-100 px-3 py-1 text-sm font-medium hover:bg-gray-200"
              >
                Edit
              </button>
            </div>
          ))}
        </section>
      </section>
    </main>
  );
}

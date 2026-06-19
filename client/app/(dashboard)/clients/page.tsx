"use client";

import { useState, useEffect } from "react";
import { Client, ToastState } from "@/types/invoice";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

import { Search, Pencil, Trash2 } from "lucide-react";

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

  const [isClientModalOpen, setIsClientModalOpen] = useState(false);

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

      setIsClientModalOpen(false);
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

    setIsClientModalOpen(true);
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
      <section>
        <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
        <p className="text-gray-500">
          Manage client records used for invoice creation.
        </p>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 mt-4 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="my-6 flex items-center justify-between gap-4">
          <div className="relative w-full max-w-md">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search clients..."
              className="w-full rounded-xl bg-slate-50 py-2 pl-10 pr-4 text-sm placeholder:text-slate-400 outline-none ring-1 ring-slate-100 transition focus:bg-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={() => setIsClientModalOpen(true)}
            className="whitespace-nowrap rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100"
          >
            Add Client
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="w-1/3 px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Client
                </th>
                <th className="w-1/3 px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Email
                </th>
                <th className="w-1/3 px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Phone
                </th>
                <th className="w-32 px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    Loading clients...
                  </td>
                </tr>
              ) : clients.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    No clients found.
                  </td>
                </tr>
              ) : (
                clients.map((client) => (
                  <tr key={client.id}>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      {client.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {client.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {client.phone}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(client)}
                          className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
                        >
                          <Pencil size={14} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(client.id)}
                          className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {isClientModalOpen && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black/50 p-4"
            onClick={() => {
              resetForm();
              setIsClientModalOpen(false);
            }}
          >
            <div
              className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="pb-2">
                  <h2 className="text-lg font-semibold text-slate-900">
                    {editingId ? "Edit Client" : "Add Client"}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Manage client information for invoicing.
                  </p>
                </div>

                <input
                  placeholder="Name"
                  value={form.name}
                  className="w-full rounded-xl bg-slate-50 px-4 py-2 text-sm placeholder:text-slate-400 outline-none ring-1 ring-slate-100 focus:bg-white focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <input
                  placeholder="Email"
                  value={form.email}
                  className="w-full rounded-xl bg-slate-50 px-4 py-2 text-sm placeholder:text-slate-400 outline-none ring-1 ring-slate-100 focus:bg-white focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />

                <input
                  placeholder="Phone"
                  value={form.phone}
                  className="w-full rounded-xl bg-slate-50 px-4 py-2 text-sm placeholder:text-slate-400 outline-none ring-1 ring-slate-100 focus:bg-white focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />

                <input
                  placeholder="Address"
                  value={form.address}
                  className="w-full rounded-xl bg-slate-50 px-4 py-2 text-sm placeholder:text-slate-400 outline-none ring-1 ring-slate-100 focus:bg-white focus:ring-2 focus:ring-blue-500"
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                />

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="submit"
                    className="rounded-lg bg-green-100 px-3 py-2 text-sm font-medium text-green-600 hover:bg-green-200"
                    disabled={submitting}
                  >
                    {submitting
                      ? "Saving..."
                      : editingId
                        ? "Update Client"
                        : "Create Client"}
                  </button>

                  <button
                    type="button"
                    className="rounded-lg bg-blue-100 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-200"
                    onClick={() => {
                      resetForm();
                      setIsClientModalOpen(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <Toast message={toast.message} type={toast.type} />

        <ConfirmModal
          open={clientToDelete !== null}
          title="Delete client?"
          message="This action cannot be undone."
          onCancel={() => setClientToDelete(null)}
          onConfirm={confirmDeleteClient}
        />
      </section>
    </main>
  );
}

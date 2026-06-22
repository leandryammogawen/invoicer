"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { apiFetch } from "@/lib/api";
import type { Invoice, ToastState } from "@/types/invoice";

import Toast from "@/components/ui/Toast";
import StatusBadge from "@/components/invoices/StatusBadge";
import ConfirmModal from "@/components/ui/ConfirmModal";

import { Eye, Search, Pencil, Trash2 } from "lucide-react";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const [toast, setToast] = useState<ToastState>({
    message: "",
    type: "success",
  });
  const [invoiceToDelete, setInvoiceToDelete] = useState<number | null>(null);
  const filteredInvoices = invoices.filter((invoice) => {
    const searchValue = searchTerm.toLowerCase();

    return (
      invoice.invoice_number.toLowerCase().includes(searchValue) ||
      invoice.client.name.toLowerCase().includes(searchValue)
    );
  });

  async function fetchInvoices() {
    try {
      if (!token) return;

      setLoading(true);

      const response = await apiFetch("/api/invoices");

      const data = await response.json();

      setInvoices(data);
    } catch (error) {
      setError("Something went wrong while loading invoices.");
    } finally {
      setLoading(false);
    }
  }

  function handleDeleteInvoice(id: number) {
    setInvoiceToDelete(id);
  }

  async function confirmDeleteInvoice() {
    if (!invoiceToDelete) return;

    try {
      await apiFetch(`/api/invoices/${invoiceToDelete}`, {
        method: "DELETE",
      });

      setInvoices((prev) =>
        prev.filter((invoice) => invoice.id !== invoiceToDelete),
      );

      setToast({
        message: "Invoice deleted successfully.",
        type: "success",
      });
    } catch {
      setToast({
        message: "Something went wrong while deleting the invoice.",
        type: "error",
      });
    } finally {
      setInvoiceToDelete(null);
    }
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
      fetchInvoices();
    }
  }, [token]);

  useEffect(() => {
    if (!toast.message) return;

    const timer = setTimeout(() => {
      setToast({
        message: "",
        type: "success",
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <main className="mx-auto max-w-6xl p-6 space-y-8">
      <section>
        <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>

        <p className="text-gray-500">
          Track invoices, payment status, and client billing.
        </p>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 mt-4 p-4 text-sm text-red-700">
            {error}
          </div>
        )}
      </section>

      <section>
        <div className="my-6 flex items-center justify-between gap-4">
          <div className="relative w-full max-w-md">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              className="w-full rounded-xl bg-slate-50 py-2 pl-10 pr-4 text-sm placeholder:text-slate-400 outline-none ring-1 ring-slate-100 transition focus:bg-white focus:ring-2 focus:ring-blue-500"
              placeholder="Search by invoice number or client name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            onClick={() => router.push("/invoices/create")}
            className="whitespace-nowrap rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100"
          >
            Create Invoice
          </button>
        </div>
      </section>

      <section>
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Invoice #
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Client
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Total
                </th>

                <th className="whitespace-nowrap px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Issue Date
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    Loading invoices...
                  </td>
                </tr>
              ) : filteredInvoices.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    No invoices found.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      {invoice.invoice_number}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {invoice.client.name}
                    </td>

                    <td className="px-6 py-4">
                      <StatusBadge status={invoice.status} />
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      ₱{Number(invoice.amount).toLocaleString()}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {invoice.issue_date
                        ? new Date(invoice.issue_date).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )
                        : "-"}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => router.push(`/invoices/${invoice.id}`)}
                          className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
                        >
                          <Eye size={14} />
                          View
                        </button>

                        <button
                          onClick={() =>
                            router.push(`/invoices/${invoice.id}/edit`)
                          }
                          className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
                        >
                          <Pencil size={14} />
                          Edit
                        </button>

                        <button
                          onClick={() => handleDeleteInvoice(invoice.id)}
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

        <Toast message={toast.message} type={toast.type} />

        <ConfirmModal
          open={invoiceToDelete !== null}
          title="Delete invoice?"
          message="This action cannot be undone."
          onCancel={() => setInvoiceToDelete(null)}
          onConfirm={confirmDeleteInvoice}
        />
      </section>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

import InvoiceCard from "@/components/invoices/InvoiceCard";
import InvoiceForm from "@/components/invoices/InvoiceForm";
import Toast from "@/components/ui/Toast";

import type { Client, Invoice, InvoiceItem, ToastState } from "@/types/invoice";
import ConfirmModal from "@/components/ui/ConfirmModal";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [items, setItems] = useState<InvoiceItem[]>([
    {
      description: "",
      quantity: 1,
      unit_price: 0,
    },
  ]);
  const [status, setStatus] = useState("draft");
  const [issueDate, setIssueDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [clientId, setClientId] = useState("");
  const [editingInvoiceId, setEditingInvoiceId] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [pageError, setPageError] = useState("");
  const [formErrors, setFormErrors] = useState({
    clientId: "",
    items: "",
  });

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
      setPageError("Something went wrong while loading invoices.");
    } finally {
      setLoading(false);
    }
  }

  async function fetchClients() {
    try {
      if (!token) return;

      setLoading(true);

      const response = await apiFetch("/api/clients");

      const data = await response.json();

      setClients(data);
    } catch (error) {
      setPageError("Something went wrong while loading invoices.");
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const url = editingInvoiceId
      ? `/api/invoices/${editingInvoiceId}`
      : "/api/invoices";

    const method = editingInvoiceId ? "PUT" : "POST";

    const errors = {
      clientId: "",
      items: "",
    };

    if (!clientId) {
      errors.clientId = "Please select a client.";
    }

    if (
      items.some(
        (item) => !item.description || item.quantity < 1 || item.unit_price < 0,
      )
    ) {
      errors.items = "Please complete all invoice items.";
    }

    if (errors.clientId || errors.items) {
      setFormErrors(errors);
      return;
    }

    setFormErrors(errors);

    try {
      const res = await apiFetch(url, {
        method,
        body: JSON.stringify({
          client_id: clientId ? Number(clientId) : null,
          status,
          issue_date: issueDate || null,
          due_date: dueDate || null,
          notes: notes || null,
          items,
        }),
      });

      const data = await res.json();

      if (editingInvoiceId) {
        setInvoices((prev) =>
          prev.map((invoice) =>
            invoice.id === editingInvoiceId ? data : invoice,
          ),
        );
      } else {
        setInvoices((prev) => [data, ...prev]);
      }

      resetInvoiceForm();

      setFormErrors({
        clientId: "",
        items: "",
      });

      setToast({
        message: editingInvoiceId ? "Invoice updated." : "Invoice created.",
        type: "success",
      });
    } catch (error) {
      setToast({
        message: "Something went wrong while saving the invoice.",
        type: "error",
      });
    }
  };

  function handleEditInvoice(invoice: Invoice) {
    setEditingInvoiceId(invoice.id);

    setClientId(String(invoice.client_id));
    setStatus(invoice.status);
    setIssueDate(invoice.issue_date ?? "");
    setDueDate(invoice.due_date ?? "");
    setNotes(invoice.notes ?? "");

    setItems(
      invoice.items.map((item) => ({
        id: item.id,
        invoice_id: item.invoice_id,
        description: item.description,
        quantity: Number(item.quantity),
        unit_price: Number(item.unit_price),
        total: Number(item.total),
      })),
    );
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

  function resetInvoiceForm() {
    setEditingInvoiceId(null);

    setClientId("");
    setStatus("draft");
    setIssueDate("");
    setDueDate("");
    setNotes("");

    setItems([
      {
        description: "",
        quantity: 1,
        unit_price: 0,
      },
    ]);
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
      fetchClients();
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
    <main className="mx-auto max-w-5xl p-6">
      <Toast message={toast.message} type={toast.type} />

      <section className="mb-10">
        <h1 className="mb-6 text-2xl font-bold">Create Invoice</h1>

        <InvoiceForm
          clients={clients}
          clientId={clientId}
          setClientId={setClientId}
          status={status}
          setStatus={setStatus}
          issueDate={issueDate}
          setIssueDate={setIssueDate}
          dueDate={dueDate}
          setDueDate={setDueDate}
          notes={notes}
          setNotes={setNotes}
          items={items}
          setItems={setItems}
          editingInvoiceId={editingInvoiceId}
          onSubmit={handleSubmit}
          formErrors={formErrors}
        />
      </section>

      <h1 className="mb-6 text-2xl font-bold">Invoices</h1>

      <input
        type="text"
        placeholder="Search by invoice number or client name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 w-full rounded-md border px-3 py-2"
      />

      {loading && <p className="text-gray-500">Loading invoices...</p>}

      {pageError && <p className="text-red-600">{pageError}</p>}

      {!loading && clients.length === 0 && (
        <p className="text-gray-500">No invoices found.</p>
      )}

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredInvoices.map((invoice) => (
          <InvoiceCard
            key={invoice.id}
            invoice={invoice}
            onEdit={handleEditInvoice}
            onDelete={handleDeleteInvoice}
          />
        ))}
      </section>

      <ConfirmModal
        open={invoiceToDelete !== null}
        title="Delete invoice?"
        message="This action cannot be undone."
        onCancel={() => setInvoiceToDelete(null)}
        onConfirm={confirmDeleteInvoice}
      />
    </main>
  );
}

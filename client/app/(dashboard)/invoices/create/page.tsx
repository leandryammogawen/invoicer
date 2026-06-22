"use client";

import InvoiceForm from "@/components/invoices/InvoiceForm";
import { apiFetch } from "@/lib/api";
import { Client, InvoiceItem, ToastState } from "@/types/invoice";
import { useEffect, useState } from "react";
import Toast from "@/components/ui/Toast";
import router from "next/router";
import Link from "next/link";

export default function CreateInvoicePage() {
  const [items, setItems] = useState<InvoiceItem[]>([
    {
      description: "",
      quantity: 1,
      unit_price: 0,
    },
  ]);
  const [clients, setClients] = useState<Client[]>([]);
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState("draft");
  const [issueDate, setIssueDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [formErrors, setFormErrors] = useState({
    clientId: "",
    items: "",
  });
  const [toast, setToast] = useState<ToastState>({
    message: "",
    type: "success",
  });

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

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

    try {
      await apiFetch("/api/invoices", {
        method: "POST",
        body: JSON.stringify({
          client_id: clientId ? Number(clientId) : null,
          status,
          issue_date: issueDate || null,
          due_date: dueDate || null,
          notes: notes || null,
          items,
        }),
      });

      router.push("/invoices");
    } catch (error) {
      setToast({
        message: "Something went wrong while saving the invoice.",
        type: "error",
      });
    }
  };

  async function fetchClients() {
    try {
      const response = await apiFetch("/api/clients");

      const data = await response.json();

      setClients(data);
    } catch (error) {
      setToast({
        message: "Something went wrong while fetching the clients.",
        type: "error",
      });
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchClients();
  }, []);

  useEffect(() => {
    if (!toast.message) return;

    const timer = setTimeout(() => {
      setToast({
        message: "",
        type: "success",
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast.message]);

  return (
    <main className="mx-auto max-w-6xl space-y-8 p-6">
      <section>
        <Link
          href="/invoices"
          className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
        >
          ← Back to Invoices
        </Link>
      </section>
      
      <section>
        <h1 className="text-2xl font-bold text-slate-900">Create Invoice</h1>

        <p className="text-slate-500">
          Create a new invoice and assign it to a client.
        </p>
      </section>

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
        editingInvoiceId={null}
        onSubmit={handleSubmit}
        formErrors={formErrors}
      />

      <Toast message={toast.message} type={toast.type} />
    </main>
  );
}

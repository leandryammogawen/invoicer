"use client";

import type { FormEvent } from "react";

import InvoiceItemFields from "./InvoiceItemFields";

import type { Client, InvoiceItem } from "@/types/invoice";

type InvoiceFormProps = {
  clients: Client[];
  clientId: string;
  setClientId: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  issueDate: string;
  setIssueDate: (value: string) => void;
  dueDate: string;
  setDueDate: (value: string) => void;
  notes: string;
  setNotes: (value: string) => void;
  items: InvoiceItem[];
  setItems: (items: InvoiceItem[]) => void;
  editingInvoiceId: number | null;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  formErrors: {
    clientId: string;
    items: string;
  };
};

export default function InvoiceForm({
  clients,
  clientId,
  setClientId,
  status,
  setStatus,
  issueDate,
  setIssueDate,
  dueDate,
  setDueDate,
  notes,
  setNotes,
  items,
  setItems,
  editingInvoiceId,
  onSubmit,
  formErrors,
}: InvoiceFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
    >
      {formErrors.clientId && (
        <p className="mt-1 text-sm text-red-600">{formErrors.clientId}</p>
      )}
      <select
        value={clientId}
        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        onChange={(e) => setClientId(e.target.value)}
      >
        <option value="" disabled>
          Select client
        </option>

        {clients.map((client) => (
          <option key={client.id} value={client.id}>
            {client.name}
          </option>
        ))}
      </select>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
      >
        <option value="draft">Draft</option>
        <option value="sent">Sent</option>
        <option value="paid">Paid</option>
        <option value="overdue">Overdue</option>
      </select>

      <input
        type="date"
        value={issueDate}
        onChange={(e) => setIssueDate(e.target.value)}
        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
      />

      <textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
      />

      {formErrors.items && (
        <p className="mt-2 text-sm text-red-600">{formErrors.items}</p>
      )}
      
      <InvoiceItemFields items={items} setItems={setItems} />

      <button
        type="submit"
        className="rounded-md bg-blue-900 px-4 py-2 text-white hover:bg-blue-800"
      >
        {editingInvoiceId ? "Update Invoice" : "Create Invoice"}
      </button>
    </form>
  );
}

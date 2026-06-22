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
  const grandTotal = items.reduce(
    (total, item) => total + item.quantity * item.unit_price,
    0,
  );

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Invoice Details
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Configure the client and invoice information.
          </p>
        </div>

        {formErrors.clientId && (
          <p className="mb-4 text-sm text-red-600">{formErrors.clientId}</p>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Client</label>

            <select
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              className="w-full rounded-xl bg-slate-50 px-4 py-2 text-sm outline-none ring-1 ring-slate-100 focus:bg-white focus:ring-2 focus:ring-blue-500"
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
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Status</label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-xl bg-slate-50 px-4 py-2 text-sm outline-none ring-1 ring-slate-100 focus:bg-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Issue Date
            </label>

            <input
              type="date"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
              className="w-full rounded-xl bg-slate-50 px-4 py-2 text-sm outline-none ring-1 ring-slate-100 focus:bg-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Due Date
            </label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full rounded-xl bg-slate-50 px-4 py-2 text-sm outline-none ring-1 ring-slate-100 focus:bg-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Notes</h2>

          <p className="mt-1 text-sm text-slate-500">
            Optional notes that will appear on the invoice.
          </p>
        </div>

        <textarea
          placeholder="Add notes..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full rounded-xl bg-slate-50 px-4 py-3 text-sm outline-none ring-1 ring-slate-100 focus:bg-white focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Invoice Items
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Add products or services to this invoice.
          </p>
        </div>

        {formErrors.items && (
          <p className="mb-4 text-sm text-red-600">{formErrors.items}</p>
        )}

        <InvoiceItemFields items={items} setItems={setItems} />

        <div className="mt-6 border-t border-slate-200 pt-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Total Amount</span>

            <span className="text-xl font-semibold text-slate-900">
              ₱{grandTotal.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100"
          >
            {editingInvoiceId ? "Update Invoice" : "Create Invoice"}
          </button>
        </div>
      </section>
    </form>
  );
}

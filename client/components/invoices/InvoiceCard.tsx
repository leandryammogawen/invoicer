"use client";

import type { Invoice } from "@/types/invoice";
import Link from "next/link";
import StatusBadge from "./StatusBadge";

type InvoiceCardProps = {
  invoice: Invoice;
  onEdit: (invoice: Invoice) => void;
  onDelete: (id: number) => void;
};

export default function InvoiceCard({
  invoice,
  onEdit,
  onDelete,
}: InvoiceCardProps) {
  return (
    <div className="mb-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <p>{invoice.invoice_number}</p>
      <p>Client: {invoice.client.name}</p>
      <p>Total: ₱{invoice.amount}</p>
      <p>
        <StatusBadge status={invoice.status} />
      </p>
      <p>Issue Date: {invoice.issue_date ?? "No issue date"}</p>
      <p>Due Date: {invoice.due_date ?? "No due date"}</p>
      <p>Notes: {invoice.notes ?? "No notes"}</p>

      {invoice.items.length === 0 ? (
        <p>No items added.</p>
      ) : (
        invoice.items.map((item, index) => (
          <div key={item.id ?? index}>
            <p>{item.description}</p>
            <p>
              Qty: {item.quantity} × ₱{item.unit_price}
            </p>
            <p>Total: ₱{item.total}</p>
          </div>
        ))
      )}

      <div className="mt-4 flex gap-2">
        <Link href={`/invoices/${invoice.id}`}>View</Link>
        <button type="button" onClick={() => onEdit(invoice)}>
          Edit
        </button>

        <button type="button" onClick={() => onDelete(invoice.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

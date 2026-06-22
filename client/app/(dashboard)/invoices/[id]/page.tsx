"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { Invoice } from "@/types/invoice";
import Link from "next/link";
import InvoicePreview from "@/components/invoices/InvoicePreview";
import { apiFetch } from "@/lib/api";

import { Download, Pencil } from "lucide-react";
import StatusBadge from "@/components/invoices/StatusBadge";

export default function InvoiceDetailsPage() {
  const params = useParams();
  const id = params.id;

  const [invoice, setInvoice] = useState<Invoice | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchInvoice() {
      try {
        setLoading(true);
        setError("");

        const response = await apiFetch(`/api/invoices/${id}`);

        const data = await response.json();

        setInvoice(data);
      } catch (error) {
        setError("Something went wrong while loading the invoice.");
      } finally {
        setLoading(false);
      }
    }

    fetchInvoice();
  }, [id]);

  if (loading) {
    return <p>Loading invoice...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (!invoice) {
    return <p>Invoice not found.</p>;
  }

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
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-900">
            {invoice.invoice_number}
          </h1>

          <StatusBadge status={invoice.status} />
        </div>

        <p className="text-slate-500">
          View invoice details, billing information, and payment status.
        </p>
      </section>

      <section>
        <div className="flex flex-wrap items-center gap-2 justify-end">
          <Link
            href={`/invoices/${invoice.id}/edit`}
            className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
          >
            <Pencil size={14} />
            Edit Invoice
          </Link>

          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100"
          >
            <Download size={14} />
            Download PDF
          </button>
        </div>
      </section>

      <InvoicePreview invoice={invoice} />
    </main>
  );
}

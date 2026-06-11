"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { Invoice } from "@/types/invoice";
import Link from "next/link";
import InvoicePreview from "@/components/invoices/InvoicePreview";
import { apiFetch } from "@/lib/api";

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

        const response = await apiFetch(`/api/invoices/${id}`)

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
    <main className="mx-auto max-w-4xl space-y-6 p-6 print:max-w-none print:p-0">
      <Link href="/invoices" className="text-blue-600 hover:underline">
        ← Back to Invoices
      </Link>

      <InvoicePreview invoice={invoice} />

      <button
        type="button"
        className="rounded-md bg-blue-900 px-4 py-2 text-white hover:bg-blue-800"
      >
        Download PDF
      </button>
    </main>
  );
}

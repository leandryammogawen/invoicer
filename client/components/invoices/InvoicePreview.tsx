import type { Invoice } from "@/types/invoice";
import StatusBadge from "./StatusBadge";

type InvoicePreviewProps = {
  invoice: Invoice;
};

export default function InvoicePreview({ invoice }: InvoicePreviewProps) {
  return (
    <section className="rounded-lg border bg-white p-8 shadow-sm print:border-0 print:shadow-none">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold">Invoice</h1>
          <p className="text-gray-500">{invoice.invoice_number}</p>
        </div>

        <div className="text-right">
          <StatusBadge status={invoice.status} />
        </div>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="mb-2 font-semibold">Bill To</h2>
          <p>{invoice.client.name}</p>
          <p>{invoice.client.email}</p>
          <p>{invoice.client.phone}</p>
          <p>{invoice.client.address}</p>
        </div>

        <div className="md:text-right">
          <h2 className="mb-2 font-semibold">Invoice Dates</h2>
          <p>Issue Date: {invoice.issue_date ?? "—"}</p>
          <p>Due Date: {invoice.due_date ?? "—"}</p>
        </div>
      </div>

      <table className="mb-8 w-full border-collapse">
        <thead>
          <tr className="border-b text-left">
            <th className="py-2">Description</th>
            <th className="py-2">Qty</th>
            <th className="py-2">Unit Price</th>
            <th className="py-2 text-right">Total</th>
          </tr>
        </thead>

        <tbody>
          {invoice.items.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="py-3">{item.description}</td>
              <td className="py-3">{item.quantity}</td>
              <td className="py-3">₱{item.unit_price}</td>
              <td className="py-3 text-right">₱{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end">
        <div className="w-64 text-right">
          <p className="text-gray-500">Grand Total</p>
          <p className="text-3xl font-bold">₱{invoice.amount}</p>
        </div>
      </div>

      {invoice.notes && (
        <div className="mt-8">
          <h2 className="mb-2 font-semibold">Notes</h2>
          <p className="text-gray-600">{invoice.notes}</p>
        </div>
      )}
    </section>
  );
}
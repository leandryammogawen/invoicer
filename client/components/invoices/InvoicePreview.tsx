import type { Invoice } from "@/types/invoice";

type InvoicePreviewProps = {
  invoice: Invoice;
};

export default function InvoicePreview({ invoice }: InvoicePreviewProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Invoice</h1>

          <p className="mt-1 text-sm text-slate-500">
            {invoice.invoice_number}
          </p>
        </div>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl bg-slate-50 p-5">
          <h2 className="mb-2 font-semibold">Bill To</h2>
          <p>{invoice.client.name}</p>
          <p>{invoice.client.email}</p>
          <p>{invoice.client.phone}</p>
          <p>{invoice.client.address}</p>
        </div>

        <div className="rounded-xl bg-slate-50 p-5 md:text-right">
          <h2 className="mb-2 font-semibold">Invoice Dates</h2>
          <p>
            Issue Date:{" "}
            {invoice.issue_date
              ? new Date(invoice.issue_date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "-"}
          </p>
          <p>
            Due Date:{" "}
            {invoice.due_date
              ? new Date(invoice.due_date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "-"}
          </p>
        </div>
      </div>

      <table className="mb-8 w-full border-collapse">
        <thead className="bg-slate-50">
          <tr className="border-b text-left">
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Description
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Qty
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Unit Price
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              Total
            </th>
          </tr>
        </thead>

        <tbody>
          {invoice.items.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="px-4 py-3">{item.description}</td>
              <td className="px-4 py-3">{item.quantity}</td>
              <td className="px-4 py-3">
                ₱{Number(item.unit_price).toLocaleString()}
              </td>
              <td className="px-4 py-3">
                ₱{Number(item.total).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end rounded-xl border border-slate-200 bg-slate-50 p-6">
        <div className="w-64 text-right">
          <p className="text-gray-500">Grand Total</p>
          <p className="text-3xl font-bold">
            ₱{Number(invoice.amount).toLocaleString()}
          </p>
        </div>
      </div>

      {invoice.notes && (
        <div className="mt-8 rounded-xl bg-slate-50 p-5">
          <h2 className="mb-2 font-semibold">Notes</h2>
          <p className="text-gray-600">{invoice.notes}</p>
        </div>
      )}
    </section>
  );
}

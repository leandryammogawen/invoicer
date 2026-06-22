"use client";

import type { InvoiceItem } from "@/types/invoice";

type InvoiceItemFieldsProps = {
  items: InvoiceItem[];
  setItems: (items: InvoiceItem[]) => void;
};

export default function InvoiceItemFields({
  items,
  setItems,
}: InvoiceItemFieldsProps) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="rounded-xl border border-slate-200 bg-slate-50 p-4"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Description
              </label>

              <input
                placeholder="Website redesign"
                value={item.description}
                className="w-full rounded-xl bg-white px-4 py-2 text-sm outline-none ring-1 ring-slate-100 focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  const updatedItems = [...items];
                  updatedItems[index].description = e.target.value;
                  setItems(updatedItems);
                }}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Quantity
                </label>

                <input
                  type="number"
                  value={item.quantity}
                  className="w-full rounded-xl bg-white px-4 py-2 text-sm outline-none ring-1 ring-slate-100 focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => {
                    const updatedItems = [...items];
                    updatedItems[index].quantity = Number(e.target.value);
                    setItems(updatedItems);
                  }}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Unit Price
                </label>

                <input
                  type="number"
                  value={item.unit_price || ""}
                  className="w-full rounded-xl bg-white px-4 py-2 text-sm outline-none ring-1 ring-slate-100 focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => {
                    const updatedItems = [...items];
                    updatedItems[index].unit_price =
                      e.target.value === "" ? 0 : Number(e.target.value);
                    setItems(updatedItems);
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-200 pt-4">
              <p className="text-sm font-medium text-slate-700">
                Line Total: ₱
                {(item.quantity * item.unit_price).toLocaleString()}
              </p>

              <button
                type="button"
                disabled={items.length === 1}
                onClick={() => {
                  const updatedItems = items.filter(
                    (_, itemIndex) => itemIndex !== index,
                  );

                  setItems(updatedItems);
                }}
                className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Remove Item
              </button>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          setItems([
            ...items,
            {
              description: "",
              quantity: 1,
              unit_price: 0,
            },
          ])
        }
        className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100"
      >
        + Add Item
      </button>
    </div>
  );
}

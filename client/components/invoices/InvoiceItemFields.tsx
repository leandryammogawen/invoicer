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
    <section>
      {items.map((item, index) => (
        <div key={index} style={{ marginBottom: 20 }}>
          <input
            placeholder="Description"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            value={item.description}
            onChange={(e) => {
              const updatedItems = [...items];
              updatedItems[index].description = e.target.value;
              setItems(updatedItems);
            }}
          />

          <br />
          <br />

          <input
            type="number"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            placeholder="Quantity"
            value={item.quantity}
            onChange={(e) => {
              const updatedItems = [...items];
              updatedItems[index].quantity = Number(e.target.value);
              setItems(updatedItems);
            }}
          />

          <br />
          <br />
          <input
            type="number"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            placeholder="Unit Price"
            value={item.unit_price}
            onChange={(e) => {
              const updatedItems = [...items];
              updatedItems[index].unit_price = Number(e.target.value);
              setItems(updatedItems);
            }}
          />

          <button
            type="button"
            className="rounded-md bg-blue-900 px-4 py-2 text-white hover:bg-blue-800"
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
          >
            Add Item
          </button>

          <button
            type="button"
            className="rounded-md border border-red-300 px-4 py-2 text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={items.length === 1}
            onClick={() => {
              const updatedItems = items.filter(
                (_, itemIndex) => itemIndex !== index,
              );

              setItems(updatedItems);
            }}
          >
            Remove Item
          </button>

          <br />
          <br />

          <p>Line Total: ₱{item.quantity * item.unit_price}</p>
        </div>
      ))}
    </section>
  );
}

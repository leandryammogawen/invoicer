"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import type { Client, Invoice } from "@/types/invoice";

export default function DashboardPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  const paidInvoices = invoices.filter((invoice) => invoice.status === "paid");

  const draftInvoices = invoices.filter(
    (invoice) => invoice.status === "draft",
  );

  const totalRevenue = paidInvoices.reduce((sum, invoice) => {
    return sum + Number(invoice.amount);
  }, 0);

  async function fetchDashboardData() {
    try {
      setLoading(true);

      const clientsResponse = await apiFetch("/api/clients");
      const invoicesResponse = await apiFetch("/api/invoices");

      const clientsData = await clientsResponse.json();
      const invoicesData = await invoicesResponse.json();

      setClients(clientsData);
      setInvoices(invoicesData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchDashboardData();
  }, []);

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Overview of your invoicing activity.</p>
      </div>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Clients</p>
          <h2 className="text-3xl font-bold">{clients.length}</h2>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Invoices</p>
          <h2 className="text-3xl font-bold">{invoices.length}</h2>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Draft Invoices</p>
          <h2 className="text-3xl font-bold">{draftInvoices.length}</h2>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Paid Invoices</p>
          <h2 className="text-3xl font-bold">{paidInvoices.length}</h2>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <h2 className="text-3xl font-bold">
            ₱{totalRevenue.toLocaleString()}
          </h2>
        </div>
      </section>
    </main>
  );
}

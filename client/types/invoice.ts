export type Client = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
};

export type InvoiceItem = {
  id?: number;
  invoice_id?: number;
  description: string;
  quantity: number;
  unit_price: number;
  total?: number;
};

export type Invoice = {
  id: number;
  invoice_number: string;
  client_id: number;
  client: Client;
  amount: string;
  status: string;
  issue_date: string | null;
  due_date: string | null;
  notes: string | null;
  items: InvoiceItem[];
};

export type ToastState = {
  message: string;
  type: "success" | "error";
};
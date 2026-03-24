import type { Customer } from "~/features/customers/types/customers.type";

export type InvoiceItem = {
    name: string;
    qty: number;
    unit: string;
    price: number;
};

export type Invoice = {
    id: string;
    customer_id: string;
    status: "paid" | "unpaid" | "overdue" | "draft";
    amount: number;
    due_date: string;
    items: InvoiceItem[];
};

export type InvoiceCustomerDetail = {
    id: string;
    customer_id: string;
    status: "paid" | "unpaid" | "overdue" | "draft";
    amount: number;
    due_date: string;
    customer: Customer;
    items: InvoiceItem[];
};

export type InvoiceHTTPResponse = {
    first: number;
    prev: number;
    next: number;
    last: number;
    pages: number;
    items: number;
    data: Invoice[];
};

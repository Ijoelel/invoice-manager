import { http } from "~/shared/lib/api-client";
import type {
    Invoice,
    InvoiceHTTPResponse,
} from "~/features/invoices/types/invoices.type";
import {
    getCustomerById,
    getCustomers,
    getCustomersByName,
} from "~/features/customers/api/customers.api";

type Params = {
    page: number;
    limit: number;
    status?: string;
    search?: string;
    sortBy?: string;
    order?: "asc" | "desc";
};

type UpdateInvoiceStatusPayload = {
    id: string;
    status: "paid";
};

// GET
export const getInvoices = async (params?: Params) => {
    const { page, limit, status, search, sortBy, order } = params || {};

    const query: Record<string, any> = {
        _page: page ?? 1,
        _per_page: limit ?? 10,
    };

    if (status) query.status = status;

    if (sortBy) {
        query._sort = `${order === "desc" ? "-" : ""}${sortBy}`;
    }

    let data: Invoice[];

    // 🔥 SEARCH HANDLER
    if (search) {
        // 1. cari customer dulu
        const customers = await getCustomersByName(search);

        const customerIds = customers.map((c: any) => c.id);

        // 2. inject ke where
        query._where = JSON.stringify({
            or: [
                {
                    id: { contains: search },
                },
                ...customerIds.map((id) => ({
                    customer_id: { contains: id },
                })),
            ],
        });

        delete query._page;
        delete query._per_page;
    }

    // 🔥 fetch invoices
    if (search) {
        const res = await http.get<Invoice[]>("/invoices", query);
        data = res;
    } else {
        const res = await http.get<InvoiceHTTPResponse>("/invoices", query);
        data = res.data;
    }

    const customers = await getCustomers();

    const customerMap = Object.fromEntries(
        customers.data.map((c: any) => [c.id, c]),
    );

    const joined = data.map((inv: any) => ({
        ...inv,
        customer: customerMap[inv.customer_id],
    }));

    // 🔥 kalau search → manual pagination
    if (search) {
        const total = joined.length;
        const totalPages = Math.ceil(total / (limit ?? 10));

        const currentPage = page ?? 1;
        const start = (currentPage - 1) * (limit ?? 10);

        const paginated = joined.slice(start, start + (limit ?? 10));

        return paginated;
        // {
        // data: paginated
        // page: currentPage,
        // total,
        // totalPages,
        // };
    }

    // default (no search)
    return joined;
};

export const getInvoiceById = async (id: string) => {
    const data = await http.get<Invoice[]>(`/invoices?id:eq=${id}`);

    const customer = await getCustomerById(data[0].customer_id);

    return {
        ...data[0],
        customer: customer[0],
    };
};

// POST
export const createInvoice = (data: Partial<Invoice>) => {
    return http.post<Invoice>("/invoices", data);
};

// PATCH (parsial update)
export async function updateInvoiceStatus({
    id,
    data,
}: {
    id: string;
    data: string;
}) {
    return http.patch(`/invoices/${id}`, {
        status: data,
    });
}

// PUT (update full)
export const updateInvoice = (id: string, data: Partial<Invoice>) => {
    return http.put<Invoice>(`/invoices/${id}`, data);
};

// DELETE
export const deleteInvoice = (id: string) => {
    return http.delete(`/invoices/${id}`);
};

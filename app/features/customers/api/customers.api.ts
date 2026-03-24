import type { InvoiceHTTPResponse } from "~/features/invoices/types/invoices.type";
import type { Customer, CustomerHTTPResponse } from "../types/customers.type";
import { http } from "~/shared/lib/api-client";

export const getCustomerById = (id: string) => {
    return http.get<Customer[]>(`/customers?id=${id}`);
};

export const getCustomers = (params?: ApiParams) => {
    const { page, limit, status, search, sortBy, order } = params || {};

    const query: Record<string, any> = {
        _page: page ?? 1,
        _per_page: limit ?? 10,
    };

    if (search) query.q = search;
    if (status) query.status = status;
    if (sortBy) {
        query._sort = `${order === "desc" ? "-" : ""}${sortBy}`;
    }

    return http.get<CustomerHTTPResponse>("/customers", query);
};

export const getCustomersByName = async (search: string) => {
    return http.get<Customer[]>(`/customers?name:contains=${search}`);
};

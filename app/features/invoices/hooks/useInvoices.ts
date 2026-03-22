import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getInvoices } from "../api/invoices.api";

export const invoiceKeys = {
    all: ["invoices"] as const,
    list: (params: ApiParams) => [...invoiceKeys.all, params] as const,
};

export function useInvoices(params: ApiParams) {
    return useQuery({
        queryKey: invoiceKeys.list(params),
        queryFn: () => getInvoices(params),
        placeholderData: keepPreviousData,
    });
}

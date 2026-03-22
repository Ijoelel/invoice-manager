import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getInvoiceById } from "../api/invoices.api";

export function useInvoiceDetail(id: string) {
    return useQuery({
        queryKey: ["invoices", id],
        queryFn: () => getInvoiceById(id),
        placeholderData: keepPreviousData,
    });
}

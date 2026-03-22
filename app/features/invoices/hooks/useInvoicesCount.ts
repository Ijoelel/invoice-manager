import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getInvoicesCount } from "../api/invoices.api";

export function useInvoicesCount() {
    return useQuery({
        queryKey: ["invoicesCount"],
        queryFn: getInvoicesCount,
        placeholderData: keepPreviousData,
    });
}

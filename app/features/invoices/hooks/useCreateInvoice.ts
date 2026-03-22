// hooks/useCreateInvoice.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    createInvoice,
    getInvoices,
    getInvoicesCount,
} from "../api/invoices.api";
import { useNavigate, useRoutes } from "react-router";
import type { Invoice, InvoiceHTTPResponse } from "../types/invoices.type";
import type { InvoiceFormValues } from "../schemas/invoice.schema";

export function useCreateInvoice() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (newData: InvoiceFormValues) => {
            // ambil data invoices dari cache
            const invoicesCount = await getInvoicesCount();

            let nextId = `INV-2024-${invoicesCount + 1}`;

            return createInvoice({
                ...newData,
                id: nextId,
            });
        },
        onSuccess: (data) => {
            navigate(`/invoices/${data.id}`);
            queryClient.invalidateQueries({ queryKey: ["invoices"] });
        },
    });
}

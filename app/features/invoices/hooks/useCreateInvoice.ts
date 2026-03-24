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
        mutationFn: async (newData: Omit<Invoice, "id">) => {
            const invoicesCount = await getInvoicesCount();

            let nextId = `INV-2024-${invoicesCount + 1}`;

            // const joh = setTimeout(() => console.log("rawrrr"), 3000);

            const res = await createInvoice({
                ...newData,
                id: nextId,
            });

            return res;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["invoices", "newInvoice"],
            });
            navigate(`/invoices/${data.id}`);
        },
    });
}

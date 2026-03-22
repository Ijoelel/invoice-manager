import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInvoiceStatus } from "../api/invoices.api";

type UpdateInvoicePayload = {
    id: string;
    status: "paid";
};

export function useUpdateInvoiceStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, status }: UpdateInvoicePayload) =>
            updateInvoiceStatus({ id, data: status }),

        // ⚡ Optimistic Update
        onMutate: async ({ id }) => {
            await queryClient.cancelQueries({ queryKey: ["invoice", id] });

            const previousInvoice = queryClient.getQueryData(["invoice", id]);

            // update langsung di UI
            queryClient.setQueryData(["invoice", id], (old: any) => {
                if (!old) return old;
                return {
                    ...old,
                    status: "paid",
                };
            });

            return { previousInvoice };
        },

        // ❌ rollback kalau error
        onError: (_err, { id }, context) => {
            if (context?.previousInvoice) {
                queryClient.setQueryData(
                    ["invoice", id],
                    context.previousInvoice,
                );
            }
        },

        // 🔄 sync ulang ke server
        onSettled: (_data, _error, { id }) => {
            // detail
            queryClient.invalidateQueries({
                queryKey: ["invoice", id],
            });

            // list (penting banget buat test)
            queryClient.invalidateQueries({
                queryKey: ["invoices"],
            });

            // optional: dashboard
            queryClient.invalidateQueries({
                queryKey: ["dashboard"],
            });
        },
    });
}

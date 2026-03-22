// schemas/invoice.schema.ts
import { z } from "zod";

export const invoiceSchema = z.object({
    customer_id: z.string().min(1, "Customer wajib dipilih"),
    status: z.enum(["draft", "unpaid"]),
    due_date: z.string().refine((date) => {
        return new Date(date) >= new Date(new Date().toDateString());
    }, "Due date tidak boleh di masa lalu"),
    items: z
        .array(
            z.object({
                name: z.string().min(1, "Nama item wajib"),
                qty: z.number().min(1, "Qty harus > 0"),
                price: z.number().min(1, "Harga wajib > 0"),
                unit: z.string().min(1, "Pilih nilai unit"),
            }),
        )
        .min(1, "Minimal 1 item"),
});

export type InvoiceFormValues = z.infer<typeof invoiceSchema>;

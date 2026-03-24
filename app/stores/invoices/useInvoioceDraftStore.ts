// src/stores/invoice/useInvoiceDraftStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { InvoiceFormValues } from "~/features/invoices/schemas/invoice.schema";
import type { InvoiceItem } from "~/features/invoices/types/invoices.type";

type InvoiceDraftState = {
    draft: InvoiceFormValues;
    hasHydrated: boolean;

    setDraft: (data: Partial<InvoiceFormValues>) => void;
    setHasHydrated: () => void;
    reset: () => void;
};

const initialDraft: InvoiceFormValues = {
    customer_id: "",
    status: "draft",
    due_date: "",
    items: [{ name: "item", qty: 1, price: 999999999, unit: "volume" }],
};

export const useInvoiceDraftStore = create<InvoiceDraftState>()(
    persist(
        (set) => ({
            draft: initialDraft,
            hasHydrated: false,

            setDraft: (data) =>
                set((state) => ({
                    draft: {
                        ...state.draft,
                        ...data,
                    },
                })),

            reset: () => set({ draft: initialDraft }),
            setHasHydrated: () => set({ hasHydrated: true }),
        }),
        {
            name: "invoice-draft-storage",
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated();
            },
        },
    ),
);

import type { Invoice } from "~/features/invoices/types/invoices.type";

export const mapCustomerStats = (invoices: Invoice[]) => {
    const paid = invoices.filter((i) => i.status === "paid");

    const totalSpent = paid.reduce((sum, i) => sum + i.amount, 0);

    const statusCount = invoices.reduce(
        (acc, inv) => {
            acc[inv.status] = (acc[inv.status] || 0) + 1;
            return acc;
        },
        {} as Record<string, number>,
    );

    return {
        totalSpent,
        statusCount,
    };
};

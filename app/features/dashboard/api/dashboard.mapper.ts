import type { Invoice } from "~/features/invoices/types/invoices.type";

export type DashboardData = {
    summary: {
        totalRevenue: number;
        totalUnpaid: number;
        totalOverdue: number;
        totalInvoices: number;
    };
    latestInvoices: Invoice[];
    statusDistribution: {
        paid: number;
        unpaid: number;
        overdue: number;
    };
};

export const mapDashboard = (invoices: Invoice[]): DashboardData => {
    // 🔹 SUMMARY
    const totalRevenue = invoices
        .filter((i) => i.status === "paid")
        .reduce((acc, i) => acc + i.amount, 0);

    const totalUnpaid = invoices
        .filter((i) => i.status === "unpaid")
        .reduce((acc, i) => acc + i.amount, 0);

    const totalOverdue = invoices
        .filter((i) => i.status === "overdue")
        .reduce((acc, i) => acc + i.amount, 0);

    // 🔹 LATEST INVOICES (top 5 by due_date desc)
    const latestInvoices = [...invoices]
        .sort(
            (a, b) =>
                new Date(b.due_date).getTime() - new Date(a.due_date).getTime(),
        )
        .slice(0, 5);

    // 🔹 STATUS DISTRIBUTION (buat chart)
    const statusDistribution = invoices.reduce(
        (acc, invoice) => {
            acc[invoice.status]++;
            return acc;
        },
        {
            paid: 0,
            unpaid: 0,
            overdue: 0,
        },
    );

    return {
        summary: {
            totalRevenue,
            totalUnpaid,
            totalOverdue,
            totalInvoices: invoices.length,
        },
        latestInvoices,
        statusDistribution,
    };
};

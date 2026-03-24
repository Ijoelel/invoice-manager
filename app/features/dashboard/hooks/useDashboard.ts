import { useInvoices } from "~/features/invoices/hooks/useInvoices";
import { mapDashboard, type DashboardData } from "../api/dashboard.mapper";

export function useDashboard() {
    const query = useInvoices({ page: 1, limit: 0 });

    const data: DashboardData | undefined = query.data
        ? mapDashboard(query.data)
        : undefined;

    return {
        ...query,
        data,
    };
}

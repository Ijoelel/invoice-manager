import RecentInvoicesTable from "../components/RecentInvoicesTable";
import StatusChart from "../components/StatusChart";
import SummaryCards from "../components/SummaryCards";
import { useDashboard } from "../hooks/useDashboard";
import { useEffect } from "react";

const DashboardPage = () => {
    const { data, isLoading, isError } = useDashboard();

    if (isError) return <div>Error loading dashboard</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-xl font-bold">Dashboard</h1>

            <SummaryCards summary={data?.summary} isLoading={isLoading} />
            <div className="flex w-full gap-2">
                <StatusChart
                    distribution={data?.statusDistribution}
                    isLoading={isLoading}
                />
                <RecentInvoicesTable
                    invoices={data?.latestInvoices}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};

export default DashboardPage;

import RecentInvoicesTable from "../components/RecentInvoicesTable";
import StatusChart from "../components/StatusChart";
import SummaryCards from "../components/SummaryCards";
import { useDashboard } from "../hooks/useDashboard";
import { useEffect } from "react";

const DashboardPage = () => {
    const { data, isLoading, isError } = useDashboard();

    if (isError) return <div>Error loading dashboard</div>;

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center justify-center">
                    <h1 className="text-xl font-bold">Dashboard</h1>
                </div>
            </div>

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

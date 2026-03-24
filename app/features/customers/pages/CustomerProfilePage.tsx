import { Link, useLocation, useParams } from "react-router";
import { useCustomerProfile } from "../hooks/useCustomerProfile";
import { mapCustomerStats } from "../api/customers.mapper";
import type { Customer } from "../types/customers.type";
import type { Invoice } from "~/features/invoices/types/invoices.type";

const CustomerPage = () => {
    const { id } = useParams();
    const location = useLocation();
    console.log(location);

    const { customerQuery, invoicesQuery } = useCustomerProfile(id!);

    if (customerQuery.isLoading || invoicesQuery.isLoading) {
        return <div>Loading...</div>;
    }

    if (customerQuery.isError || invoicesQuery.isError) {
        return <div>Error loading data</div>;
    }

    const customer: Customer = customerQuery.data!;
    const invoices: Invoice[] = invoicesQuery.data!;

    const stats = mapCustomerStats(invoices);

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold text-gray-900">
                    {customer.name}
                    <span className="ml-2 text-sm text-gray-400 font-normal">
                        Customer Profile
                    </span>
                </h1>
            </div>

            {/* Profile Card */}
            <div className="p-5 rounded-xl bg-white shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900">
                    {customer.name}
                </h2>
                <p className="text-sm text-gray-500">{customer.email}</p>

                <div className="mt-3">
                    <span className="inline-block text-xs px-2 py-1 rounded-md bg-gray-100 text-gray-600">
                        Plan: {customer.plan}
                    </span>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Total spent */}
                <div className="p-4 rounded-xl bg-white shadow-sm">
                    <p className="text-xs text-gray-500">Total Spent</p>
                    <p className="text-lg font-semibold text-gray-900 mt-1">
                        Rp {stats.totalSpent.toLocaleString()}
                    </p>
                </div>

                {/* Status cards */}
                {Object.entries(stats.statusCount).map(([status, count]) => (
                    <div
                        key={status}
                        className="p-4 rounded-xl bg-white shadow-sm"
                    >
                        <p className="text-xs text-gray-500 capitalize">
                            {status}
                        </p>
                        <p className="text-lg font-semibold text-gray-900 mt-1">
                            {count}
                        </p>
                    </div>
                ))}
            </div>

            {/* Invoice List */}
            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700">
                    Invoices
                </h3>

                <div className="divide-y rounded-xl overflow-hidden bg-white px-6 py-2">
                    {invoices.map((inv) => (
                        <Link
                            key={inv.id}
                            to={`/invoices/${inv.id}`}
                            className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition"
                        >
                            <div className="flex flex-col">
                                <span className="font-medium text-gray-900">
                                    {inv.id}
                                </span>
                                <span className="text-xs text-gray-400">
                                    Due: {inv.due_date}
                                </span>
                            </div>

                            <div className="flex items-center gap-4">
                                {/* Status Badge */}
                                <span
                                    className={`text-xs px-2 py-1 rounded-md capitalize
                                ${
                                    inv.status === "paid"
                                        ? "bg-green-100 text-green-600"
                                        : inv.status === "unpaid"
                                          ? "bg-yellow-100 text-yellow-600"
                                          : inv.status === "overdue"
                                            ? "bg-red-100 text-red-600"
                                            : "bg-gray-100 text-gray-500"
                                }
                            `}
                                >
                                    {inv.status}
                                </span>

                                <span className="text-sm font-medium text-gray-700">
                                    Rp {inv.amount.toLocaleString()}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default CustomerPage;

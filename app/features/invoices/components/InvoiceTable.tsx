import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import type { Invoice, InvoiceCustomerDetail } from "../types/invoices.type";
import { Link } from "react-router";
import { SkeletonTable } from "~/shared/components/Skeleton";
import { formatCurrency } from "~/shared/lib/utils";

const columnHelper = createColumnHelper<InvoiceCustomerDetail>();

const InvoiceTable = ({
    data,
    isLoading,
    params,
    updateParams,
}: {
    data: InvoiceCustomerDetail[];
    isLoading: boolean;
    params: ApiParams;
    updateParams: (updates: Record<string, string | undefined>) => void;
}) => {
    const columns = [
        columnHelper.accessor("id", {
            header: "Invoice ID",
            cell: (info) => (
                <Link
                    to={`/invoices/${info.getValue()}`}
                    className="text-primary hover:underline w-fit"
                >
                    {info.getValue()}
                </Link>
            ),
        }),

        columnHelper.accessor("customer", {
            header: "Customer Name",
            cell: (info) => (
                <Link
                    to={`/customers/${info.getValue()?.id}`}
                    className="font-medium text-gray-900 hover:underline"
                >
                    {info.getValue()?.name}
                </Link>
            ),
        }),

        columnHelper.accessor("status", {
            header: "Status",
            cell: (info) => {
                const status = info.getValue();

                const styles = {
                    paid: "bg-green-100 text-green-700",
                    unpaid: "bg-yellow-100 text-yellow-700",
                    overdue: "bg-red-100 text-red-700",
                    draft: "bg-gray-100 text-gray-600",
                };

                return (
                    <span
                        className={`px-2 py-1 text-xs rounded-md font-medium ${styles[status]}`}
                    >
                        {status}
                    </span>
                );
            },
        }),

        columnHelper.accessor("amount", {
            header: "Amount",
            cell: (info) => (
                <span className="font-medium text-gray-900">
                    Rp {info.getValue()}
                </span>
            ),
        }),

        columnHelper.accessor("due_date", {
            header: "Due Date",
            cell: (info) =>
                new Date(info.getValue()).toLocaleDateString("id-ID"),
        }),
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return isLoading ? (
        <SkeletonTable rows={5} />
    ) : (
        <div className="w-full bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-sm font-bold mb-4">Recent Invoices</h2>

            <table className="w-full border-separate border-spacing-0">
                <thead>
                    {table.getHeaderGroups().map((hg) => (
                        <tr key={hg.id}>
                            {hg.headers.map((header) => {
                                const active =
                                    params.sortBy === header.column.id;

                                return (
                                    <th
                                        key={header.id}
                                        onClick={() => {
                                            const next =
                                                active && params.order === "asc"
                                                    ? "desc"
                                                    : "asc";

                                            updateParams({
                                                sortBy: header.column.id,
                                                order: next,
                                            });
                                        }}
                                        className="text-left text-xs font-medium text-gray-500 
                                       px-4 py-3 cursor-pointer select-none"
                                    >
                                        <div className="flex items-center gap-1">
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}

                                            {active && (
                                                <span className="text-gray-400">
                                                    {params.order === "asc"
                                                        ? "↑"
                                                        : "↓"}
                                                </span>
                                            )}
                                        </div>
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>

                <tbody className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
                    {table.getRowModel().rows.map((row) => (
                        <tr
                            key={row.id}
                            className="hover:bg-gray-50 transition"
                        >
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    key={cell.id}
                                    className="px-4 py-3 text-sm text-gray-700 border-t first:border-t-0"
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext(),
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default InvoiceTable;

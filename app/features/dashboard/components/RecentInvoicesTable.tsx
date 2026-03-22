import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Link } from "react-router";
import { SkeletonTable } from "~/shared/components/Skeleton";
import { formatCurrency } from "~/shared/lib/utils";

type Invoice = {
    id: string;
    status: string;
    amount: number;
    due_date: string;
};

type Props = {
    invoices: Invoice[] | undefined;
    isLoading: boolean;
};

const columnHelper = createColumnHelper<Invoice>();

const RecentInvoicesTable = ({ invoices, isLoading }: Props) => {
    const columns = [
        columnHelper.accessor("id", {
            header: "Invoice ID",
            cell: (info) => (
                <Link
                    to={`/invoices/${info.getValue()}`}
                    className="text-primary hover:underline"
                >
                    {info.getValue()}
                </Link>
            ),
        }),

        columnHelper.accessor("status", {
            header: "Status",
            cell: (info) => (
                <span className="capitalize">{info.getValue()}</span>
            ),
        }),

        columnHelper.accessor("amount", {
            header: "Amount",
            cell: (info) => formatCurrency(info.getValue()),
        }),

        columnHelper.accessor("due_date", {
            header: "Due Date",
            cell: (info) =>
                new Date(info.getValue()).toLocaleDateString("id-ID"),
        }),
    ];

    const table = useReactTable({
        data: invoices || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return isLoading ? (
        <SkeletonTable rows={5} />
    ) : (
        <div className="w-full bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-sm font-bold mb-4">Recent Invoices</h2>

            <table className="w-full text-sm">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr
                            key={headerGroup.id}
                            className="text-left text-gray-400"
                        >
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className="pb-2">
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext(),
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="border-t">
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="py-2">
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

export default RecentInvoicesTable;

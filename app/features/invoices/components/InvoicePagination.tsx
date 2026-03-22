import { useQueryClient } from "@tanstack/react-query";
import { getInvoices } from "../api/invoices.api";

const InvoicePagination = ({ page, totalPages, params, updateParams }: any) => {
    const queryClient = useQueryClient();

    const goToPage = (p: number) => updateParams({ page: String(p) });

    const prefetch = (p: number) => {
        if (p < 1 || p > totalPages) return;

        const key = ["invoices", { ...params, page: p }];
        if (queryClient.getQueryData(key)) return;

        queryClient.prefetchQuery({
            queryKey: key,
            queryFn: () => getInvoices({ ...params, page: p }),
        });
    };

    return (
        <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-gray-500">
                Page {page} of {totalPages}
            </span>

            <div className="flex items-center gap-1">
                <button
                    disabled={page <= 1}
                    onMouseEnter={() => prefetch(page - 1)}
                    onClick={() => goToPage(page - 1)}
                    className="px-3 py-1.5 text-sm border rounded-md 
                       hover:bg-gray-100 disabled:opacity-40"
                >
                    ←
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .slice(Math.max(0, page - 2), page + 1)
                    .map((p) => (
                        <button
                            key={p}
                            onClick={() => goToPage(p)}
                            className={`px-3 py-1.5 text-sm rounded-md border 
                        ${
                            p === page
                                ? "bg-black text-white border-black"
                                : "hover:bg-gray-100"
                        }`}
                        >
                            {p}
                        </button>
                    ))}

                <button
                    disabled={page >= totalPages}
                    onMouseEnter={() => prefetch(page + 1)}
                    onClick={() => goToPage(page + 1)}
                    className="px-3 py-1.5 text-sm border rounded-md 
                       hover:bg-gray-100 disabled:opacity-40"
                >
                    →
                </button>
            </div>
        </div>
    );
};
export default InvoicePagination;

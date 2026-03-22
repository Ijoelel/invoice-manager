type Props = {
    params: ApiParams;
    updateParams: (v: Record<string, string | undefined>) => void;
};

const InvoiceFIlters = ({ params, updateParams }: Props) => {
    return (
        <div className="flex items-center gap-3 mb-4">
            {/* FILTER STATUS */}
            <select
                value={params.status ?? ""}
                onChange={(e) =>
                    updateParams({ status: e.target.value || undefined })
                }
                className="px-3 py-2 text-sm border border-gray-200 rounded-lg 
           bg-white shadow-sm hover:border-gray-300 
           focus:outline-none focus:ring-2 focus:ring-black/5"
            >
                <option value="">All Status</option>
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
                <option value="overdue">Overdue</option>
                <option value="draft">Draft</option>
            </select>

            {/* SORT */}
            <select
                value={`${params.sortBy ?? ""}-${params.order ?? ""}`}
                onChange={(e) => {
                    const val = e.target.value;
                    if (!val) {
                        updateParams({ sortBy: undefined, order: undefined });
                    } else {
                        const [sortBy, order] = val.split("-");
                        updateParams({ sortBy, order });
                    }
                }}
                className="px-3 py-2 text-sm border border-gray-200 rounded-lg 
           bg-white shadow-sm hover:border-gray-300 
           focus:outline-none focus:ring-2 focus:ring-black/5"
            >
                <option value="">No Sorting</option>
                <option value="amount-asc">Amount ↑</option>
                <option value="amount-desc">Amount ↓</option>
                <option value="due_date-asc">Due Date ↑</option>
                <option value="due_date-desc">Due Date ↓</option>
            </select>
        </div>
    );
};
export default InvoiceFIlters;

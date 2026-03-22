import { useSearchParams } from "react-router";
import { useInvoices } from "../hooks/useInvoices";
import { parseOrder } from "~/shared/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { getInvoices } from "../api/invoices.api";
import InvoiceTable from "../components/InvoiceTable";
import InvoiceFIlters from "../components/InvoiceFIlters";
import InvoicePagination from "../components/InvoicePagination";
import { useInvoiceQueryParams } from "../hooks/useInvoiceQueryParams";
import InvoiceSearch from "../components/InvoiceSearch";

const InvoicesListPage = () => {
    const { params, page, updateParams } = useInvoiceQueryParams();

    const query = useInvoices(params);
    console.log(query);

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between gap-4">
                <InvoiceSearch
                    initialValue={params.search}
                    onSearch={(val) =>
                        updateParams({
                            search: val,
                        })
                    }
                />
                <div className="flex items-center gap-2">
                    <InvoiceFIlters
                        params={params}
                        updateParams={updateParams}
                    />
                </div>
            </div>

            <InvoiceTable
                data={query.data ?? []}
                isLoading={query.isLoading}
                params={params}
                updateParams={updateParams}
            />

            <InvoicePagination
                page={page}
                totalPages={3}
                params={params}
                updateParams={updateParams}
            />
        </div>
    );
};
export default InvoicesListPage;

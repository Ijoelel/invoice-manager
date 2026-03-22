import { useSearchParams } from "react-router";
import { parseOrder } from "~/shared/lib/utils";

export function useInvoiceQueryParams() {
    const [searchParams, setSearchParams] = useSearchParams();

    const page = Number(searchParams.get("page") ?? 1);

    const params = {
        page,
        limit: 10,
        status: searchParams.get("status") || undefined,
        search: searchParams.get("search") || undefined,
        sortBy: searchParams.get("sortBy") || undefined,
        order: parseOrder(
            searchParams.get("order") === "desc" ? "desc" : "asc",
        ),
    };

    const updateParams = (updates: Record<string, string | undefined>) => {
        const sp = new URLSearchParams(searchParams);

        Object.entries(updates).forEach(([key, value]) => {
            if (!value) sp.delete(key);
            else sp.set(key, value);
        });

        if (updates.page === undefined) {
            sp.set("page", "1"); // reset page kalau filter/sort berubah
        }

        setSearchParams(sp);
    };

    return {
        params,
        page,
        searchParams,
        setSearchParams,
        updateParams,
    };
}

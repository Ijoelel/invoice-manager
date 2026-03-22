import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCustomers } from "../api/customers.api";

export function useCustomers(params?: ApiParams) {
    return useQuery({
        queryKey: ["customers", params],
        queryFn: () => getCustomers(params),
        staleTime: 1000 * 60,
        placeholderData: keepPreviousData,
    });
}

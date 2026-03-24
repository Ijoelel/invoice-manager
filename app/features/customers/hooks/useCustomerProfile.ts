import { useQueries } from "@tanstack/react-query";
import { getCustomerById } from "../api/customers.api";
import { getInvoicesByCustomer } from "~/features/invoices/api/invoices.api";

export const useCustomerProfile = (customerId: string) => {
    const results = useQueries({
        queries: [
            {
                queryKey: ["customer", customerId],
                queryFn: async () => {
                    const data = await getCustomerById(customerId);
                    return data[0];
                },
                enabled: !!customerId,
            },
            {
                queryKey: ["invoices", { customerId }],
                queryFn: async () => {
                    const data = await getInvoicesByCustomer(customerId);
                    console.log("RETURNING : ", data);
                    return data;
                },
                enabled: !!customerId,
            },
        ],
    });

    const [customerQuery, invoicesQuery] = results;

    return {
        customerQuery,
        invoicesQuery,
    };
};

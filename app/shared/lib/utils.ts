export function parseOrder(value: string | null): "asc" | "desc" | undefined {
    if (value === "asc" || value === "desc") return value;
    return undefined;
}

export const formatCurrency = (val: number) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(val);

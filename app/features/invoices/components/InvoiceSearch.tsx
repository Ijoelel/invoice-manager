import { useEffect, useState } from "react";

type Props = {
    initialValue?: string;
    onSearch: (value: string | undefined) => void;
};

const InvoiceSearch = ({ initialValue, onSearch }: Props) => {
    const [value, setValue] = useState(initialValue ?? "");

    // sync kalau URL berubah dari luar
    useEffect(() => {
        setValue(initialValue ?? "");
    }, [initialValue]);

    // 🔥 debounce (optional tapi bagus)
    useEffect(() => {
        const timeout = setTimeout(() => {
            onSearch(value || undefined);
        }, 400);

        return () => clearTimeout(timeout);
    }, [value]);

    return (
        <input
            type="text"
            placeholder="Search invoice or customer..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="px-3 py-2 border rounded-md text-sm w-64"
        />
    );
};
export default InvoiceSearch;

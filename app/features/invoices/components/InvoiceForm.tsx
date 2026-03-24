import { useCustomers } from "~/features/customers/hooks/useCustomers";
import { useCreateInvoice } from "../hooks/useCreateInvoice";
import {
    invoiceSchema,
    type InvoiceFormValues,
} from "../schemas/invoice.schema";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebounce } from "use-debounce";
import { useInvoiceDraftStore } from "~/stores/invoices/useInvoioceDraftStore";
import { useEffect, useRef } from "react";

const InvoiceForm = () => {
    const { data: customers } = useCustomers();
    const mutation = useCreateInvoice();

    const { draft, hasHydrated, setDraft, reset } = useInvoiceDraftStore();

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        watch,
        reset: formReset,
        setValue,
    } = useForm<InvoiceFormValues>({
        resolver: zodResolver(invoiceSchema),
        defaultValues: draft,
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "items",
    });

    const values = watch();
    console.log(values);

    const [debouncedValues] = useDebounce(values, 300);

    const hasMounted = useRef(false);

    const onSubmit = async (data: InvoiceFormValues, e: any) => {
        e.preventDefault();

        const amount = data.items.reduce(
            (acc, item) => acc + item.qty * item.price,
            0,
        );

        await mutation.mutateAsync({
            ...data,
            amount,
        });

        reset(); // Zustand reset
        formReset();
    };

    useEffect(() => {
        if (hasHydrated) {
            formReset(draft);
        }
    }, [hasHydrated]);

    useEffect(() => {
        if (!hasHydrated) return;

        if (!hasMounted.current) {
            hasMounted.current = true;
            return;
        }

        setDraft(debouncedValues);
    }, [debouncedValues, hasHydrated]);

    useEffect(() => {
        if (customers && draft.customer_id) {
            setValue("customer_id", draft.customer_id);
        }
    }, [customers]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-sm">
            {/* Top Section */}
            <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                    <label className="text-gray-500">Customer</label>
                    <select
                        {...register("customer_id")}
                        className="border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
                    >
                        <option value="">Pilih Customer</option>
                        {customers?.data.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                    {errors.customer_id && (
                        <span className="text-xs text-red-500">
                            {errors.customer_id.message}
                        </span>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-gray-500">Status</label>
                    <select
                        {...register("status")}
                        className="border rounded px-3 py-2"
                    >
                        <option value="draft">Draft</option>
                        <option value="unpaid">Unpaid</option>
                    </select>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-gray-500">Due Date</label>
                    <input
                        type="date"
                        {...register("due_date")}
                        className="border rounded px-3 py-2"
                    />
                    {errors.due_date && (
                        <span className="text-xs text-red-500">
                            {errors.due_date.message}
                        </span>
                    )}
                </div>
            </div>

            {/* Items Table */}
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-700">Items</h3>
                    <button
                        type="button"
                        onClick={() =>
                            append({
                                name: "",
                                qty: 1,
                                price: 0,
                                unit: "volume",
                            })
                        }
                        className="text-xs text-blue-600 hover:underline"
                    >
                        + Tambah Item
                    </button>
                </div>

                {/* Header */}
                <div className="grid grid-cols-14 gap-2 text-xs text-gray-500 px-1">
                    <span className="col-span-3">Name</span>
                    <span className="col-span-3">Qty</span>
                    <span className="col-span-3">Price</span>
                    <span className="col-span-3">Unit</span>
                    <span className="col-span-2"></span>
                </div>

                {/* Rows */}
                <div className="space-y-2">
                    {fields.map((field, index) => (
                        <div key={field.id} className="grid grid-cols-14 gap-2">
                            <input
                                {...register(`items.${index}.name`)}
                                className="col-span-3 border rounded px-2 py-1"
                            />

                            <input
                                type="number"
                                {...register(`items.${index}.qty`, {
                                    valueAsNumber: true,
                                })}
                                className="col-span-3 border rounded px-2 py-1"
                            />

                            <input
                                type="number"
                                {...register(`items.${index}.price`, {
                                    valueAsNumber: true,
                                })}
                                className="col-span-3 border rounded px-2 py-1"
                            />

                            <input
                                type="text"
                                {...register(`items.${index}.unit`)}
                                className="col-span-3 border rounded px-2 py-1"
                            />

                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="col-span-2 text-xs text-red-500 hover:underline"
                            >
                                Hapus
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-gray-500">Total</span>
                <span className="font-medium">
                    Rp{" "}
                    {draft.items
                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                        .toLocaleString()}
                </span>
            </div>

            {/* Error global */}
            {mutation.isError && (
                <p className="text-xs text-red-500">
                    Gagal membuat invoice. Coba lagi.
                </p>
            )}

            {/* Submit */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 disabled:opacity-50"
                >
                    {mutation.isPending ? "Menyimpan..." : "Buat Invoice"}
                </button>
            </div>
        </form>
    );
};
export default InvoiceForm;

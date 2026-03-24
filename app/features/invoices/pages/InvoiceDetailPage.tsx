import { Link, useParams, useSearchParams } from "react-router";
import { useInvoiceDetail } from "../hooks/useInvoiceDetail";
import InvoiceNotFound from "~/error/InvoiceNotFound";
import { useUpdateInvoiceStatus } from "../hooks/useUpdateInvoiceStatus";
import { ArrowLeft, ChevronLeft, Dice1 } from "lucide-react";
import { Skeleton } from "~/shared/components/Skeleton";

const InvoiceDetailPage = () => {
    const { id } = useParams();

    const { data, isLoading, isError } = useInvoiceDetail(id!);

    const mutation = useUpdateInvoiceStatus();

    if (isLoading) {
        return (
            <div className="p-6 space-y-6">
                <div className="flex">
                    <Skeleton className="w-48 h-12" />
                    <div className="flex gap-4 ml-auto">
                        <Skeleton className="w-24 h-12" />
                        <Skeleton className="w-24 h-12" />
                    </div>
                </div>
                <Skeleton className="w-full h-40" />
                <Skeleton className="w-full h-40" />
                <Skeleton className="w-full h-12" />
            </div>
        );
    }

    if (isError || !data) {
        return <InvoiceNotFound />;
    }

    const handleMarkAsPaid = () => {
        mutation.mutate({
            id: data.id,
            status: "paid",
        });
    };
    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center justify-center">
                    <Link to={"/invoices"}>
                        <ChevronLeft className="w-6" />
                    </Link>
                    <h1 className="text-xl font-bold">Invoice of {data.id}</h1>
                </div>

                <div className="flex gap-2">
                    {(data.status === "unpaid" ||
                        data.status === "overdue") && (
                        <button
                            onClick={handleMarkAsPaid}
                            disabled={mutation.isPending}
                            className="bg-green-600 text-white px-4 py-2 rounded"
                        >
                            {mutation.isPending
                                ? "Processing..."
                                : "Tandai Lunas"}
                        </button>
                    )}

                    <button
                        onClick={() => console.log("Download PDF:", data.id)}
                        className="border px-4 py-2 rounded"
                    >
                        Download PDF
                    </button>
                </div>
            </div>

            {/* Customer Info */}
            <div className="border rounded p-4 space-y-2">
                <h2 className="font-semibold text-lg">Customer Info</h2>
                <p>
                    <span className="text-gray-500">Customer ID:</span>{" "}
                    {data.customer_id}
                </p>
                <p>
                    <span className="text-gray-500">Status:</span> {data.status}
                </p>
                <p>
                    <span className="text-gray-500">Due Date:</span>{" "}
                    {data.due_date}
                </p>
            </div>

            {/* Items Breakdown */}
            <div className="border rounded p-4">
                <h2 className="font-semibold text-lg mb-4">Item Usage</h2>

                <div className="space-y-2">
                    {data.items.map((item: any, i: number) => {
                        const subtotal = item.qty * item.price;

                        return (
                            <div
                                key={i}
                                className="flex justify-between border-b pb-2"
                            >
                                <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-gray-500">
                                        {item.qty} {item.unit} × Rp{" "}
                                        {item.price.toLocaleString()}
                                    </p>
                                </div>

                                <div className="font-medium">
                                    Rp {subtotal.toLocaleString()}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center border-t pt-4">
                <span className="text-lg font-semibold">Total Tagihan</span>
                <span className="text-xl font-bold">
                    Rp {data.amount.toLocaleString()}
                </span>
            </div>
        </div>
    );
};
export default InvoiceDetailPage;

import { Skeleton } from "~/shared/components/Skeleton";

type Props = {
    summary:
        | {
              totalRevenue: number;
              totalUnpaid: number;
              totalOverdue: number;
              totalInvoices: number;
          }
        | undefined;
    isLoading: boolean;
};

type CardProps = {
    label: string;
    value: number;
    isCurrency?: boolean;
};

function formatCurrency(val: number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(val);
}

const Card = ({ label, value, isCurrency = true }: CardProps) => {
    return (
        <div className="bg-white rounded-xl p-5 shadow-sm">
            <p className="text-sm text-gray-500">{label}</p>

            <h2 className="text-xl font-bold">
                {value ? (isCurrency ? formatCurrency(value) : value) : 0}
            </h2>
        </div>
    );
};

const SummaryCards = ({ summary, isLoading }: Props) => {
    const items = [
        {
            label: "Revenue",
            value: summary?.totalRevenue || 0,
        },
        {
            label: "Unpaid",
            value: summary?.totalUnpaid || 0,
        },
        {
            label: "Overdue",
            value: summary?.totalOverdue || 0,
        },
        {
            label: "Invoices",
            value: summary?.totalInvoices || 0,
            isCurrency: false,
        },
    ];

    return isLoading && !summary ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item) => (
                <Skeleton key={item.label} className="h-24 w-full" />
            ))}
        </div>
    ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item) => (
                <Card key={item.label} {...item} />
            ))}
        </div>
    );
};
export default SummaryCards;

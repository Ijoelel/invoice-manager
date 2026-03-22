import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Skeleton } from "~/shared/components/Skeleton";

type Props = {
    distribution:
        | {
              paid: number;
              unpaid: number;
              overdue: number;
          }
        | undefined;
    isLoading: boolean;
};

const COLORS = {
    paid: "#16a34a",
    unpaid: "#facc15",
    overdue: "#ef4444",
};

export default function StatusChart({ distribution, isLoading }: Props) {
    const chartData = [
        { name: "Paid", value: distribution?.paid || 0, fill: COLORS.paid },
        {
            name: "Unpaid",
            value: distribution?.unpaid || 0,
            fill: COLORS.unpaid,
        },
        {
            name: "Overdue",
            value: distribution?.overdue || 0,
            fill: COLORS.overdue,
        },
    ];

    return isLoading && !distribution ? (
        <Skeleton className="h-24 w-full" />
    ) : (
        <div className="w-full bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-sm font-bold mb-4">Invoice Status</h2>

            <div className="h-62.5">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={4}
                            fill="blue"
                        />
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="mt-4 space-y-2 text-sm">
                {chartData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{
                                background: item.fill,
                            }}
                        />
                        <span>{item.name}</span>
                        <span className="ml-auto font-semibold">
                            {item.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

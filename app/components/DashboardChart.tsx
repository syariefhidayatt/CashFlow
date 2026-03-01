"use client";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";

interface Props {
  income: number;
  expense: number;
}

export default function DashboardChart({ income, expense }: Props) {
  const data = [
    { name: "Pemasukan", value: income, fill: "#16a34a" },
    { name: "Pengeluaran", value: expense, fill: "#dc2626" },
  ];

  if (income === 0 && expense === 0) {
    return (
      <p className="text-center text-gray-500 py-10">
        Belum ada data transaksi.
      </p>
    );
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          />
          <Tooltip
            formatter={(value: number | string | undefined) =>
              `Rp ${Number(value).toLocaleString("id-ID")}`
            }
          />
          <Legend />
          <Label position="center" fill="#666">
            Balance
          </Label>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

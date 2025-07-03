import { Sale } from "@/lib/sales";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface SalesChartProps {
  sales: Sale[];
}

export function SalesChart({ sales }: SalesChartProps) {
  // Agrupa vendas por data
  const data = Object.values(
    sales.reduce((acc, s) => {
      acc[s.date] = acc[s.date] || { date: s.date, total: 0 };
      acc[s.date].total += s.value;
      return acc;
    }, {} as Record<string, { date: string; total: number }>)
  );

  return (
    <div className="w-full h-64 bg-white border-2 border-gray-200 shadow-md rounded-lg p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip formatter={(v: number) => `R$ ${v.toFixed(2)}`} />
          <Bar dataKey="total" fill="#1976D2" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
} 
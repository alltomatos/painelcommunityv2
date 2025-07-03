import { Sale } from "@/lib/sales";
import { Button } from "@/components/ui/button";

interface SalesTableProps {
  sales: Sale[];
}

export function SalesTable({ sales }: SalesTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg text-sm">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-3 py-2 font-bold text-gray-900 border-b">ID</th>
            <th className="px-3 py-2 font-bold text-gray-900 border-b">Plugin</th>
            <th className="px-3 py-2 font-bold text-gray-900 border-b">Comprador</th>
            <th className="px-3 py-2 font-bold text-gray-900 border-b">Valor</th>
            <th className="px-3 py-2 font-bold text-gray-900 border-b">Status</th>
            <th className="px-3 py-2 font-bold text-gray-900 border-b">Data</th>
            <th className="px-3 py-2 font-bold text-gray-900 border-b">Token</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((s) => (
            <tr key={s.id} className="border-b last:border-b-0">
              <td className="px-3 py-2 text-center">{s.id}</td>
              <td className="px-3 py-2">{s.plugin}</td>
              <td className="px-3 py-2">{s.buyer}</td>
              <td className="px-3 py-2">R$ {s.value.toFixed(2)}</td>
              <td className="px-3 py-2">
                <span className={`px-2 py-1 rounded font-bold text-xs border-2 ${
                  s.status === "pago"
                    ? "bg-green-100 text-green-700 border-green-300"
                    : s.status === "pendente"
                    ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                    : "bg-red-100 text-red-700 border-red-300"
                }`}>
                  {s.status}
                </span>
              </td>
              <td className="px-3 py-2">{s.date}</td>
              <td className="px-3 py-2 flex items-center gap-2">
                <span className="truncate max-w-[100px] inline-block align-middle">{s.token}</span>
                <Button size="sm" variant="outline" onClick={() => {navigator.clipboard.writeText(s.token)}}>
                  Copiar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 
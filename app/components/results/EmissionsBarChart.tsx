"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface YearRow {
  year: number;
  total: number;
}

export default function EmissionsBarChart({ rows }: { rows: YearRow[] }) {
  if (rows.length === 0) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-sm flex flex-col justify-center min-h-[280px]">
        <p className="text-label-bold font-label-bold text-outline mb-4">Emisiones por Año (Total kg)</p>
        <p className="text-body-md text-on-surface-variant">No hay datos para el período seleccionado.</p>
      </div>
    );
  }

  const data = rows.map((r) => ({ year: String(r.year), total: r.total }));

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm">
      <p className="text-label-bold font-label-bold text-outline mb-6">Emisiones por Año (Total kg)</p>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barCategoryGap="40%">
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e8f0e9" />
          <XAxis dataKey="year" tick={{ fontSize: 12, fontWeight: 600, fill: "#6c7a71" }} axisLine={false} tickLine={false} />
          <YAxis hide />
          <Tooltip
            formatter={(value) => [
              Number(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " kg",
              "Total CO2e",
            ]}
          />
          <Bar dataKey="total" fill="#10b981" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

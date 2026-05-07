"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

interface MonthRow {
  month: number;
  total: number;
}

export default function EmissionsMonthlyChart({ monthlyRows, year }: { monthlyRows: MonthRow[]; year: number }) {
  if (monthlyRows.length === 0) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-sm flex flex-col justify-center min-h-[280px]">
        <p className="text-label-bold font-label-bold text-outline mb-4">Emisiones por Mes — {year} (kg CO2e)</p>
        <p className="text-body-md text-on-surface-variant">No hay datos para el período seleccionado.</p>
      </div>
    );
  }

  const data = monthlyRows.map((r) => ({
    month: MONTH_LABELS[r.month - 1],
    total: r.total,
  }));

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm">
      <p className="text-label-bold font-label-bold text-outline mb-6">Emisiones por Mes — {year} (kg CO2e)</p>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barCategoryGap="30%">
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e8f0e9" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fontWeight: 600, fill: "#6c7a71" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis hide />
          <Tooltip
            formatter={(value) => [
              Number(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " kg",
              "CO2e",
            ]}
          />
          <Bar dataKey="total" fill="#10b981" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

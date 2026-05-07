"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface Breakdown {
  activityId: number;
  name: string;
  co2e: number;
  percentage: number;
}

const COLORS = ["#10b981", "#3f465c", "#fc7c78", "#4edea3", "#565e74"];

export default function EmissionsDonutChart({ breakdown }: { breakdown: Breakdown[] }) {
  if (breakdown.length === 0) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-sm flex flex-col items-center justify-center min-h-[280px]">
        <p className="text-label-bold font-label-bold text-outline w-full mb-4">Distribución por Categoría</p>
        <p className="text-body-md text-on-surface-variant">No hay datos para el período seleccionado.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm flex flex-col items-center">
      <p className="text-label-bold font-label-bold text-outline mb-6 w-full">Distribución por Categoría</p>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={breakdown}
            dataKey="co2e"
            nameKey="name"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
          >
            {breakdown.map((entry, index) => (
              <Cell key={entry.activityId} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [
              Number(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " kg",
            ]}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap justify-center gap-4 mt-2">
        {breakdown.map((entry, index) => (
          <div key={entry.activityId} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-xs font-label-bold text-on-surface">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

interface Activity {
  activityId: number;
  name: string;
  unit: string;
  co2e: number;
}

interface YearRow {
  year: number;
  activities: Activity[];
  total: number;
}

function fmt(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function EmissionsTable({ rows }: { rows: YearRow[] }) {
  if (rows.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100">
          <h2 className="text-h2 font-h2 text-on-surface">Emisiones por Año</h2>
        </div>
        <p className="px-6 py-6 text-body-md text-on-surface-variant">No hay datos para el período seleccionado.</p>
      </div>
    );
  }

  const allActivities = rows[0].activities.map((a) => ({ activityId: a.activityId, name: a.name, unit: a.unit }));

  const totalsPerActivity: Record<number, number> = {};
  for (const row of rows) {
    for (const a of row.activities) {
      totalsPerActivity[a.activityId] = (totalsPerActivity[a.activityId] ?? 0) + a.co2e;
    }
  }
  const grandTotal = rows.reduce((sum, r) => sum + r.total, 0);

  function handleExportCSV() {
    const header = ["Year", ...allActivities.map((a) => `${a.name} (${a.unit})`), "Total CO2e (kg)"];
    const dataRows = rows.map((row) => {
      const actMap: Record<number, number> = {};
      for (const a of row.activities) actMap[a.activityId] = a.co2e;
      return [row.year, ...allActivities.map((a) => actMap[a.activityId] ?? 0), row.total];
    });
    const totalRow = ["TOTAL", ...allActivities.map((a) => totalsPerActivity[a.activityId] ?? 0), grandTotal];
    const csv = [header, ...dataRows, totalRow].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "emissions.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
        <h2 className="text-h2 font-h2 text-on-surface">Emisiones por Año</h2>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 text-primary font-label-bold text-label-bold text-sm hover:underline"
        >
          <span className="material-symbols-outlined text-base">download</span>
          Exportar CSV
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white border-b border-slate-100">
              <th className="px-6 py-4 font-label-bold text-label-bold text-outline">Year</th>
              {allActivities.map((a) => (
                <th key={a.activityId} className="px-6 py-4 font-label-bold text-label-bold text-outline">
                  {a.name} ({a.unit})
                </th>
              ))}
              <th className="px-6 py-4 font-label-bold text-label-bold text-outline bg-emerald-50/50">Total CO2e</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {rows.map((row) => {
              const actMap: Record<number, number> = {};
              for (const a of row.activities) actMap[a.activityId] = a.co2e;
              return (
                <tr key={row.year} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-on-surface">{row.year}</td>
                  {allActivities.map((a) => (
                    <td key={a.activityId} className="px-6 py-4 text-on-surface">
                      {fmt(actMap[a.activityId] ?? 0)}
                    </td>
                  ))}
                  <td className="px-6 py-4 font-bold text-primary bg-emerald-50/30">{fmt(row.total)}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="bg-primary text-on-primary">
            <tr>
              <td className="px-6 py-4 font-bold">TOTAL</td>
              {allActivities.map((a) => (
                <td key={a.activityId} className="px-6 py-4 font-bold">
                  {fmt(totalsPerActivity[a.activityId] ?? 0)}
                </td>
              ))}
              <td className="px-6 py-4 font-black text-lg">{fmt(grandTotal)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

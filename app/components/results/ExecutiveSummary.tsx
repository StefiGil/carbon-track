interface Breakdown {
  activityId: number;
  name: string;
  co2e: number;
  percentage: number;
}

interface ExecutiveSummaryProps {
  totalCo2e: number;
  breakdown: Breakdown[];
}

const BAR_COLORS: Record<string, string> = {
  Electricity: "bg-primary",
  Gas: "bg-on-surface",
  Fuel: "bg-error",
};

export default function ExecutiveSummary({ totalCo2e, breakdown }: ExecutiveSummaryProps) {
  const tonnes = (totalCo2e / 1000).toFixed(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-surface rounded-2xl border border-outline-variant p-6 space-y-3">
        <div className="flex items-center gap-2 text-primary">
          <span className="material-symbols-outlined text-base">eco</span>
          <span className="text-label-sm font-semibold">Executive Summary</span>
        </div>
        <div>
          <p className="text-h1 font-semibold text-on-surface tracking-tight">
            {totalCo2e.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            <span className="text-body-lg font-normal text-on-surface-variant ml-2">kg CO2e</span>
          </p>
          <p className="text-body-md text-on-surface-variant mt-1">
            Total calculated footprint for the selected period.
          </p>
        </div>
        <span className="inline-block bg-primary-fixed text-on-primary-fixed text-label-sm font-medium px-3 py-1 rounded-full">
          Equates to: {tonnes} tonnes CO2e
        </span>
      </div>

      <div className="bg-surface rounded-2xl border border-outline-variant p-6 space-y-4">
        <p className="text-label-sm font-semibold text-on-surface">Emissions Breakdown</p>
        {breakdown.length === 0 ? (
          <p className="text-label-sm text-on-surface-variant">No data available for the selected period.</p>
        ) : (
          <div className="space-y-3">
            {breakdown.map((item) => (
              <div key={item.activityId}>
                <div className="flex justify-between text-label-sm mb-1">
                  <span className="text-on-surface">{item.name}</span>
                  <span className="font-semibold text-on-surface">{item.percentage}%</span>
                </div>
                <div className="h-2 rounded-full bg-surface-variant overflow-hidden">
                  <div
                    className={`h-full rounded-full ${BAR_COLORS[item.name] ?? "bg-primary"} transition-all duration-500`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

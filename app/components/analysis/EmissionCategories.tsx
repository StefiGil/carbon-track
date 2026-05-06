import type { Activity } from "./types";

interface Props {
  activities: Activity[];
  loading: boolean;
  error: boolean;
  selected: Set<number>;
  onToggle: (id: number) => void;
}

const ACTIVITY_ICONS: Record<string, string> = {
  Electricity: "bolt",
  Gas: "local_fire_department",
  Fuel: "local_gas_station",
};

const ACTIVITY_DESCRIPTIONS: Record<string, string> = {
  Electricity: "Scope 2 emissions",
  Gas: "Heating & cooling",
  Fuel: "Institution vehicles",
};

export default function EmissionCategories({ activities, loading, error, selected, onToggle }: Props) {
  return (
    <div className="space-y-3 border-t border-outline-variant pt-6">
      <label className="text-label-sm text-on-surface-variant block">Emission Categories</label>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 bg-surface-container-low rounded-lg animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <p className="text-error text-label-sm">Failed to load emission categories</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {activities.map((activity) => {
            const isSelected = selected.has(activity.id);
            const icon = ACTIVITY_ICONS[activity.name] ?? "category";
            const description = ACTIVITY_DESCRIPTIONS[activity.name] ?? "";

            return (
              <label key={activity.id} className="relative cursor-pointer">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onToggle(activity.id)}
                  className="sr-only peer"
                />
                <div
                  className={`h-full rounded-lg border p-4 transition-all ${
                    isSelected
                      ? "border-primary/40 bg-primary-fixed/20 shadow-[0_4px_12px_rgba(5,150,105,0.08)]"
                      : "border-outline-variant bg-surface hover:border-outline hover:bg-surface-container-low"
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <span
                      className={`material-symbols-outlined text-[28px] ${
                        isSelected ? "text-primary" : "text-on-surface-variant"
                      }`}
                      style={{ fontVariationSettings: "'wght' 400" }}
                    >
                      {icon}
                    </span>
                    {isSelected ? (
                      <span
                        className="material-symbols-outlined text-primary text-[20px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-outline-variant" />
                    )}
                  </div>
                  <h3 className="text-[18px] font-medium text-on-surface">{activity.name}</h3>
                  <p className="text-caption text-on-surface-variant mt-1">{description}</p>
                </div>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

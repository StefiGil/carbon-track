import type { Activity } from "./types";

interface Props {
  activities: Activity[];
  loading: boolean;
  error: boolean;
  selected: Set<number>;
  onToggle: (id: number) => void;
}

const ACTIVITY_ORDER: Record<string, number> = {
  Electricity: 0,
  Gas: 1,
  Diesel: 2,
  Gasoline: 3,
};

const ACTIVITY_ICONS: Record<string, string> = {
  Electricity: "bolt",
  Gas: "local_fire_department",
  Diesel: "local_shipping",
  Gasoline: "local_gas_station",
};

const ACTIVITY_DESCRIPTIONS: Record<string, string> = {
  Electricity: "Scope 2 emissions",
  Gas: "Heating & cooling",
  Diesel: "Diesel vehicles & generators",
  Gasoline: "Gasoline vehicles",
};

const ACTIVITY_COLORS: Record<string, {
  unselected: { bg: string; border: string; icon: string; text: string };
  selected:   { bg: string; border: string; icon: string; text: string };
}> = {
  Electricity: {
    unselected: { bg: "bg-indigo-50/50",  border: "border-indigo-100",  icon: "text-indigo-300", text: "text-indigo-300" },
    selected:   { bg: "bg-indigo-100",    border: "border-indigo-300",  icon: "text-indigo-500", text: "text-indigo-400" },
  },
  Gas: {
    unselected: { bg: "bg-amber-50/50",   border: "border-amber-100",   icon: "text-orange-300", text: "text-orange-300" },
    selected:   { bg: "bg-amber-100",     border: "border-amber-300",   icon: "text-orange-500", text: "text-orange-400" },
  },
  Diesel: {
    unselected: { bg: "bg-slate-50",      border: "border-slate-200",   icon: "text-slate-300",  text: "text-slate-400"  },
    selected:   { bg: "bg-slate-200",     border: "border-slate-400",   icon: "text-slate-500",  text: "text-slate-500"  },
  },
  Gasoline: {
    unselected: { bg: "bg-rose-50/50",    border: "border-rose-100",    icon: "text-rose-300",   text: "text-rose-300"   },
    selected:   { bg: "bg-rose-100",      border: "border-rose-300",    icon: "text-rose-500",   text: "text-rose-400"   },
  },
};

export default function EmissionCategories({ activities, loading, error, selected, onToggle }: Props) {
  return (
    <div className="space-y-3 border-t border-outline-variant pt-6">
      <label className="text-label-sm text-on-surface-variant block">Emission Categories</label>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-surface-container-low rounded-lg animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <p className="text-error text-label-sm">Failed to load emission categories</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[...activities].sort((a, b) => (ACTIVITY_ORDER[a.name] ?? 99) - (ACTIVITY_ORDER[b.name] ?? 99)).map((activity) => {
            const isSelected = selected.has(activity.id);
            const icon = ACTIVITY_ICONS[activity.name] ?? "category";
            const description = ACTIVITY_DESCRIPTIONS[activity.name] ?? "";
            const fallback = { bg: "bg-surface", border: "border-outline-variant", icon: "text-on-surface-variant", text: "text-on-surface-variant" };
            const colors = ACTIVITY_COLORS[activity.name] ?? { unselected: fallback, selected: fallback };
            const c = isSelected ? colors.selected : colors.unselected;

            return (
              <label key={activity.id} className="relative cursor-pointer">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onToggle(activity.id)}
                  className="sr-only peer"
                />
                <div
                  className={`h-full rounded-lg border p-4 transition-all ${c.bg} ${c.border} ${
                    isSelected ? "shadow-[0_4px_12px_rgba(0,0,0,0.08)]" : "hover:brightness-95"
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <span
                      className={`material-symbols-outlined text-[28px] ${c.icon}`}
                      style={{ fontVariationSettings: "'wght' 400" }}
                    >
                      {icon}
                    </span>
                    {isSelected ? (
                      <span
                        className={`material-symbols-outlined text-[20px] ${c.icon}`}
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-outline-variant" />
                    )}
                  </div>
                  <h3 className="text-[18px] font-medium text-on-surface">{activity.name}</h3>
                  <p className={`text-caption mt-1 ${c.text}`}>{description}</p>
                </div>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

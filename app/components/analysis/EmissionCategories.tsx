import { ACTIVITIES_IN_ORDER, ACTIVITY_DISPLAY } from "@/lib/data/activities";
import type { Activity } from "./types";

interface Props {
  activities: Activity[];
  loading: boolean;
  error: boolean;
  selected: Set<number>;
  disabled: boolean;
  onToggle: (id: number) => void;
}

const DISABLED_COLORS = { bg: "bg-surface-container-low", border: "border-outline-variant", icon: "text-slate-300", text: "text-slate-400" };

export default function EmissionCategories({ activities, loading, error, selected, disabled: awaitingUpload, onToggle }: Props) {
  // If the API fails, show the static categories as inactive cards next to the error.
  const items = error
    ? ACTIVITIES_IN_ORDER.map((a, index) => ({ id: -(index + 1), name: a.name }))
    : activities;
  const disabled = awaitingUpload || error;

  return (
    <div className="space-y-3 border-t border-outline-variant pt-6">
      <label className="text-label-sm text-on-surface-variant block">Emission Categories</label>
      {error && <p className="text-error text-label-sm">Failed to load emission categories</p>}
      {awaitingUpload && !loading && !error && (
        <p className="text-caption text-on-surface-variant flex items-center gap-1">
          <span className="material-symbols-outlined text-base">lock</span>
          Categories activate once you upload your Excel file.
        </p>
      )}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-surface-container-low rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[...items].sort((a, b) => (ACTIVITY_DISPLAY[a.name]?.order ?? 99) - (ACTIVITY_DISPLAY[b.name]?.order ?? 99)).map((activity) => {
            const isSelected = !disabled && selected.has(activity.id);
            const display = ACTIVITY_DISPLAY[activity.name];
            const icon = display?.icon ?? "category";
            const description = display?.description ?? "";
            const fallback = { bg: "bg-surface", border: "border-outline-variant", icon: "text-on-surface-variant", text: "text-on-surface-variant" };
            const colors = display?.colors ?? { unselected: fallback, selected: fallback };
            const c = disabled ? DISABLED_COLORS : isSelected ? colors.selected : colors.unselected;

            return (
              <label key={activity.id} className={`relative ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}>
                <input
                  type="checkbox"
                  checked={isSelected}
                  disabled={disabled}
                  onChange={() => onToggle(activity.id)}
                  className="sr-only peer"
                />
                <div
                  className={`h-full rounded-lg border p-4 transition-all ${c.bg} ${c.border} ${
                    isSelected ? "shadow-[0_4px_12px_rgba(0,0,0,0.08)]" : disabled ? "" : "hover:brightness-95"
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
                  <h3 className={`text-[18px] font-medium ${disabled ? "text-slate-400" : "text-on-surface"}`}>{activity.name}</h3>
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

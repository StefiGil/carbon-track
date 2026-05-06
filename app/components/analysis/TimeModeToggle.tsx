import type { TimeMode } from "./types";

interface Props {
  value: TimeMode;
  onChange: (mode: TimeMode) => void;
}

const OPTIONS: { label: string; value: TimeMode }[] = [
  { label: "By years", value: "years" },
  { label: "By months (within a year)", value: "months" },
];

export default function TimeModeToggle({ value, onChange }: Props) {
  return (
    <div className="space-y-2">
      <label className="text-label-sm text-on-surface-variant block">Time Analysis Mode</label>
      <div className="flex bg-surface-container rounded-lg p-1 border border-outline-variant/50">
        {OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`flex-1 py-2 px-4 rounded-md text-label-sm text-center transition-all ${
              value === option.value
                ? "bg-surface shadow-sm text-primary font-medium"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

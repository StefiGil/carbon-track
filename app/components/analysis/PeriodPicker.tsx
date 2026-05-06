import type { TimeMode } from "./types";

interface Props {
  timeMode: TimeMode;
  yearFrom: number;
  yearTo: number;
  startMonth: number;
  endMonth: number;
  onYearFromChange: (year: number) => void;
  onYearToChange: (year: number) => void;
  onStartMonthChange: (month: number) => void;
  onEndMonthChange: (month: number) => void;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const currentYear = new Date().getFullYear();
export const AVAILABLE_YEARS = Array.from({ length: 6 }, (_, i) => currentYear - 1 - i);

function periodLabel(timeMode: TimeMode, yearFrom: number, yearTo: number, startMonth: number, endMonth: number) {
  if (timeMode === "months") return `${MONTHS[startMonth]} – ${MONTHS[endMonth]} ${yearFrom}`;
  return yearFrom === yearTo ? String(yearFrom) : `${yearFrom} – ${yearTo}`;
}

function YearSelect({ value, onChange }: { value: number; onChange: (y: number) => void }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full appearance-none bg-surface border border-outline-variant rounded-lg pl-10 pr-10 py-3 text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer"
      >
        {AVAILABLE_YEARS.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
        calendar_today
      </span>
      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
        expand_more
      </span>
    </div>
  );
}

function MonthSelect({ value, onChange }: { value: number; onChange: (m: number) => void }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full appearance-none bg-surface border border-outline-variant rounded-lg px-4 py-3 text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer"
      >
        {MONTHS.map((m, i) => (
          <option key={m} value={i}>{m}</option>
        ))}
      </select>
      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
        expand_more
      </span>
    </div>
  );
}

export default function PeriodPicker({
  timeMode,
  yearFrom,
  yearTo,
  startMonth,
  endMonth,
  onYearFromChange,
  onYearToChange,
  onStartMonthChange,
  onEndMonthChange,
}: Props) {
  return (
    <div className="space-y-3 border-t border-outline-variant pt-6">
      <label className="text-label-sm text-on-surface-variant block">Select Period</label>
      {timeMode === "months" ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <YearSelect value={yearFrom} onChange={onYearFromChange} />
          <MonthSelect value={startMonth} onChange={onStartMonthChange} />
          <MonthSelect value={endMonth} onChange={onEndMonthChange} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <span className="text-caption text-on-surface-variant">From</span>
            <YearSelect value={yearFrom} onChange={onYearFromChange} />
          </div>
          <div className="space-y-1">
            <span className="text-caption text-on-surface-variant">To</span>
            <YearSelect value={yearTo} onChange={onYearToChange} />
          </div>
        </div>
      )}

      <div className="p-3 bg-primary-fixed/30 rounded-lg border border-primary/20">
        <p className="text-on-primary-fixed font-medium text-sm">
          Period selected: {periodLabel(timeMode, yearFrom, yearTo, startMonth, endMonth)}
        </p>
      </div>
    </div>
  );
}

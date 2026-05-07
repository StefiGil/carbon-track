import type { TimeMode } from "./types";

interface Props {
  timeMode: TimeMode;
  yearFrom: number;
  yearTo: number;
  startMonth: number;
  endMonth: number;
  availableYears: number[];
  onYearFromChange: (year: number) => void;
  onYearToChange: (year: number) => void;
  onStartMonthChange: (month: number) => void;
  onEndMonthChange: (month: number) => void;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function periodLabel(timeMode: TimeMode, yearFrom: number, yearTo: number, startMonth: number, endMonth: number) {
  if (timeMode === "months") return `${MONTHS[startMonth]} – ${MONTHS[endMonth]} ${yearFrom}`;
  return yearFrom === yearTo ? String(yearFrom) : `${yearFrom} – ${yearTo}`;
}

function YearSelect({ value, years, onChange }: { value: number; years: number[]; onChange: (y: number) => void }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full appearance-none bg-surface border border-outline-variant rounded-lg pl-10 pr-10 py-3 text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer"
      >
        {value === 0 && (
          <option value={0} disabled>No years available. Please upload your consumption Excel file or check that it has the correct format.</option>
        )}
        {years.map((y) => (
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

function MonthSelect({ value, invalid, onChange }: { value: number; invalid?: boolean; onChange: (m: number) => void }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`w-full appearance-none bg-surface border rounded-lg px-4 py-3 text-body-md text-on-surface focus:outline-none focus:ring-4 transition-all cursor-pointer ${
          invalid
            ? "border-error focus:border-error focus:ring-error/10"
            : "border-outline-variant focus:border-primary focus:ring-primary/10"
        }`}
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
  availableYears,
  onYearFromChange,
  onYearToChange,
  onStartMonthChange,
  onEndMonthChange,
}: Props) {
  const fromYears = availableYears.filter((y) => y <= yearTo);
  const toYears = availableYears.filter((y) => y >= yearFrom);
  const monthRangeInvalid = timeMode === "months" && startMonth > endMonth;

  if (availableYears.length === 0) {
    return (
      <div className="space-y-3 border-t border-outline-variant pt-6">
        <label className="text-label-sm text-on-surface-variant block">Select Period</label>
        <div className="flex items-start gap-3 p-4 bg-surface-variant rounded-lg border border-outline-variant">
          <span className="material-symbols-outlined text-on-surface-variant text-xl mt-0.5">info</span>
          <div>
            <p className="text-body-sm text-on-surface-variant mt-0.5">
             No years available. Please upload your consumption Excel file or check that it has the correct format.            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 border-t border-outline-variant pt-6">
      <label className="text-label-sm text-on-surface-variant block">Select Period</label>
      {timeMode === "months" ? (
        <div className="space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <YearSelect value={yearFrom} years={availableYears} onChange={onYearFromChange} />
            <MonthSelect value={startMonth} invalid={monthRangeInvalid} onChange={onStartMonthChange} />
            <MonthSelect value={endMonth} invalid={monthRangeInvalid} onChange={onEndMonthChange} />
          </div>
          {monthRangeInvalid && (
            <p className="text-error text-xs">The start month cannot be after the end month.</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <span className="text-caption text-on-surface-variant">From</span>
            <YearSelect value={yearFrom} years={fromYears} onChange={onYearFromChange} />
          </div>
          <div className="space-y-1">
            <span className="text-caption text-on-surface-variant">To</span>
            <YearSelect value={yearTo} years={toYears} onChange={onYearToChange} />
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

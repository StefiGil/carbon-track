import type { Institution } from "./types";

interface Props {
  institutions: Institution[];
  loading: boolean;
  error: boolean;
  value: string;
  onChange: (id: string) => void;
}

export default function InstitutionSelect({ institutions, loading, error, value, onChange }: Props) {
  return (
    <div className="space-y-2">
      <label className="text-label-sm text-on-surface-variant block">Institution Type</label>
      <div className="relative">
        {loading ? (
          <div className="h-12 bg-surface-container-low rounded-lg animate-pulse" />
        ) : error ? (
          <p className="text-error text-label-sm">Failed to load institutions</p>
        ) : (
          <>
            <select
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full appearance-none bg-surface border border-outline-variant rounded-lg px-4 py-3 text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer"
            >
              {institutions.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.name}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
              expand_more
            </span>
          </>
        )}
      </div>
    </div>
  );
}

interface Props {
  value: string;
  onChange: (name: string) => void;
}

export default function InstitutionNameInput({ value, onChange }: Props) {
  return (
    <div className="space-y-2">
      <label htmlFor="institution-name" className="text-label-sm text-on-surface-variant block">
        Institution Name (optional)
      </label>
      <input
        id="institution-name"
        type="text"
        value={value}
        maxLength={100}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
      />
    </div>
  );
}

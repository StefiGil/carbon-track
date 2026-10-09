import { measured } from "@/lib/data/about/content";
import { ACTIVITIES_IN_ORDER } from "@/lib/data/activities";
import SectionHeading from "./SectionHeading";

export default function MeasuredSources() {
  return (
    <section className="space-y-6">
      <SectionHeading title={measured.title} />
      <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-label-sm">
            <thead className="bg-surface-variant border-b border-outline-variant text-on-surface-variant text-caption font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">{measured.columns.source}</th>
                <th className="px-6 py-4">{measured.columns.scope}</th>
                <th className="px-6 py-4">{measured.columns.unit}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-variant text-on-surface-variant">
              {ACTIVITIES_IN_ORDER.map((row) => (
                <tr key={row.name}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2.5 font-medium text-on-surface">
                      <span className="material-symbols-outlined text-primary text-lg">{row.icon}</span>
                      {row.label}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-caption font-medium border ${
                        row.scope === 2
                          ? "bg-primary-fixed/40 text-on-primary-fixed-variant border-primary-fixed-dim"
                          : "bg-surface-variant text-on-surface-variant border-outline-variant"
                      }`}
                    >
                      Scope {row.scope}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-caption">{row.unitLabel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3.5 bg-surface-variant/60 border-t border-outline-variant flex items-center gap-2 text-caption text-on-surface-variant">
          <span className="material-symbols-outlined text-base">info</span>
          {measured.footnote}
        </div>
      </div>
    </section>
  );
}

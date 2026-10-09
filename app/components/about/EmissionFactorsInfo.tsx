import { factors } from "@/lib/data/about/content";
import SectionHeading from "./SectionHeading";

export default function EmissionFactorsInfo() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <SectionHeading title={factors.title} />
        <p className="text-body-md text-on-surface-variant max-w-3xl">{factors.text}</p>
      </div>

      <div className="bg-surface-variant/80 border border-outline-variant rounded-xl p-5 flex items-start gap-4">
        <div className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-lg">schedule</span>
        </div>
        <div className="space-y-1">
          <h3 className="text-label-sm font-semibold text-on-surface tracking-tight">{factors.delay.title}</h3>
          <p className="text-label-sm text-on-surface-variant leading-relaxed">{factors.delay.text}</p>
        </div>
      </div>

      <details className="group border border-outline-variant rounded-xl bg-surface p-5">
        <summary className="cursor-pointer flex items-center justify-between font-semibold text-label-sm text-on-surface list-none">
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-lg">help_outline</span>
            {factors.som.title}
          </span>
          <span className="material-symbols-outlined text-secondary group-open:rotate-180 transition-transform">
            expand_more
          </span>
        </summary>
        <div className="pt-3 mt-3 border-t border-surface-variant text-label-sm text-on-surface-variant leading-relaxed space-y-2">
          {factors.som.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </details>
    </section>
  );
}

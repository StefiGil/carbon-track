import { howItWorks } from "@/lib/data/about/content";
import SectionHeading from "./SectionHeading";

export default function HowItWorks() {
  return (
    <section className="space-y-6">
      <SectionHeading title={howItWorks.title} />
      <div className="bg-surface border border-outline-variant rounded-xl p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {howItWorks.steps.map((step, index) => (
            <div
              key={step.title}
              className={`space-y-3 ${index > 0 ? "md:border-l md:border-surface-variant md:pl-6" : ""}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-primary text-on-primary text-caption font-semibold flex items-center justify-center shrink-0">
                  {index + 1}
                </span>
                <h3 className="text-body-md font-semibold text-on-surface tracking-tight">{step.title}</h3>
              </div>
              <p className="text-label-sm text-on-surface-variant leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

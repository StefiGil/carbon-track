import { whatItDoes } from "@/lib/data/about/content";
import SectionHeading from "./SectionHeading";

export default function WhatItDoes() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <SectionHeading title={whatItDoes.title} />
        <p className="text-body-md text-on-surface-variant max-w-3xl">{whatItDoes.text}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {whatItDoes.features.map((feature) => (
          <div key={feature.title} className="bg-surface border border-outline-variant rounded-xl p-6">
            <div className="w-10 h-10 rounded-lg bg-primary-fixed/40 text-primary flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-2xl">{feature.icon}</span>
            </div>
            <h3 className="text-body-lg font-semibold text-on-surface tracking-tight mb-2">{feature.title}</h3>
            <p className="text-label-sm text-on-surface-variant leading-relaxed">{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

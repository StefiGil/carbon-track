import Link from "next/link";
import { cta, intro } from "@/lib/data/about/content";
import NoticeBanner from "../components/about/NoticeBanner";
import WhatItDoes from "../components/about/WhatItDoes";
import HowItWorks from "../components/about/HowItWorks";
import MeasuredSources from "../components/about/MeasuredSources";
import EmissionFactorsInfo from "../components/about/EmissionFactorsInfo";
import References from "../components/about/References";

export default function AboutPage() {
  return (
    <main className="flex-1 w-full px-6 py-8 md:px-12 md:py-16 flex flex-col items-center">
      <div className="w-full max-w-[1000px] space-y-12">
        <div className="space-y-2">
          <h1 className="text-h1 font-semibold text-on-surface tracking-tight">{intro.title}</h1>
          <p className="text-body-lg text-on-surface-variant max-w-2xl">{intro.subtitle}</p>
        </div>

        <NoticeBanner />
        <WhatItDoes />
        <HowItWorks />
        <MeasuredSources />
        <EmissionFactorsInfo />
        <References />

        <div className="text-center pt-8 border-t border-outline-variant space-y-5">
          <p className="text-body-md text-on-surface-variant">{cta.text}</p>
          <Link
            href="/analysis"
            className="inline-flex items-center gap-2 bg-primary text-on-primary font-semibold px-6 py-3 rounded-xl hover:bg-primary-container transition-colors"
          >
            {cta.button}
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

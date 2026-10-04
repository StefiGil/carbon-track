import Image from "next/image";
import Link from "next/link";
import StepCard from "../components/guide/StepCard";

const templateFiles = {
  consumption: {
    name: "template-comsuption.xlsx",
    href: "https://pxckfwaqlatmvozcjnry.supabase.co/storage/v1/object/public/assets-public/template-comsuption.xlsx",
  },
};

function DownloadButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      download
      className="inline-flex items-center gap-2 bg-primary text-on-primary text-label-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-primary-container transition-colors mt-4"
    >
      <span className="material-symbols-outlined text-base">download</span>
      Download Template
    </a>
  );
}

function ExampleImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="rounded-xl overflow-hidden border border-outline-variant">
      {/* unoptimized: skip Next's image cache so a replaced screenshot shows up right away */}
      <Image src={src} alt={alt} width={480} height={280} unoptimized className="w-full h-auto object-cover" />
    </div>
  );
}

export default function GuidePage() {
  return (
    <main className="flex-1 w-full px-6 py-8 md:px-12 md:py-16 flex flex-col items-center">
      <div className="w-full max-w-[1000px] space-y-6">

        <div className="space-y-2 mb-6">
          <h1 className="text-h1 font-semibold text-on-surface tracking-tight">
            User Guide: How to prepare and upload your data
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-2xl">
            Follow these simple guide to ensure your environmental reporting is accurate,
            compliant, and ready for institutional analysis.
          </p>
        </div>

        <StepCard
          number={1}
          title="Preparation of consumption data"
          left={
            <div className="space-y-3">
              <p className="text-body-md text-on-surface-variant">
                Ensure your Excel file has these columns accurately formatted:
              </p>
              <p className="font-mono text-label-sm bg-surface-variant text-on-surface px-3 py-2 rounded-lg">
                year, month, electricity_kwh, gas_m3, diesel_l, gasoline_l
              </p>
              <DownloadButton href={templateFiles.consumption.href} />
            </div>
          }
          right={<ExampleImage src="https://pxckfwaqlatmvozcjnry.supabase.co/storage/v1/object/public/assets-public/comsuption-example.png" alt="Consumption data example" />}
        />

        <div className="text-center pt-4 space-y-5">
          <p className="text-body-md text-on-surface-variant">
            Your file is ready, head to the analysis page to upload it and generate your report.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary text-on-primary font-semibold px-6 py-3 rounded-xl hover:bg-primary-container transition-colors"
          >
            Go to Analysis
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>

      </div>
    </main>
  );
}

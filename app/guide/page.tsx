import Image from "next/image";
import Link from "next/link";
import StepCard from "../components/guide/StepCard";

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
      <Image src={src} alt={alt} width={480} height={280} className="w-full h-auto object-cover" />
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
            Follow these three simple steps to ensure your environmental reporting is accurate,
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
                institution, year, month, electricity_kwh, gas_m3, fuel_l
              </p>
              <DownloadButton href="/example.xlsx" />
            </div>
          }
          right={<ExampleImage src="/example-consumption.png" alt="Consumption data example" />}
        />

        <StepCard
          number={2}
          title="Emission Factors"
          reverse
          left={
            <div className="space-y-3">
              <p className="text-body-md text-on-surface-variant">
                Your Excel should include specific calculation constants:
              </p>
              <p className="font-mono text-label-sm bg-surface-variant text-on-surface px-3 py-2 rounded-lg">
                year, electricity_factor, gas_factor, fuel_factor
              </p>
              <div className="flex items-start gap-2 bg-primary-fixed text-on-primary-fixed text-label-sm px-3 py-2.5 rounded-lg mt-2">
                <span className="material-symbols-outlined text-base shrink-0 mt-0.5">info</span>
                <span>You can find these factors at the Secretaria de Energia.</span>
              </div>
              <DownloadButton href="/example.xlsx" />
            </div>
          }
          right={<ExampleImage src="/example-factors-data.png" alt="Emission factors example" />}
        />

        <StepCard
          number={3}
          title="Download your prepared data"
          left={
            <p className="text-body-md text-on-surface-variant">
              Once you have accurately filled in all the required information in the templates,
              download your Excel files. These files are now ready for institutional reporting
              and analysis.
            </p>
          }
          right={
            <div className="bg-surface-variant rounded-xl p-6 flex justify-center gap-10">
              {["factors-data.xlsx", "consumption-data.xlsx"].map((name) => (
                <div key={name} className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-full bg-primary-fixed flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-2xl">description</span>
                  </div>
                  <span className="text-caption text-on-surface-variant text-center">{name}</span>
                  <span className="text-caption text-on-surface-variant font-medium">Example</span>
                </div>
              ))}
            </div>
          }
        />

        <div className="text-center pt-4 space-y-5">
          <p className="text-body-md text-on-surface-variant">
            Your files are ready — head to the analysis page to upload them and generate your report.
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

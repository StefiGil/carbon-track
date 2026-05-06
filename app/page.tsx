import AnalysisConfigurator from "./components/analysis/AnalysisConfigurator";
import DataUpload from "./components/home/DataUpload";

export default function Home() {
  return (
    <main className="flex-1 w-full px-6 py-8 md:px-12 md:py-16 flex flex-col items-center">
        <div className="w-full max-w-[1000px] space-y-6">
          <div className="space-y-2 mb-6">
            <h1 className="text-h1 font-semibold text-on-surface tracking-tight">
              Carbon Footprint Calculator for Educational Institutions
            </h1>
            <p className="text-body-lg text-on-surface-variant max-w-2xl">
              Analyze your institution&apos;s carbon emissions. Select the institution type,
              analysis period, and emission categories to generate a detailed report.
            </p>
          </div>
          <DataUpload />
          <AnalysisConfigurator />
        </div>
      </main>
  );
}

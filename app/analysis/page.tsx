"use client";

import { useState } from "react";
import AnalysisConfigurator from "../components/analysis/AnalysisConfigurator";
import DataUpload from "../components/analysis/DataUpload";

export default function Home() {
  const [institutionId, setInstitutionId] = useState("");
  const [dataUploaded, setDataUploaded] = useState(false);

  return (
    <main className="flex-1 w-full px-6 py-8 md:px-12 md:py-16 flex flex-col items-center">
      <div className="w-full max-w-[1000px] space-y-6">
        <div className="space-y-2 mb-6">
          <h2 className="text-h2 font-semibold text-on-surface tracking-tight">
            Upload your consumption data to start
          </h2>
          <p className="text-body-lg text-on-surface-variant max-w-2xl">
            Select the institution type, analysis period, and emission categories to generate your report.
          </p>
        </div>
        <DataUpload institutionId={institutionId} onUploaded={() => setDataUploaded(true)} />
        <AnalysisConfigurator
          institutionId={institutionId}
          dataUploaded={dataUploaded}
          onInstitutionChange={(id) => {
            setInstitutionId(id);
            setDataUploaded(false);
          }}
        />
      </div>
    </main>
  );
}

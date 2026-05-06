"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ReportHeader from "../components/results/ReportHeader";
import ExecutiveSummary from "../components/results/ExecutiveSummary";

interface ActivityBreakdown {
  activityId: number;
  name: string;
  co2e: number;
  percentage: number;
}

interface YearRow {
  year: number;
  activities: { activityId: number; name: string; unit: string; co2e: number }[];
  total: number;
}

export interface AnalysisResult {
  institution: { id: number; name: string };
  period: { yearFrom: number; yearTo: number };
  totalCo2e: number;
  breakdown: ActivityBreakdown[];
  rows: YearRow[];
}

export default function ResultsPage() {
  const params = useSearchParams();
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const query = new URLSearchParams({
      institutionId: params.get("institutionId") ?? "",
      yearFrom: params.get("yearFrom") ?? "",
      yearTo: params.get("yearTo") ?? "",
      activityIds: params.get("activityIds") ?? "",
    });

    fetch(`/api/analysis?${query}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.error) setError(json.error);
        else setResult(json.data);
      })
      .catch(() => setError("Failed to load analysis"));
  }, [params]);

  const generatedAt = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (error) {
    return (
      <main className="flex-1 w-full px-6 py-8 md:px-12 md:py-16 flex flex-col items-center">
        <div className="w-full max-w-[1000px]">
          <p className="text-body-md text-error">{error}</p>
        </div>
      </main>
    );
  }

  if (!result) {
    return (
      <main className="flex-1 w-full px-6 py-8 md:px-12 md:py-16 flex flex-col items-center">
        <div className="w-full max-w-[1000px]">
          <p className="text-body-md text-on-surface-variant">Loading analysis...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 w-full px-6 py-8 md:px-12 md:py-16 flex flex-col items-center">
      <div className="w-full max-w-[1000px] space-y-8">
        <ReportHeader
          institution={result.institution.name}
          yearFrom={result.period.yearFrom}
          yearTo={result.period.yearTo}
          generatedAt={generatedAt}
        />
        <ExecutiveSummary
          totalCo2e={result.totalCo2e}
          breakdown={result.breakdown}
        />
      </div>
    </main>
  );
}

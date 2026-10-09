"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InstitutionSelect from "./InstitutionSelect";
import InstitutionNameInput from "./InstitutionNameInput";
import TimeModeToggle from "./TimeModeToggle";
import PeriodPicker from "./PeriodPicker";
import EmissionCategories from "./EmissionCategories";
import type { Institution, Activity, TimeMode } from "./types";

interface AnalysisConfiguratorProps {
  institutionId: string;
  dataUploaded: boolean;
  onInstitutionChange: (id: string) => void;
}

export default function AnalysisConfigurator({ institutionId, dataUploaded, onInstitutionChange }: AnalysisConfiguratorProps) {
  const router = useRouter();
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loadingInstitutions, setLoadingInstitutions] = useState(true);
  const [loadingActivities, setLoadingActivities] = useState(true);
  const [errorInstitutions, setErrorInstitutions] = useState(false);
  const [errorActivities, setErrorActivities] = useState(false);
  const [timeMode, setTimeMode] = useState<TimeMode>("months");
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [yearFrom, setYearFrom] = useState(0);
  const [yearTo, setYearTo] = useState(0);
  const [institutionName, setInstitutionName] = useState("");
  const [startMonth, setStartMonth] = useState(0);
  const [endMonth, setEndMonth] = useState(11);
  const [selectedActivities, setSelectedActivities] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetch("/api/institutions")
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((data) => {
        setInstitutions(data.data);
        if (data.data.length > 0) onInstitutionChange(String(data.data[0].id));
      })
      .catch(() => setErrorInstitutions(true))
      .finally(() => setLoadingInstitutions(false));

    fetch("/api/activities")
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((data) => {
        setActivities(data.data);
      })
      .catch(() => setErrorActivities(true))
      .finally(() => setLoadingActivities(false));

  }, []);

  useEffect(() => {
    if (!institutionId) return;
    setAvailableYears([]);
    setYearFrom(0);
    setYearTo(0);
    fetch(`/api/consumption/years?institutionId=${institutionId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((data: { data: number[] }) => {
        const years = data.data;
        setAvailableYears(years);
        if (years.length > 0) {
          setYearFrom(years[years.length - 1]);
          setYearTo(years[years.length - 1]);
        }
      })
      .catch(() => {});
  }, [institutionId]);

  function toggleActivity(id: number) {
    setSelectedActivities((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <div className="bg-surface rounded-xl border border-outline-variant shadow-[0px_8px_30px_rgb(0,0,0,0.04)] p-6 md:p-12 space-y-12">
      <div className="pb-3 border-b border-outline-variant">
        <h2 className="text-h3 font-medium text-on-surface">Configure Analysis</h2>
        <p className="text-body-md text-on-surface-variant mt-1">
          Select your institution type, analysis period, and emission categories
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <InstitutionSelect
            institutions={institutions}
            loading={loadingInstitutions}
            error={errorInstitutions}
            value={institutionId}
            onChange={onInstitutionChange}
          />
          <InstitutionNameInput value={institutionName} onChange={setInstitutionName} />
        </div>
        <TimeModeToggle
          value={timeMode}
          onChange={(mode) => {
            setTimeMode(mode);
            if (mode === "months") setYearTo(yearFrom);
          }}
        />
      </div>

      <PeriodPicker
        timeMode={timeMode}
        yearFrom={yearFrom}
        yearTo={yearTo}
        startMonth={startMonth}
        endMonth={endMonth}
        availableYears={availableYears}
        onYearFromChange={(y) => {
          setYearFrom(y);
          if (timeMode === "months") setYearTo(y);
        }}
        onYearToChange={setYearTo}
        onStartMonthChange={setStartMonth}
        onEndMonthChange={setEndMonth}
      />

      <EmissionCategories
        activities={activities}
        loading={loadingActivities}
        error={errorActivities}
        selected={selectedActivities}
        disabled={!dataUploaded}
        onToggle={toggleActivity}
      />

      <div className="pt-6 flex justify-end border-t border-outline-variant">
        <button
          onClick={() => {
            const query = new URLSearchParams({
              institutionId,
              yearFrom: String(yearFrom),
              yearTo: String(timeMode === "months" ? yearFrom : yearTo),
              activityIds: Array.from(selectedActivities).join(","),
              ...(institutionName.trim() && { institutionName: institutionName.trim() }),
              ...(timeMode === "months" && {
                monthFrom: String(startMonth + 1),
                monthTo: String(endMonth + 1),
              }),
            });
            router.push(`/results?${query}`);
          }}
          disabled={!institutionId || selectedActivities.size === 0 || (timeMode === "months" && startMonth > endMonth)}
          className="w-full sm:w-auto bg-button-primary hover:bg-on-primary-fixed-variant text-on-primary font-medium text-body-md px-8 py-4 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Generate Analysis
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}

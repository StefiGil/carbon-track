"use client";

import { useEffect, useState } from "react";
import InstitutionSelect from "./InstitutionSelect";
import TimeModeToggle from "./TimeModeToggle";
import PeriodPicker, { AVAILABLE_YEARS } from "./PeriodPicker";
import EmissionCategories from "./EmissionCategories";
import type { Institution, Activity, TimeMode } from "./types";

export default function AnalysisConfigurator() {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loadingInstitutions, setLoadingInstitutions] = useState(true);
  const [loadingActivities, setLoadingActivities] = useState(true);
  const [errorInstitutions, setErrorInstitutions] = useState(false);
  const [errorActivities, setErrorActivities] = useState(false);

  const [institutionId, setInstitutionId] = useState("");
  const [timeMode, setTimeMode] = useState<TimeMode>("months");
  const [yearFrom, setYearFrom] = useState(AVAILABLE_YEARS[0]);
  const [yearTo, setYearTo] = useState(AVAILABLE_YEARS[0]);
  const [startMonth, setStartMonth] = useState(0);
  const [endMonth, setEndMonth] = useState(11);
  const [selectedActivities, setSelectedActivities] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetch("/api/institutions")
      .then((res) => res.json())
      .then((data) => {
        setInstitutions(data.data);
        if (data.data.length > 0) setInstitutionId(String(data.data[0].id));
      })
      .catch(() => setErrorInstitutions(true))
      .finally(() => setLoadingInstitutions(false));

    fetch("/api/activities")
      .then((res) => res.json())
      .then((data) => {
        setActivities(data.data);
        if (data.data.length > 0) setSelectedActivities(new Set([data.data[0].id]));
      })
      .catch(() => setErrorActivities(true))
      .finally(() => setLoadingActivities(false));
  }, []);

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
        <InstitutionSelect
          institutions={institutions}
          loading={loadingInstitutions}
          error={errorInstitutions}
          value={institutionId}
          onChange={setInstitutionId}
        />
        <TimeModeToggle value={timeMode} onChange={setTimeMode} />
      </div>

      <PeriodPicker
        timeMode={timeMode}
        yearFrom={yearFrom}
        yearTo={yearTo}
        startMonth={startMonth}
        endMonth={endMonth}
        onYearFromChange={setYearFrom}
        onYearToChange={setYearTo}
        onStartMonthChange={setStartMonth}
        onEndMonthChange={setEndMonth}
      />

      <EmissionCategories
        activities={activities}
        loading={loadingActivities}
        error={errorActivities}
        selected={selectedActivities}
        onToggle={toggleActivity}
      />

      <div className="pt-6 flex justify-end border-t border-outline-variant">
        <button className="w-full sm:w-auto bg-primary hover:bg-on-primary-fixed-variant text-on-primary font-medium text-body-md px-8 py-4 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg">
          Generate Analysis
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}

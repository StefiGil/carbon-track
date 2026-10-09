"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface FactorRangeNoticeProps {
  yearFrom: number;
  yearTo: number;
}

export default function FactorRangeNotice({ yearFrom, yearTo }: FactorRangeNoticeProps) {
  const [range, setRange] = useState<{ min: number; max: number } | null>(null);

  useEffect(() => {
    fetch("/api/emission-factors")
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((json: { data: { year: number }[] }) => {
        const years = json.data.map((f) => f.year);
        if (years.length > 0) setRange({ min: Math.min(...years), max: Math.max(...years) });
      })
      .catch(() => {});
  }, []);

  // Only shown when the period includes years without emission factors
  if (!range || (yearFrom >= range.min && yearTo <= range.max)) return null;

  return (
    <div className="flex items-start gap-2 bg-surface-variant border border-outline-variant rounded-lg px-4 py-3 text-caption text-on-surface-variant">
      <span className="material-symbols-outlined text-base shrink-0">info</span>
      <p>
        Emissions can only be calculated from {range.min} to {range.max}. The official electricity
        factor is published with a delay of about two years, so consumption outside this range is not
        included.{" "}
        <Link href="/about" className="text-primary font-medium hover:underline">
          Learn why
        </Link>
      </p>
    </div>
  );
}

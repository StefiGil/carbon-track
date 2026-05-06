import { ReactNode } from "react";

interface StepCardProps {
  number: number;
  title: string;
  left: ReactNode;
  right: ReactNode;
  reverse?: boolean;
}

export default function StepCard({ number, title, left, right, reverse = false }: StepCardProps) {
  return (
    <div className="bg-surface rounded-2xl border border-outline-variant p-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary text-label-sm font-semibold shrink-0">
          {number}
        </span>
        <h2 className="text-h3 font-semibold text-on-surface">{title}</h2>
      </div>
      <div className={`flex gap-8 items-center ${reverse ? "flex-row-reverse" : "flex-row"}`}>
        <div className="flex-1">{left}</div>
        <div className="flex-1">{right}</div>
      </div>
    </div>
  );
}

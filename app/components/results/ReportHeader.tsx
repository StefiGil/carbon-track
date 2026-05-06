interface ReportHeaderProps {
  institution: string;
  yearFrom: number;
  yearTo: number;
  generatedAt: string;
}

export default function ReportHeader({ institution, yearFrom, yearTo, generatedAt }: ReportHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="border-l-4 border-primary pl-4">
        <h1 className="text-h1 font-semibold text-on-surface tracking-tight">
          Carbon Footprint Report
        </h1>
      </div>
      <div className="flex flex-wrap gap-8">
        <div>
          <p className="text-caption font-semibold tracking-widest uppercase text-on-surface-variant">
            Institution
          </p>
          <p className="text-body-md font-medium text-on-surface mt-0.5">{institution}</p>
        </div>
        <div>
          <p className="text-caption font-semibold tracking-widest uppercase text-on-surface-variant">
            Analysis Period
          </p>
          <p className="text-body-md font-medium text-on-surface mt-0.5">
            {yearFrom} - {yearTo}
          </p>
        </div>
        <div>
          <p className="text-caption font-semibold tracking-widest uppercase text-on-surface-variant">
            Generated On
          </p>
          <p className="text-body-md font-medium text-on-surface mt-0.5">{generatedAt}</p>
        </div>
      </div>
    </div>
  );
}

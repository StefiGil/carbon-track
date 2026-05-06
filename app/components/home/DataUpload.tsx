"use client";

import { useRef, useState, DragEvent, ChangeEvent } from "react";

interface UploadZoneProps {
  label: string;
  accept?: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

function UploadZone({ label, accept = ".xlsx,.xls", file, onFileChange }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) onFileChange(dropped);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0] ?? null;
    onFileChange(selected);
    e.target.value = "";
  }

  return (
    <div
      className={`flex flex-col items-center gap-3 py-8 px-6 rounded-xl border-2 border-dashed transition-colors cursor-pointer ${
        dragging ? "border-primary bg-primary-fixed" : "border-outline"
      }`}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <div className="w-14 h-14 rounded-full bg-primary-fixed flex items-center justify-center">
        <span className="material-symbols-outlined text-primary text-2xl">description</span>
      </div>
      <div className="text-center">
        <p className="text-body-md font-semibold text-on-surface">{label}</p>
        <p className="text-label-sm text-on-surface-variant mt-0.5">
          {file ? file.name : "No file selected"}
        </p>
      </div>
      <p className="text-label-sm text-on-surface-variant">
        Drag and drop or{" "}
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
          className="text-primary font-medium hover:underline focus:outline-none"
        >
          browse files
        </button>
      </p>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}

interface DataUploadProps {
  onConsumptionChange?: (file: File | null) => void;
  onFactorsChange?: (file: File | null) => void;
}

export default function DataUpload({ onConsumptionChange, onFactorsChange }: DataUploadProps) {
  const [consumptionFile, setConsumptionFile] = useState<File | null>(null);
  const [factorsFile, setFactorsFile] = useState<File | null>(null);

  function handleConsumption(file: File | null) {
    setConsumptionFile(file);
    onConsumptionChange?.(file);
  }

  function handleFactors(file: File | null) {
    setFactorsFile(file);
    onFactorsChange?.(file);
  }

  return (
    <section>
      <p className="text-caption font-semibold tracking-widest uppercase text-on-surface-variant mb-3">
        Data Upload
      </p>
      <div className="grid grid-cols-2 gap-3">
        <UploadZone
          label="Consumption Data"
          file={consumptionFile}
          onFileChange={handleConsumption}
        />
        <UploadZone
          label="Conversion Factors"
          file={factorsFile}
          onFileChange={handleFactors}
        />
      </div>
    </section>
  );
}

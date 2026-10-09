"use client";

import { useRef, useState, DragEvent, ChangeEvent } from "react";

interface UploadZoneProps {
  label: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
  disabled?: boolean;
}

function UploadZone({ label, file, onFileChange, disabled }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    if (disabled) return;
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
      className={`flex flex-col items-center gap-3 py-8 px-6 rounded-xl border-2 border-dashed transition-colors ${
        disabled
          ? "border-outline-variant opacity-50 cursor-not-allowed"
          : dragging
          ? "border-primary bg-primary-fixed cursor-pointer"
          : "border-outline cursor-pointer"
      }`}
      onDragOver={(e) => { e.preventDefault(); if (!disabled) setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => { if (!disabled) inputRef.current?.click(); }}
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
          disabled={disabled}
          onClick={(e) => { e.stopPropagation(); if (!disabled) inputRef.current?.click(); }}
          className="text-primary font-medium hover:underline focus:outline-none disabled:pointer-events-none"
        >
          browse files
        </button>
      </p>
      <input
        ref={inputRef}
        type="file"
        accept=".xlsx,.xls"
        className="hidden"
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
}

interface DataUploadProps {
  institutionId: string;
  onUploaded: () => void;
}

type UploadStatus = "idle" | "uploading" | "success" | "error";

export default function DataUpload({ institutionId, onUploaded }: DataUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [message, setMessage] = useState<string | null>(null);

  const noInstitution = !institutionId;

  async function handleUpload() {
    if (!file || !institutionId) return;

    setStatus("uploading");
    setMessage(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("institutionId", institutionId);

    try {
      const res = await fetch("/api/upload/consumption", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();

      if (!res.ok || json.error) {
        setStatus("error");
        setMessage(json.error ?? "Upload failed");
      } else {
        setStatus("success");
        setMessage(`${json.data.inserted} records loaded successfully.`);
        setFile(null);
        onUploaded();
      }
    } catch {
      setStatus("error");
      setMessage("Connection error. Please try again.");
    }
  }

  return (
    <section>
      <p className="text-label-lg font-semibold tracking-widest uppercase text-on-surface-variant mb-3">
        Data Upload
      </p>

      {noInstitution && (
        <p className="text-label-sm text-on-surface-variant mb-3">
          Select an institution below before uploading.
        </p>
      )}

      <UploadZone
        label="Consumption Data"
        file={file}
        onFileChange={setFile}
        disabled={noInstitution}
      />

      {file && !noInstitution && (
        <div className="mt-3 flex items-center gap-3 justify-end">
          <button
            onClick={handleUpload}
            disabled={status === "uploading"}
            className="bg-button-primary text-on-primary font-medium text-body-md px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {status === "uploading" && (
              <span className="material-symbols-outlined text-base animate-spin">progress_activity</span>
            )}
            {status === "uploading" ? "Uploading..." : "Upload"}
          </button>
          <button
            onClick={() => { setFile(null); setStatus("idle"); setMessage(null); }}
            className="text-label-sm text-on-surface-variant hover:text-on-surface transition-colors"
          >
            Cancel
          </button>
        </div>
      )}

      {message && (
        <p className={`mt-3 text-label-sm font-medium ${status === "error" ? "text-error" : "text-primary"}`}>
          {status === "success" && (
            <span className="material-symbols-outlined text-base align-middle mr-1">check_circle</span>
          )}
          {message}
        </p>
      )}
    </section>
  );
}

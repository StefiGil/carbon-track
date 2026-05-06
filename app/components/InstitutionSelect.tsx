"use client";

import { useEffect, useState } from "react";

interface Institution {
  id: number;
  name: string;
}

export default function InstitutionSelect() {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    fetch("/api/institutions")
      .then((res) => res.json())
      .then((data) => setInstitutions(data.data));
  }, []);

  return (
    <select
      value={selected}
      onChange={(e) => setSelected(e.target.value)}
      className="border border-gray-300 rounded-md px-3 py-2 text-sm"
    >
      <option value="">Select institution</option>
      {institutions.map((i) => (
        <option key={i.id} value={i.id}>
          {i.name}
        </option>
      ))}
    </select>
  );
}
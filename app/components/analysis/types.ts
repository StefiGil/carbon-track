export interface Institution {
  id: number;
  name: string;
}

export interface Activity {
  id: number;
  name: string;
  unit: string;
}

export type TimeMode = "years" | "months";

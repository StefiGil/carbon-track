// Static display metadata for each emission category, keyed by the activity
// name stored in the database. Names, units and factors come from the API.

export type ColorSet = { bg: string; border: string; icon: string; text: string };

export interface ActivityDisplay {
  order: number;
  icon: string;
  label: string;
  description: string;
  scope: 1 | 2;
  unitLabel: string;
  colors: { unselected: ColorSet; selected: ColorSet };
}

export const ACTIVITY_DISPLAY: Record<string, ActivityDisplay> = {
  Electricity: {
    order: 0,
    icon: "bolt",
    label: "Electricity",
    description: "Scope 2 emissions",
    scope: 2,
    unitLabel: "kWh",
    colors: {
      unselected: { bg: "bg-indigo-50/50", border: "border-indigo-100", icon: "text-indigo-300", text: "text-indigo-300" },
      selected: { bg: "bg-indigo-100", border: "border-indigo-300", icon: "text-indigo-500", text: "text-indigo-400" },
    },
  },
  Gas: {
    order: 1,
    icon: "local_fire_department",
    label: "Natural gas",
    description: "Heating & cooling",
    scope: 1,
    unitLabel: "m³",
    colors: {
      unselected: { bg: "bg-amber-50/50", border: "border-amber-100", icon: "text-orange-300", text: "text-orange-300" },
      selected: { bg: "bg-amber-100", border: "border-amber-300", icon: "text-orange-500", text: "text-orange-400" },
    },
  },
  Diesel: {
    order: 2,
    icon: "local_shipping",
    label: "Diesel",
    description: "Diesel vehicles & generators",
    scope: 1,
    unitLabel: "liters",
    colors: {
      unselected: { bg: "bg-slate-50", border: "border-slate-200", icon: "text-slate-300", text: "text-slate-400" },
      selected: { bg: "bg-slate-200", border: "border-slate-400", icon: "text-slate-500", text: "text-slate-500" },
    },
  },
  Gasoline: {
    order: 3,
    icon: "local_gas_station",
    label: "Gasoline",
    description: "Gasoline vehicles",
    scope: 1,
    unitLabel: "liters",
    colors: {
      unselected: { bg: "bg-rose-50/50", border: "border-rose-100", icon: "text-rose-300", text: "text-rose-300" },
      selected: { bg: "bg-rose-100", border: "border-rose-300", icon: "text-rose-500", text: "text-rose-400" },
    },
  },
};

export const ACTIVITIES_IN_ORDER = Object.entries(ACTIVITY_DISPLAY)
  .sort(([, a], [, b]) => a.order - b.order)
  .map(([name, display]) => ({ name, ...display }));

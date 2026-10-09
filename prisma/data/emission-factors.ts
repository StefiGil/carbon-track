export type ActivitySeed = {
  name: string;
  unit: string;
  columnKey: string;
};

export type EmissionFactorSeed = {
  activity: string;
  year: number;
  factorValue: number;
  source: string;
  sourceUrl: string;
};

export const activities: ActivitySeed[] = [
  { name: "Electricity", unit: "kWh", columnKey: "electricity_kwh" },
  { name: "Gas", unit: "m3", columnKey: "gas_m3" },
  { name: "Diesel", unit: "l", columnKey: "diesel_l" },
  { name: "Gasoline", unit: "l", columnKey: "gasoline_l" },
];

export const FIRST_YEAR = 2006;
export const LAST_YEAR = 2023;

// Argentine grid, Simple Operating Margin (kg CO2/kWh, equal to tCO2/MWh).
// One value per year, published by the Secretaria de Energia (CAMMESA data).
const electricityByYear: Record<number, number> = {
  2006: 0.516,
  2007: 0.509,
  2008: 0.54,
  2009: 0.538,
  2010: 0.526,
  2011: 0.535,
  2012: 0.526,
  2013: 0.519,
  2014: 0.517,
  2015: 0.523,
  2016: 0.511,
  2017: 0.477,
  2018: 0.464,
  2019: 0.428,
  2020: 0.443,
  2021: 0.459,
  2022: 0.45,
  2023: 0.429,
};

// Constant factors: they depend on the fuel properties, not on the grid mix.
// The calculation looks factors up by year, so the value is repeated per year.
const constantFactors = [
  {
    activity: "Gas",
    factorValue: 2.19,
    source: "IPCC 2006 Guidelines, Vol. 2, Ch. 2 (stationary combustion)",
    sourceUrl:
      "https://www.ipcc-nggip.iges.or.jp/public/2006gl/pdf/2_Volume2/V2_2_Ch2_Stationary_Combustion.pdf",
  },
  {
    activity: "Diesel",
    factorValue: 2.7,
    source: "US EPA Emission Factors Hub 2025",
    sourceUrl:
      "https://www.epa.gov/system/files/documents/2025-01/ghg-emission-factors-hub-2025.pdf",
  },
  {
    activity: "Gasoline",
    factorValue: 2.32,
    source: "US EPA Emission Factors Hub 2025",
    sourceUrl:
      "https://www.epa.gov/system/files/documents/2025-01/ghg-emission-factors-hub-2025.pdf",
  },
];

const years = Array.from(
  { length: LAST_YEAR - FIRST_YEAR + 1 },
  (_, i) => FIRST_YEAR + i
);

export const emissionFactors: EmissionFactorSeed[] = [
  ...years.map((year) => ({
    activity: "Electricity",
    year,
    factorValue: electricityByYear[year],
    source: "Secretaria de Energia de la Nacion, Simple Operating Margin (CAMMESA data)",
    sourceUrl:
      "http://datos.energia.gob.ar/dataset/calculo-del-factor-de-emision-de-co2-de-la-red-argentina-de-energia-electrica",
  })),
  ...constantFactors.flatMap((factor) =>
    years.map((year) => ({ ...factor, year }))
  ),
];

// Static copy for the About page. Emission factor values are not shown here:
// they live in the database and are used by the calculation only.

export const intro = {
  title: "About CarbonTrack",
  subtitle:
    "A free web tool that estimates the carbon footprint of educational institutions from their monthly energy consumption.",
};

export const notice = {
  title: "Built for institutions in Argentina",
  text: "The emission factors used here, especially the electricity factor, reflect Argentina's national power grid. Results are not valid for institutions in other countries.",
};

export const whatItDoes = {
  title: "What it does",
  text: "CarbonTrack provides a standardized calculation pipeline designed for students, teachers, and sustainability committees in educational institutions. It requires no installation and offers an immediate diagnostic baseline that can be easily updated over time. In future iterations, the same approach could extend to hospitals, municipalities, and companies.",
  features: [
    {
      icon: "upload_file",
      title: "Upload",
      text: "Excel template with monthly electricity, natural gas, diesel, and gasoline consumption for any period.",
    },
    {
      icon: "calculate",
      title: "Calculate",
      text: "Emissions computed using official emission factors stored in the system, one value per year where it applies.",
    },
    {
      icon: "analytics",
      title: "Report",
      text: "Breakdown tables, monthly trend charts, and a PDF summary report.",
    },
  ],
};

export const howItWorks = {
  title: "How it works",
  steps: [
    {
      title: "Data input",
      text: "The user uploads monthly consumption records in the units printed on utility bills: kWh, m³, and liters.",
    },
    {
      title: "Processing",
      text: "Consumption is matched with the emission factor of each source and year, then aggregated by source, by month, and in total.",
    },
    {
      title: "Results",
      text: "Tables, charts, and a PDF report with the emissions of the selected period.",
    },
  ],
};

export const measured = {
  title: "What is measured",
  columns: { source: "Source", scope: "Scope (GHG Protocol)", unit: "Unit" },
  footnote:
    "Scope 3 (transport of people, waste management, purchases) is not included yet.",
};

export const factors = {
  title: "Emission factors and sources",
  text: "Emission factors come from official sources (Secretaría de Energía de la Nación, IPCC, and US EPA) and are applied automatically; users never enter them. Because the national generation mix changes over time, electricity uses a distinct factor for each year, which allows accurate historical analyses. Natural gas and liquid fuels depend on the physicochemical properties of the fuel, so their factor does not change.",
  delay: {
    title: "Why are recent years sometimes not calculated?",
    text: "The Secretaría de Energía publishes the electricity grid factor with a delay of approximately two years. Consumption from years without a published factor is not calculated, and the report indicates which years were left out.",
  },
  som: {
    title: "Why Simple Operating Margin?",
    paragraphs: [
      "The Simple Operating Margin reflects the carbon intensity of the power plants that cover additional demand on the Argentine grid.",
      "Because that extra demand is mostly met by thermal plants running on natural gas, rather than by renewable or nuclear sources that already operate at full capacity, this margin represents the real effect of an institution's consumption better than an average of the whole generation mix.",
    ],
  },
};

export const references = {
  title: "References",
  items: [
    {
      text: "Secretaría de Energía de la Nación.",
      italic: "Cálculo del Factor de Emisión de CO2 de la Red Argentina de Energía Eléctrica.",
      suffix: "Datos Argentina.",
      href: "https://datos.gob.ar/el/dataset/energia-calculo-factor-emision-co2-red-argentina-energia-electrica/",
    },
    {
      text: "IPCC (2006).",
      italic: "Guidelines for National Greenhouse Gas Inventories,",
      suffix: "Vol. 2 (Energy), Chapter 2 (Stationary Combustion).",
      href: "https://www.ipcc-nggip.iges.or.jp/public/2006gl/pdf/2_Volume2/V2_2_Ch2_Stationary_Combustion.pdf",
    },
    {
      text: "U.S. Environmental Protection Agency (2025).",
      italic: "Emission Factors for Greenhouse Gas Inventories.",
      suffix: "Center for Corporate Climate Leadership.",
      href: "https://www.epa.gov/system/files/documents/2025-01/ghg-emission-factors-hub-2025.pdf",
    },
    {
      text: "World Resources Institute and WBCSD.",
      italic: "The Greenhouse Gas Protocol: A Corporate Accounting and Reporting Standard",
      suffix: "(Revised Edition).",
      href: "https://ghgprotocol.org/corporate-standard",
    },
    {
      text: "UNFCCC Clean Development Mechanism.",
      italic: "Tool 07: Tool to calculate the emission factor for an electricity system.",
      suffix: "",
      href: "https://cdm.unfccc.int/methodologies/PAmethodologies/tools/am-tool-07-v1.1.pdf",
    },
    {
      text: "International Energy Agency (IEA).",
      italic: "Emissions Factors Database and Methodological Documentation.",
      suffix: "",
      href: "https://www.iea.org/data-and-statistics/data-product/emissions-factors-2024",
    },
  ],
};

export const cta = {
  text: "Ready to measure your institution's footprint?",
  button: "Go to Analysis",
};

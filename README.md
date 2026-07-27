# Carbon Track App

A web application for calculating and tracking greenhouse gas emissions (CO₂ equivalent) across institutions, based on electricity, natural gas, and fuel consumption data.

Built as a final project for the **Gaseous Effluent Treatment** course, and extended to support multiple institutions for broader real-world impact.

---

## Purpose

Many institutions (universities, schools, hospitals, companies) have no easy way to measure or visualize their carbon footprint. Carbon Track App provides a simple, data-driven tool to:

- Input energy consumption data (electricity, gas, fuel)
- Automatically calculate CO₂ equivalent emissions
- Visualize results through charts and tables
- Export reports for environmental reporting or academic purposes

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) (App Router) |
| Frontend | React + Tailwind CSS |
| Backend | Next.js API Routes |
| Database | PostgreSQL |
| ORM | Prisma |
| Charts | Recharts |
| PDF Export | *(planned)* |

---

## Emission Factors

Emission factors used in this app are based on **Argentina's national energy matrix**, sourced from the *Cálculo de la Huella de Carbono Institucional de la UNLP (2019)*, published by the Dirección de Seguridad, Higiene y Desarrollo Sustentable — Secretaría de Planeamiento, Obras y Servicios de la UNLP. These factors are updated periodically (typically annually) to reflect changes in the country's energy mix.

| Source | Factor | Unit | Input |
|---|---|---|---|
| Electricity | 0.4507 kg CO₂/kWh | Updated per year | kWh (from bill) |
| Natural Gas | ~2.04 kg CO₂/m³ | To be confirmed | m³ (from bill) |
| Gasoline (95 oct.) | 2.07 kg CO₂/L | UNLP 2019 | Liters |
| Diesel | 2.62 kg CO₂/L | UNLP 2019 | Liters |

> Electricity emission factors vary year to year. The database stores a factor per year to allow accurate historical calculations.

> Natural gas consumption is taken directly from utility bills in m³. The emission factor for natural gas is pending confirmation with the course faculty.

---

## Data Model (Overview)

```
institutions
  institution_id (PK)
  name

activities
  activity_id (PK)
  name            ← e.g. Electricity, Natural Gas, Fuel
  unit            ← e.g. kWh, m³, L

emission_factors
  emission_factor_id (PK)
  activity_id (FK → activities)
  year
  factor_value    ← kg CO₂e per unit

consumptions
  consumption_id (PK)
  consumption     ← amount used
  year
  month
  activity_id (FK → activities)
  institution_id (FK → institutions)
```

**Calculation:** `consumptions.consumption × emission_factors.factor_value`
joined on `activity_id` + `year`.

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/StefiGil/carbon-track-app.git
cd carbon-track-app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in your DATABASE_URL and other variables

# Run database migrations
npx prisma migrate dev

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
carbon-track-app/
├── app/                  # Next.js App Router
│   ├── api/              # API routes (backend)
│   ├── dashboard/        # Main dashboard page
│   ├── institutions/     # Institution management
│   └── ...
├── components/           # Reusable React components
├── lib/                  # Utilities, DB client, helpers
├── prisma/
│   └── schema.prisma     # Database schema
├── public/
└── ...
```

---

## Features

- Multi-institution support
- CO₂ calculation by energy source
- Annual emission factor management (Argentina)
- Data tables with filtering
- Charts and visualizations
- Excel data import
- PDF report export


---

## License

This project was developed for academic purposes. Feel free to use or adapt it for educational and non-commercial use.

---

## 👩‍💻 Author

Developed by **Stefania Gil** —  Student of the Bachelor's Degree in Environmental Technology, Faculty of Exact Sciences, UNICEN.

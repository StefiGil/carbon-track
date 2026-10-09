# Carbon Track

A web application for calculating and tracking greenhouse gas emissions (CO₂ equivalent) across institutions, based on electricity, natural gas, diesel, and gasoline consumption data.

Built as a final project for the **Gaseous Effluent Treatment** course, and extended to support multiple institutions for broader real-world impact.

---

## Purpose

Many institutions (universities, schools, hospitals, companies) have no easy way to measure or visualize their carbon footprint. Carbon Track App provides a simple, data-driven tool to:

- Input energy consumption data (electricity, natural gas, diesel, gasoline) from an Excel template
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

The app estimates **Scope 1 and Scope 2** emissions (GHG Protocol) and is designed for **institutions in Argentina**: the electricity factor reflects Argentina's national grid, so it does not apply to other countries. Emission factors are stored in the database and applied automatically; users only upload consumption data and never enter factors.

| Source | Scope | Factor | Unit | Reference |
|---|---|---|---|---|
| Electricity | 2 | One value per year, 2006 to 2023 (0.516 in 2006, 0.429 in 2023) | kg CO₂/kWh | Argentina's Secretariat of Energy, Simple Operating Margin method (CAMMESA data) |
| Natural gas | 1 | 2.19 | kg CO₂e/m³ | IPCC 2006, stationary combustion |
| Diesel | 1 | 2.70 | kg CO₂/L | US EPA Emission Factors Hub 2025 |
| Gasoline (95 oct.) | 1 | 2.32 | kg CO₂/L | US EPA Emission Factors Hub 2025 |

> Only the electricity factor changes over time, because it depends on the energy mix. Natural gas and liquid fuels depend on the fuel's physicochemical properties, so their factor is constant.

The full methodology, selection criteria and limitations are documented in [docs/metodologia-de-huella-carbono.md](docs/metodologia-de-huella-carbono.md).

---

## Data Model (Overview)

```
institutions
  institution_id (PK)
  name

activities
  activity_id (PK)
  name            ← Electricity, Gas, Diesel, Gasoline
  unit            ← kWh, m³, L
  column_key      ← Excel column, e.g. electricity_kwh, diesel_l

emission_factors
  emission_factor_id (PK)
  activity_id (FK → activities)
  year
  factor_value    ← kg CO₂e per unit
  source, source_url  ← where the factor comes from

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
- Docker (runs the local PostgreSQL database)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/StefiGil/carbon-track-app.git
cd carbon-track-app

# Install dependencies
npm install

# Start the PostgreSQL database (see docker-compose.yml)
docker compose up -d

# Create a .env file with the database connection
# DATABASE_URL="postgresql://<user>@localhost:5432/carbon_track_db" (credentials as in docker-compose.yml)

# Run database migrations
npx prisma migrate dev

# Load activities and emission factors (idempotent, data in prisma/data/emission-factors.ts)
npx prisma db seed

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
carbon-track-app/
├── app/                  # Next.js App Router
│   ├── page.tsx          # Analysis page (upload data and configure)
│   ├── results/          # Results page (charts and tables)
│   ├── guide/            # How to prepare and upload data
│   ├── components/       # UI components, grouped by page
│   └── api/              # API routes (backend)
├── lib/
│   └── prisma.ts         # Prisma client
├── prisma/
│   ├── schema.prisma     # Database schema
│   ├── seed.ts
│   ├── data/               # Versioned emission factors
│   └── migrations/
├── designs/              # UI reference screenshots
├── docs/                 # Methodology, diagrams and task list
├── public/               # Static assets
└── docker-compose.yml    # Local PostgreSQL
```

---

## Features

- CO₂e calculation by energy source (Scope 1 and 2) for institutions in Argentina
- Emission factors stored in the database, one value per year for electricity
- Excel data import with a standard template
- Charts and tables with filtering by period and category
- PDF report export (planned)


---

## License

This project was developed for academic purposes. Feel free to use or adapt it for educational and non-commercial use.

---

## 👩‍💻 Author

Developed by **Stefania Gil** —  Student of the Bachelor's Degree in Environmental Technology, Faculty of Exact Sciences, UNICEN.

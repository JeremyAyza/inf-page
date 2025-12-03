# 🤖 InsightOS — AI Monitoring Platform

**InsightOS** is a comprehensive AI monitoring and ethics dashboard built with **React + Vite + TypeScript**, featuring a modern cyber-tech design system and real-time infrastructure visualization.

## 🎯 Platform Overview

InsightOS provides centralized monitoring for:

* **AI Activity & Performance** - Real-time request tracking, compute allocation, and training metrics
* **Ethical Compliance** - Safety scores, bias detection, fairness indices, and transparency metrics
* **Innovation Pipeline** - Active model registry, research trends, and development analytics
* **Global Infrastructure** - Worldwide data center monitoring, energy consumption, and carbon tracking
* **System Logs & Audit** - Security events, performance logs, and incident management

---

## ✨ Key Features

* 📊 **15+ Interactive Chart Types** - Line, bar, bubble, radar, donut, treemap, and geographic visualizations
* 🗺️ **Live Global Map** - Real-time node status across 15 data centers worldwide
* 🎨 **Cyber-Tech Design System** - Neon cyan, electric purple, and neon green color palette
* ⚡ **Real-time Metrics** - Active neural nodes, requests/sec, latency, and ethics scores
* 🌍 **Geographic Analysis** - 15 global regions with node availability tracking
* 🔒 **Security Monitoring** - Threat detection, access logs, and compliance auditing
* 📈 **Performance Analytics** - Model benchmarks, resource efficiency, and trend analysis

---

## 🏗️ Project Structure

```bash
dashboard-data/
├── public/
├── src/
│   ├── app/                         # Global infrastructure
│   │   ├── config/                  # Environment and app config
│   │   ├── constants/               # Global constants
│   │   ├── helpers/                 # Utility functions
│   │   ├── hooks/                   # Global custom hooks
│   │   ├── layout/                  # Protected route wrapper
│   │   ├── lib/                     # Third-party integrations
│   │   ├── providers/               # Context providers
│   │   ├── stores/                  # Global state (Zustand)
│   │   └── types/                   # Global TypeScript types
│
│   ├── features/                    # Feature-based architecture
│   │   ├── auth/                    # Authentication
│   │   │   ├── hooks/               # Auth-specific hooks
│   │   │   ├── services/            # Auth API calls
│   │   │   └── ...
│   │   │
│   │   └── dashboard/               # Main dashboard feature
│   │       ├── components/          # Dashboard-specific components
│   │       │   ├── general-overview/
│   │       │   ├── ethical-metrics/
│   │       │   ├── innovation/
│   │       │   ├── global-footprint/
│   │       │   └── system-logs/
│   │       │
│   │       ├── pages/               # Dashboard views
│   │       │   ├── ai-activity-page.tsx
│   │       │   ├── ethical-metrics-page.tsx
│   │       │   ├── innovation-page.tsx
│   │       │   ├── global-footprint-page.tsx
│   │       │   └── system-logs-page.tsx
│   │       │
│   │       ├── queries/             # TanStack Query hooks
│   │       ├── services/            # API service layer
│   │       ├── store/               # Dashboard state
│   │       ├── types/               # Domain types
│   │       ├── fake-data.ts         # Mock data
│   │       └── dashboard-router.tsx # Dashboard routing
│
│   ├── components/
│   │   ├── ui/                      # Shadcn UI components
│   │   └── shared/                  # Reusable components
│   │       ├── charts/              # Chart components
│   │       ├── filters/             # Filter components
│   │       ├── app-sidebar.tsx      # Navigation sidebar
│   │       ├── header.tsx           # Top header
│   │       └── ...
│
│   ├── index.css                    # Global styles & theme
│   ├── main.tsx                     # App entry point
│   └── router.tsx                   # Root routing
│
├── .env
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

---

## 🎨 Dashboard Pages

### 1. AI Activity Overview
**Dense multi-chart layout showcasing global AI infrastructure**

- **3-column grid**: Ethics trends, model distribution, CO2 emissions
- **2-column mid**: Energy consumption bubble chart + ethical radar
- **Full-width**: AI activity timeline (requests, compute, training)
- **Complex grid**: Live world map (4 cols) + top models (3 cols)
- **Tables**: Regional metrics grid, active models registry

### 2. Ethical Metrics
**Ethics-first layout with compliance focus**

- **Asymmetric top**: Ethical radar (3 cols) + resource efficiency (2 cols)
- **4-column dense**: Ethics trends + model usage + CO2 impact
- **Tables**: Incident logs with severity tracking
- **3-panel bottom**: AI activity + global compute map
- **Geographic grid**: Regional ethics performance

### 3. Innovation & Research
**Innovation pipeline with nested layouts**

- **Asymmetric**: AI activity timeline (2 cols) + stacked panels (1 col)
- **Full-width map**: Global innovation hubs
- **4-panel row**: Ethics evolution + compliance radar + compute map
- **Standalone**: Energy consumption analysis
- **Table**: Active models in development

### 4. Global Footprint
**Map-first geographic visualization**

- **Map dominant**: Live node map (3 cols) + compute distribution (2 cols)
- **3-column dense**: Energy + CO2 + compliance metrics
- **Full-width grid**: Regional performance dashboard
- **Asymmetric bottom**: AI activity (3 cols) + model usage (4 cols)
- **Table**: Models by region matrix

### 5. System Logs
**Charts-first operational dashboard**

- **3-column top**: Ethics trends + system activity + CO2 tracking
- **Log types grid**: Security, performance, energy, system health
- **Tables**: Incident logs, recent activity logs
- **Geographic grid**: System health by region
- **Stats cards**: Total logs, critical alerts, storage

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI library with hooks |
| **Vite** | Lightning-fast dev server |
| **TypeScript** | Type-safe development |
| **TailwindCSS** | Utility-first styling |
| **Shadcn/UI** | Accessible component system |
| **TanStack Query** | Data fetching & caching |
| **TanStack Table** | Advanced data tables |
| **Recharts** | Chart visualizations |
| **React Leaflet** | Interactive maps |
| **Zustand** | Lightweight state management |
| **React Router** | Client-side routing |
| **Lucide React** | Icon library |
| **Axios** | HTTP client |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- Package manager (npm, yarn, pnpm, or bun)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd dashboard-data

# Install dependencies
bun install
# or
npm install

# Configure environment
cp .env.example .env
# Edit .env with your configuration
```

### Development

```bash
# Start dev server
bun dev
# or
npm run dev

# Runs on http://localhost:5173
```

### Build

```bash
# Production build
bun run build
# or
npm run build

# Preview production build
bun preview
# or
npm run preview
```

---

## 📊 Data Architecture

The platform uses a service layer pattern with TanStack Query for data management:

```typescript
// Service layer
dashboardService.getAIActivityData()
dashboardService.getEthicsScoreTrend()
dashboardService.getGlobalComputeMap()

// Query hooks
useAIActivityQuery()
useEthicsKPIsQuery()
useActiveModelsQuery()
```

Mock data is provided in `fake-data.ts` for development and can be easily swapped with real API endpoints.

---

## 🎨 Design System

### Color Palette
- **Primary**: Neon Cyan `oklch(0.70 0.18 200)`
- **Secondary**: Electric Purple `oklch(0.55 0.25 290)`
- **Accent**: Neon Green `oklch(0.75 0.18 150)`
- **Background**: Deep Space `oklch(0.10 0.02 240)`

### Chart Colors
- **Chart 1**: Cyan (Infrastructure)
- **Chart 2**: Purple (Models)
- **Chart 3**: Green (Ethics)
- **Chart 4**: Magenta (Metrics)
- **Chart 5**: Gold (Performance)

---

## 🗺️ Global Coverage

InsightOS monitors **15 data centers** across **7 regions**:

- North America (San Francisco, Toronto)
- Europe (London, Frankfurt, Amsterdam, Paris, Stockholm)
- Asia Pacific (Tokyo, Seoul, Hong Kong, Singapore)
- South America (São Paulo)
- Middle East (Dubai)
- South Asia (Mumbai)
- Oceania (Sydney)

---

## 📚 Resources

- [Shadcn UI Documentation](https://ui.shadcn.com/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Recharts](https://recharts.org/)
- [React Leaflet](https://react-leaflet.js.org/)
- [TailwindCSS](https://tailwindcss.com/docs)

---

## 📄 License

Proprietary - InsightOS Platform

---

**Built with cutting-edge AI monitoring technology** 🤖✨

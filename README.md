# LumaSoul AI: Your Taste. Your Space. Your Light.

> **"Your cultural identity deserves more than a default lighting preset."**

LumaSoul AI is a cultural intelligence lighting architect powered by the **Qloo API**. It translates a person's cultural touchstones across cinema, music, fashion, brands, and travel into a bespoke, museum-grade architectural residential lighting blueprint.

---

## The Product Vision

Smart home lighting is dominated by generic RGB color wheels and superficial "party" presets. In contrast, high-end architectural lighting designers spend weeks studying a homeowner's art collection, wardrobe materiality, musical sensibilities, and spatial habits to sculpt light with intention.

**LumaSoul AI bridges this divide using Qloo Cultural Intelligence.** By querying real entities and cross-domain taste affinities, it determines optimal color temperatures (Kelvin), color rendering indexes (CRI 90+ / 98), luminance contrast ratios, fixture finishes, and layered circuit zoning.

---

## Key Features

1. **Verified Qloo Cultural Intelligence Integration**:
   - Secure server-side Route Handlers (`app/api/search`, `app/api/insights`, `app/api/design`).
   - Official `X-Api-Key` header authentication against `https://api.qloo.com`.
   - Real entity discovery via `GET /search?query=...&types=...`.
   - Cultural affinity extraction via `GET /v2/insights?filter.type=...&signal.interests.entities=...`.
   - Transparent provenance tagging (`[Verified Live Qloo API]` vs. `[Demo Cultural Knowledge Graph]`).
2. **Observable 5-Stage Agentic Architecture**:
   - **Stage 1: Taste Research Agent** — Sanitizes, categorizes, and organizes cultural touchstones.
   - **Stage 2: Cultural Intelligence Agent** — Queries Qloo API for cross-domain correlations.
   - **Stage 3: Design Reasoning Agent** — Synthesizes aesthetic principles (contrast ratios, materiality).
   - **Stage 4: Lighting Engineering Agent** — Computes photometrics, lumens, 4-zone layouts, and scene presets.
   - **Stage 5: Blueprint Validation Agent** — Audits NEC electrical disclosures, Kelvin bounds, and spatial constraints.
3. **Interactive Photometric Room Visualizer**:
   - Dynamic SVG/CSS room elevation and ceiling plan.
   - Real-time modulation of 4 independent lighting zones (Perimeter Cove, Centerpiece Focal, Art Grazer, Low Plinth).
   - Live color temperature tint shifting from 1800K candlelit amber to 3500K crisp white.
4. **Curated Scene Presets**:
   - **Cinematic Evening**: High-contrast drama with deep linear shadows and amber cove glow.
   - **Warm Retreat**: Candlelit decompression (2000K) eliminating all high-angle glare.
   - **Creative Focus**: High-acuity task illumination (3200K+) with indirect ambient wash.
   - **Social Gathering**: Convivial, balanced multi-layered illumination.
   - **Midnight Calm**: Low-circadian night navigation preserving natural melatonin synthesis.
5. **Contractor-Ready Blueprint Export**:
   - One-click print-to-PDF formatting (`@media print` styling).
   - Traceable evidence chain linking specific cultural entities to design choices.
   - Electrical safety and installation notice for licensed contractors.

---

## System Architecture

```
LumaSoul AI
├── app/
│   ├── layout.tsx             # Root layout with dark architectural theme & Google fonts
│   ├── page.tsx               # Orchestration view (Landing, Onboarding, Loading, Blueprint)
│   ├── globals.css            # Tailwind directives, print media styles, custom scrollbars
│   └── api/
│       ├── health/route.ts    # Qloo API connection status and diagnostics
│       ├── search/route.ts    # Qloo entity search & resolution
│       ├── insights/route.ts  # Qloo /v2/insights affinity queries
│       └── design/route.ts    # 5-stage agent workflow execution
├── components/
│   ├── landing/               # Hero, Navbar, HowItWorks, Footer
│   ├── onboarding/            # TasteSelector, TasteSearch, RoomConfigurator, SelectedTastes
│   ├── lighting/              # RoomVisualizer, KelvinIndicator, SceneSelector, LightingZones
│   ├── dashboard/             # BlueprintDashboard, CulturalProfile, LightingSpecifications
│   └── ui/                    # Button, Card, LoadingState, Modal
├── lib/
│   ├── qloo/                  # Qloo client, entity-search, insights, curated catalog
│   ├── agent/                 # 5 discrete agent modules & orchestrator
│   └── lighting/              # Kelvin mapping, fixture rules, zone generator, lighting engine
└── types/                     # Strict TypeScript interfaces for Qloo, taste, lighting, and agents
```

---

## Environment Configuration

Create a `.env.local` file in `lumasoul_ai/` with your credentials:

```bash
# Required for live Qloo API requests
QLOO_API_KEY=your_official_qloo_api_key_here

# Optional: Defaults to https://api.qloo.com
QLOO_API_BASE_URL=https://api.qloo.com
```

> **Honest Demo Mode Fallback**: If `QLOO_API_KEY` is omitted or invalid, LumaSoul AI automatically operates in an honest, labeled Demo Mode utilizing a high-fidelity curated cultural graph. Real live integration is completely wired and activates immediately upon key insertion.

---

## Local Development Setup

```bash
# 1. Clone repository and navigate to lumasoul_ai
cd lumasoul_ai

# 2. Install dependencies (Node 20+ / 22+ recommended)
npm install

# 3. Launch development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Safety & Compliance

All photometrics and control channel recommendations comply with ANSI/IES standards for residential lighting. All physical electrical installations must be verified and executed by a certified electrical contractor.

# FixMyBharat — AI-Powered Civic Intelligence Platform

> **Citizen Eyes. AI Intelligence. Municipal Action.**  
> Developed by **Team SyncMates** · Milestone 1

FixMyBharat transforms citizen observations about civic infrastructure into structured, location-aware reports that municipal authorities can prioritize and resolve.

---

## 🏛 Product Workflow

```
[ REPORT ] ──▶ [ UNDERSTAND ] ──▶ [ PRIORITIZE ] ──▶ [ RESOLVE ] ──▶ [ PREVENT ]
 Citizen        Computer Vision    Risk-Weighted      Department       Predictive Hotspot
 Camera         & LLM Triage        SLA Queue          Dispatch         Infrastructure
```

---

## 📦 Implemented Routes & Features (Milestone 1)

1. **Public Landing Page (`/`)**
   - High-impact hero section presenting the civic vision and immediate call-to-actions.
   - Comprehensive 7 civic issue category breakdown:
     - ⚠️ Potholes & Road Damage
     - 🛡️ Open Manholes & Hazardous Pits
     - 💧 Water Pipeline Leakage
     - 🗑️ Garbage & Solid Waste
     - 🌊 Drainage & Overflow
     - 💡 Streetlights & Electrical
     - 🚶 Damaged Footpaths & Walkways
   - Interactive 5-stage engine workflow walkthrough (`REPORT → UNDERSTAND → PRIORITIZE → RESOLVE → PREVENT`).
   - Symmetrical value propositions for **Citizens & Communities** and **Municipal Authorities & Ward Engineers**.

2. **Citizen Reporting Form (`/report`)**
   - Responsive multi-section submission form for desktop and mobile.
   - Image upload with live client-side preview and remove controls.
   - Category picker automatically routing to relevant municipal department.
   - Explicit user-triggered GPS location detection (non-intrusive, no automatic browser prompts).
   - Validation with descriptive field-level error messages.
   - Generates demo tracking IDs (`FMB-2026-XXXX`) with immediate feedback and navigation links.

3. **Citizen Reports Portal (`/my-reports`)**
   - Filterable, searchable registry of civic observations.
   - Live search by Complaint ID, title, or address.
   - Multi-criteria filtering by Status (`Pending`, `Assigned`, `In Progress`, `Resolved`) and Category.
   - Status, priority (`P0 Critical` to `P3 Low`), and category indicator badges.
   - Direct links to detailed dossiers.

4. **Authority Operations Console (`/dashboard`)**
   - Live KPI overview cards (Total, Pending, Assigned, In Progress, Resolved).
   - Priority queue with severity sorting and category breakdown metrics.
   - Simulated geospatial incident cluster map with hotspot markers (Leaflet / PostGIS ready).
   - Quick action drawer allowing supervisors to reassign departments/officers, update status, and append audit notes.
   - Instant synchronization with all other pages.

5. **Complaint Detail Dossier (`/complaints/[id]`)**
   - Georeferenced photograph inspection with mock Exif tag verification.
   - AI Computer Vision & Severity assessment breakdown (Confidence score, detected objects, urgency reason, repair cost estimate).
   - Immutable audit trail with timestamped logs of all state changes and officer notes.
   - Authority action console to append field reports.
   - Robust not-found state with clean recovery navigation for invalid IDs.

---

## 🛠 Tech Stack

- **Framework:** Next.js (App Router with Partial Prerendering & Cache Components)
- **Language:** TypeScript (Strict types, zero unneeded `any`)
- **Styling:** Tailwind CSS v4 (Deep navy theme `#060b14`, teal `#0d9488`, and restrained orange `#ea580c`)
- **Icons:** `lucide-react`
- **State Architecture:** Modular `IComplaintService` interface + client React context with `localStorage` sync.
- **External Tooling / MCP:** Configured with Google Stitch MCP (`@_davideast/stitch-mcp`) and Firebase MCP.

---

## 🚀 Getting Started

### 1. Installation

```bash
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the root directory:

```env
STITCH_API_KEY=your_stitch_api_key_here
NEXT_PUBLIC_APP_NAME=FixMyBharat
NEXT_PUBLIC_DEMO_MODE=true
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build & Production Check

```bash
# Type check and lint
npm run lint

# Compile production build
npm run build
```

---

## 🔒 Known Limitations & Milestone 2 Roadmap

- **Storage:** In Milestone 1, complaints are maintained in a reactive local client store (`localStorage` + cross-tab event bus). Changes persist in your browser session and across tabs, but are not yet written to a backend database.
- **Milestone 2 Migration:** The architecture is structured under `src/lib/complaintService.ts` via the `IComplaintService` interface. To switch to Supabase/PostgreSQL, implement `SupabaseComplaintService` implementing `IComplaintService` without altering any UI components.
- **GIS:** The incident cluster map renders interactive SVG/CSS geospatial placeholders; Milestone 2 will mount Leaflet / OpenStreetMap tiles and PostGIS radius spatial queries.
- **AI Triage:** Milestone 2 will connect live vision models (Gemini / Python FastAI) to classify camera uploads in real time.

---

## 👥 Credits

Developed with pride by **Team SyncMates**.  
*For questions and civic partnerships, contact Team SyncMates.*

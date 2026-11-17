# ShadiMubarak — Luxury Wedding Planning & Vendor Coordination Studio

**ShadiMubarak** is a modern, responsive wedding planning and vendor coordination web platform built with React 18, React Router, custom SVG visualizations, and client-side `localStorage` persistence. It unifies palatial vendor discovery, side-by-side vendor comparisons, cultural ceremony timelines, interactive guest-list seating layouts, itemized wedding accounts, and rule-based AI styling intelligence into one seamless luxury experience.

---

## 🌟 Core Product Features & Modules

### 1. Wedding Dashboard (`/dashboard`)
- **Auspicious Event Countdown:** Interactive countdown arch calculating days to the sacred ceremony with a date picker.
- **Milestone Progress Ring:** Real-time completion tracker for ceremony rituals and planning tasks.
- **Budget Health Overview:** Dynamic budget utilization progress bar with live remaining balance calculation.
- **Ceremony Checklist:** Interactive ritual checklist to check/uncheck tasks with instant state persistence.
- **Shubh Muhurat Auspicious Calendar:** Aligned with Vedic astrology, high Guna, and sacred Nakshatras.
- **Dream Wedding Cost Estimator:** Real-time budget allocation benchmark based on guest count and destination city.

### 2. Vendor Explorer & Directory (`/vendors`)
- **Curated Multi-Category Directory:** Handpicked partners across **Venues, Royal Catering, Bespoke Decor, and Cinema & Photography**.
- **Comprehensive Filtering & Search:**
  - Real-time text search by vendor name, style, or cuisine.
  - Category dropdown filter.
  - Destination city filter (*Jaipur, Udaipur, Delhi, Goa, Mumbai*).
  - Sorting by Highest Rating or Starting Price.
  - Verified partners audit filter.
- **Side-by-Side Comparison Matrix:** Compare up to 3 selected vendors simultaneously across pricing, ratings, experience, verified audit credentials, and aesthetic themes.

### 3. Vendor Profiles & Quotations (`/vendors/:id`)
- **Detailed Vendor Showcase:** High-resolution imagery, experience level, verified audit badges, and stylistic themes.
- **Service Tier Cards:** Interactive package selection with transparent pricing.
- **Direct Quotation Request Generator:** Custom note and requirements generator that saves inquiries directly into the user's studio.
- **Save to Shortlist:** Heart toggle to bookmark preferred vendors.

### 4. Wedding Planner & Budget Suite (`/planner`)
- **Ceremony Timeline & Ritual Pack Loader:**
  - Schedule ceremonies (*Mehendi & Sangeet, Wedding Ceremony / Saat Phere, etc.*).
  - One-click cultural tradition pack loader (*North Indian / Punjabi, Marwari / Rajasthani, South Indian*).
  - Add custom ceremonies, dates, and assign tasks with designated team members.
- **Guest List & Visual Seating Studio:**
  - Guest directory with RSVP state toggling (`Yes`, `Pending`, `No`).
  - Guest group segmentation by bride's or groom's side.
  - Visual round banqueting table layout (`T1`–`T4`) with real-time occupancy and RSVP color indicators.
- **Budget & Accounts Management:**
  - Total wedding budget target adjuster.
  - Interactive SVG Category Donut Chart.
  - Itemized expenditure ledger with `Paid` vs `Due` toggling and custom expense creation.
- **Quotation Inquiries Tracker:** Centralized tracker for all submitted vendor quote requests.

### 5. AI Styling & Vendor Insights (`/insights`)
- **Rule-Based Heuristic Visualizations:**
  1. **Preferred Wedding Themes:** Theme affinity and color palette match chart.
  2. **Frequently Viewed Vendor Types:** Real-time browsing history matrix tracked across profile views.
  3. **Budget Allocation Patterns:** Actual spend % vs recommended Vedic wedding benchmark % variance chart.
  4. **Popular Service Packages:** Most requested package tiers distribution.
  5. **Suggested Vendors by Preferences:** Algorithmic recommendation scoring based on theme harmony, ratings, and unshortlisted candidates.
- **AI Planning Suggestions & Advisory:** Automated heuristic alerts advising on budget category variances, pending milestones, and next critical tasks.

---

## 🛠️ Architecture & Tech Stack

- **Frontend Framework:** React 18 (SPA)
- **Routing:** React Router DOM (HashRouter for clean static hosting compatibility)
- **State Management:** React Context API (`StoreContext`) with transparent `localStorage` synchronization
- **Styling:** Custom CSS Design System with royal Indian wedding color tokens (Plum, Rich Gold, Emerald Teal, Ruby Rose)
- **Visualizations:** Pure SVG Data Visualizations (Donut chart, Horizontal comparative bars, Progress rings, Round-table layout)
- **Zero Backend Dependency:** 100% client-side execution with mock JSON dataset and `localStorage` persistence

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/jtaniya005/Shadi_Mubarak_Studio.git

# Navigate to project directory
cd Shadi_Mubarak_Studio

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`.

### Production Build

```bash
npm run build
```

The optimized production assets will be output to the `dist/` directory.

---

## 📄 License
This project is open-source under the MIT License.

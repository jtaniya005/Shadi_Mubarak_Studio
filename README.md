# Project 34 — Wedding Planning & Vendor Coordination Dashboard

**Assigned Student:** TANIYA JOSHI  
**Technology:** React.js  
**Development Scope:** Frontend Only  
**Application Name:** ShadiMubarak Wedding Studio  

---

## 📋 Project Specifications & Deliverables Mapping

### 1. 5 Development Tasks

| Task # | Task Name | Specifications & Implementation | File / Component |
| :--- | :--- | :--- | :--- |
| **Task 1** | **Home & Discovery Interface** | Wedding planning homepage with event countdown, milestones, budget summary and planning checklist. | [`Home.jsx`](src/pages/Home.jsx), [`Dashboard.jsx`](src/pages/Dashboard.jsx) |
| **Task 2** | **Directory & Filtering Interface** | Vendor directory for decor, photography, venues and catering with filters (search, category, city, price/rating sorting) and side-by-side comparison interface. | [`Explorer.jsx`](src/pages/Explorer.jsx), [`VendorCard.jsx`](src/components/VendorCard.jsx) |
| **Task 3** | **Details & Management Interface** | Event timeline with ceremony schedules, tasks, responsibilities and progress indicators. | [`Planner.jsx`](src/pages/Planner.jsx) (`timeline` tab) |
| **Task 4** | **Workflow & Tracking Interface** | Guest-list and budget modules with RSVP mockups, seating previews (Round tables T1–T4) and expenditure breakdowns with Donut charts. | [`Planner.jsx`](src/pages/Planner.jsx) (`guests` & `budget` tabs) |
| **Task 5** | **AI — Behavior / Data Insights** | AI planning suggestions based on sample budget categories, vendor comparisons and pending milestones. | [`Insights.jsx`](src/pages/Insights.jsx), [`Bars.jsx`](src/components/Bars.jsx) |

---

### 2. Main Pages (5)

1. **Wedding Dashboard** (`/dashboard` & `/studio`):
   - Interactive wedding countdown arch with date picker.
   - Milestone progress ring and pending ceremony tracker.
   - Real-time budget utilization progress bar.
   - Interactive ceremony checklists (check/uncheck rituals).
   - Shubh Muhurat Vedic auspicious dates selector.
   - Dream Wedding cost estimator & benchmark tool.

2. **Vendor Explorer** (`/vendors`):
   - Curated directory across 4 categories: **Venues, Catering, Decor, Photography**.
   - Multi-filter suite: live search query, category dropdown, destination city dropdown, and sorting (by rating / starting price).
   - Side-by-side comparison matrix for up to 3 selected vendors comparing verified status, pricing, themes, experience, and audit points.

3. **Vendor Profiles & Quotes** (`/vendors/:id`):
   - Detailed vendor showcase with experience, ratings, verified audit points, and themes.
   - Interactive package selection radio cards.
   - Direct quotation request generator saving quotes to `localStorage`.
   - Save / Shortlist favorite vendor profiles.

4. **Wedding Planner & Budget** (`/planner`):
   - **Ceremonies & Rituals:** Timeline schedules, cultural ritual pack loader (North Indian, Marwari, South Indian), add ceremonies and assign tasks to family members.
   - **Guest List & Seating Studio:** RSVP state management (`Yes`, `Pending`, `No`), add new guests, table assignment (`T1`–`T4`), and visual round-table seating chart.
   - **Budget & Accounts:** Dynamic total budget target, category expenditure Donut chart, itemized expense tracker with `Paid` vs `Due` toggling.
   - **Vendor Quotes:** Real-time view of all submitted quotation inquiries.

5. **AI Styling & Vendor Insights** (`/insights`):
   - **Rule-based AI features displaying (5):**
     1. *Preferred wedding themes* (Theme Affinity & Palette Match chart).
     2. *Frequently viewed vendor types* (Browsing history matrix chart).
     3. *Budget allocation patterns* (Actual spend vs Vedic benchmark variance chart).
     4. *Popular service packages* (Demand distribution chart).
     5. *Suggested vendors by preferences* (Algorithmic scoring matching theme, rating, top browsed category, and unshortlisted candidates).
   - **AI Planning Suggestions & Milestones:** Dynamic heuristic alerts on budget category overspending, milestone prioritization, and recommendations.

---

### 3. Functional Requirements (5)

- [x] **Search and compare vendors:** Real-time text search, category/city filtering, and side-by-side 3-vendor comparison matrix.
- [x] **Save preferred vendor profiles:** Heart toggle to shortlist vendors persisted in `localStorage`.
- [x] **Plan ceremony dates and tasks:** Multi-ceremony event timeline with date selection, task addition, designated person assignment, and checkbox completion.
- [x] **Track sample wedding expenses:** Budget management with itemized accounts, category Donut visualization, and Paid/Due tracking.
- [x] **View planning insights:** AI styling analytics, category variance bars, and automated heuristic suggestions.

---

### 4. Implementation Details

- **Framework:** React.js 18 (SPA)
- **Routing:** React Router DOM (HashRouter)
- **State Management:** React Context API with automatic `localStorage` persistence
- **Charts:** Native SVG charts (Donut chart, horizontal comparative bar charts, seating preview)
- **Styling:** Custom luxury royal wedding design system with palette tokens (Plum, Gold, Teal, Rose)
- **No Backend / Live API Required:** 100% client-side with mock JSON data and `localStorage`.

---

### 5. Running the Project

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build
```

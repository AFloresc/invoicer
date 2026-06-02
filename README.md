# Estimates and Invoices Manager

A fully-featured, production-ready full-stack billing dashboard designed around the **Professional Polish** styling handbook. This engine operates purely serverless via fast local browser persistence (`localStorage`) and supports professional offline PDF print renders.

---

## 🎨 Design Theme & Core Visual Identity

This system follows the **Professional Polish** guidelines:
* **Slate & Indigo Canvas Palette**: Features an adaptive layout utilising modern dark-slate (`#0f172a` for standard dark mode) and soft clinical paper white (`#ffffff` for clean light mode).
* **Corporate Visual Hierarchies**: Leverages luxurious high-contrast cards, balanced margins, crisp vector iconography, and tailored display typography for reading analytical KPIs.
* **Responsive Fluid Frame**: Adaptive bento-grid cells adjust naturally from standard hand-held mobile views up to massive desktop presentations.

---

## 🚀 Key Architectural Modules

### 1. Unified Dashboard & Performance KPIs
* **Real-time Pipeline Tracking**: Stacks accepted vs. rejected quotes to project revenue conversion streams.
* **Analytical KPI Badges**: Aggregates Outstanding Receivables, Overdue collection amounts, Accepted conversion pipeline totals, and overall settlement volumes.
* **Dynamic D3/SVG Visualisations**: Features custom SVG allocation visualizers tracking revenue distributions across multiple client targets.

### 2. Invoices Log & Financial Records
* **Collections Management**: Mark bills as `paid`, `pending` or `overdue`.
* **Proactive Collection Warnings**: Highlights high-risk collection balances visually in alert boxes to encourage immediate payment follow-up.
* **Instant Conversions**: Convert estimates to invoice ledger items instantly with one click.

### 3. Proposals Book (Estimates)
* **Custom Quotations**: Quickly draft and structure proposals with clean margin calculations.
* **Approval States**: Track quote processes through interactive `accepted`, `rejected`, or `pending` status indicators.

### 4. Client Profile Directory & Autofill integration (New)
* **Enterprise Directory**: Add, update, and persist corporate customer contact details.
* **Dynamic Billing Autofill**: Easily select pre-configured profiles in the Document Form to instantly populate client contacts.

### 5. Settings & Brand Customizer
* **Corporate Letterheads**: Custom profile metadata details save as the default header on all reports.
* **Brand Logo Uploads**: Select custom base64 logos that populate automatically on estimates and invoices.

---

## 🖨️ Seamless High-Contrast Print Configuration

This application includes custom tailored `@media print` layout configurations:
* **Pure High-Contrast Mono Rendering**: Hides headers, navigation buttons, and toolbars automatically.
* **Calculated Multi-Page Clean Margins**: Formatted tables fit cleanly onto Standard A4 sheets.
* **Interactive Watermark Badging**: Preserves transaction audit trails and timestamp logs at the top.

---

## ⚙️ Development & Maintenance Configurations

### 1. Build & Launch Routines
* Launch localhost preview server: `npm run dev`
* Package standard production static builds: `npm run build`
* Wipe logs \& artifact assets: `npm run clean`

### 2. Local State Management
All states are managed via local key definitions:
* Settings: `inv_mgmt_settings`
* Invoices: `inv_mgmt_invoices`
* Estimates: `inv_mgmt_estimates`
* Customers: `inv_mgmt_customers`

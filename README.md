# Estimates and Invoices Manager

A fully-featured, production-ready full-stack billing dashboard designed around the **Professional Polish** styling handbook. This engine operates purely serverless via fast local browser persistence (`localStorage`) and supports professional offline PDF print renders.

All components have been carefully refactored into modular sub-100-line microcomponents, dramatically raising codebase maintainability and type separation.

---

## 🎨 Design Theme & Core Visual Identity

This system follows the **Professional Polish** guidelines:
* **Slate & Indigo Canvas Palette**: Features an adaptive layout utilising modern dark-slate (`#0f172a` for standard dark mode) and soft clinical paper white (`#ffffff` for clean light mode).
* **Corporate Visual Hierarchies**: Leverages luxurious high-contrast cards, balanced margins, crisp vector iconography, and tailored display typography for reading analytical KPIs.
* **Responsive Fluid Frame**: Adaptive bento-grid cells adjust naturally from standard hand-held mobile views up to massive desktop presentations.

---

## 📂 Modular File & Project Structure

The codebase is engineered with strict modular isolation. No individual component exceeds 150 lines:

```text
src/
├── main.jsx                 # Main entry point booting React
├── App.jsx                  # Main wrapper coordinating states and routing
├── theme.js                 # Shared createTheme (MUI) configuration for themes
├── translations.js          # Translation dictionaries for multilanguage support
├── utils.js                 # Shared mathematical, parsing and localStorage persistence helpers
└── components/
    ├── SidebarMenu.jsx               # Left-anchored corporate brand navigation rail
    ├── AppToolbar.jsx                # Fixed application topbar with dark mode toggle
    ├── KPICard.jsx                   # Individual elegant KPI metric visualizer
    ├── PipelineProgressCard.jsx      # Progress bar card tracking estimate conversion goals
    ├── KPICards.jsx                  # Grid displaying aggregated KPI metrics
    ├── RevenueAllocationChart.jsx    # Custom SVG donut-chart plotting company revenue allocations
    ├── TransactionStatusCounters.jsx # Graphic linear bars representing volume distribution
    ├── RecentTransactionsTable.jsx   # Generic clickable transactions spreadsheet
    ├── Dashboard.jsx                 # Financial analytics dashboard combining charts & tables
    ├── CustomerStats.jsx             # Active entities and corporate metrics widgets
    ├── CustomerTable.jsx             # CRM table detailing corporate directory entities
    ├── CustomerDialog.jsx            # Create and edit popups for client profiles
    ├── CustomersManager.jsx          # Database manager for customer relationships
    ├── OverdueAlert.jsx              # Outstanding accounts warning banner
    ├── InvoiceFilters.jsx            # Multi-state segment selector for invoice logs
    ├── InvoicesTable.jsx             # Spreadsheet table tracking general invoice billing ledgers
    ├── InvoiceManager.jsx            # Invoices overview section
    ├── EstimateFilters.jsx           # Quote search filters panel
    ├── EstimatesTable.jsx            # Ledger table tracking quotation books
    ├── EstimateManager.jsx           # Estimates and quotation books section
    ├── ActionPanel.jsx               # Print and close preview controls bar
    ├── LetterheadHeader.jsx          # Branding header with auto-populating logo
    ├── BilledPartySection.jsx        # Client billing addresses box
    ├── TermsNotesSection.jsx         # Disclaimer and warranty footnotes
    ├── DocPreview.jsx                # A4 print-mimic deliverable preview sheet
    ├── LogoSection.jsx               # Base64 brand image drag selector
    ├── DocumentReferenceSection.jsx  # IDs and issue/due dates calendar picker
    ├── ClientDetailsSection.jsx      # Client organizer with CRM autofill dropdown
    ├── LineItemsTableSection.jsx     # Tabular product/service invoice item draft builder
    ├── TaxDiscountSummarySection.jsx # Subtotal, discounts, and compound interest calculators
    └── DocumentForm.jsx             # Comprehensive form builder compiling invoice/estimate drafts
```

---

## ⚙️ Core Refactoring Strategy

The architecture was systematically modularized to enforce strict separation of concerns:
1. **Dumb Display vs. Stateful Containers**: Layout wrappers handle only state manipulation, whereas small subcomponents are purely declarative.
2. **Eliminated Nested Definitions**: All nested subcomponents were extracted into distinct, reusable filenames under `/src/components/`, ensuring single-responsibility structures.
3. **Optimized Dependency Arrays**: Handlers are memorized cleanly or defined externally to prevent React infinite re-renders.

---

## 🚀 Key Architectural Modules

### 1. Unified Dashboard & Performance KPIs
* **Dynamic Timeframe Filters**: Filter entire company metrics, charts, and transaction lists in real-time by current Week (Mon-Sun), current Month, Trimester (Quarterly), Semester (6 months), current Financial Year, Custom range (with dual date selectors), or view All data.
* **Real-time Pipeline Tracking**: Stacks accepted vs. rejected quotes to project revenue conversion streams.
* **Analytical KPI Badges**: Aggregates Outstanding Receivables, Overdue collection amounts, Accepted conversion pipeline totals, and overall settlement volumes based on the active timeframe.
* **Dynamic SVG Visualisations**: Features custom SVG allocation visualizers tracking revenue distributions across multiple client targets.

### 2. Invoices Log & Financial Records
* **Collections Management**: Mark bills as `paid`, `pending` or `overdue`.
* **Proactive Collection Warnings**: Highlights high-risk collection balances visually in alert boxes to encourage immediate payment follow-up.
* **Instant Conversions**: Convert estimates to invoice ledger items instantly with one click.

### 3. Proposals Book (Estimates)
* **Custom Quotations**: Quickly draft and structure proposals with clean margin calculations.
* **Approval States**: Track quote processes through interactive `accepted`, `rejected`, or `pending` status indicators.

### 4. Client Profile Directory & Interactive Ledgers
* **Enterprise CRM Directory**: Add, update, and persist corporate customer contact details.
* **Interactive Customer Profile Views**: Clicking any customer opens a specialized customer financial dashboard displaying customer-specific KPIs (Total Invoiced, Revenue Collected, Pending Balance, Overdue Receivables) and an interactive table of all invoices issued to them with direct preview launchers.
* **Dynamic Billing Autofill**: Easily select pre-configured profiles in the Document Form to instantly populate client contacts.

### 5. Settings & Brand Customizer
* **Corporate Letterheads**: Custom profile metadata details save as the default header on all reports.
* **Brand Logo Uploads**: Select custom base64 logos that populate automatically on estimates and invoices.
* **Multilanguage Configuration**: Change the default output language for invoices and estimates dynamically (English, Spanish, or Catalan).

### 6. Responsive Fluid Frame
* **Full Multi-Device Responsiveness**: Tailored layout grids, adaptive dialogs, collapsing menus, and scrollable tables designed to present beautifully and operate perfectly on hand-held mobile devices, tablets, laptops, and ultra-wide monitor screens.

### 7. 🌍 Multilanguage Deliverables Support
The application provides full support for localized deliverables. Users can switch their default language in the settings, which seamlessly translates all invoice and estimate client-facing content:
* **English (Default)**: Standard international terminology.
* **Español (Spanish)**: Localized terminology including fields like *FACTURA*, *PRESUPUESTO*, *Fecha de vencimiento*, and customizable tax labels.
* **Català (Catalan)**: Fully localized Catalan translation addressing specific regional requirements (*FACTURA*, *PRESSUPOST*, *Data d'emissió*, *Data de venciment*, etc.).

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

---

## 🚀 Deployment site
🌐 [Live site](https://invoices-manager-v1.netlify.app/)

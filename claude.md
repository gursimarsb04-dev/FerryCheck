# FerryCheck Project Guidelines (CLAUDE.md)

## Project Overview
Carteret, NJ is building a $48 million ferry terminal marketed as an environmentally friendly alternative to driving, but a diesel ferry's carbon footprint scales inversely with its passenger load [1, 2]. FerryCheck is a single-page interactive web application that calculates the exact passenger occupancy rate required for the ferry's CO2 emissions per rider to become lower than driving a car solo to Manhattan [3, 4]. The tool provides an interactive seat map, real-time emission comparisons against other transit modes, and a data-driven verdict to hold the project accountable to its green claims [5, 6].

## Tech Stack
*   **Frontend UI:** Antigravity + React [7, 8]
*   **Backend / Logic:** Claude Code [7, 8]
*   **Map:** Leaflet.js [7, 8]
*   **Charts:** Recharts (via Antigravity) [8]
*   **Styling:** Tailwind CSS [8]
*   **AI Panel (optional):** Claude API (claude-sonnet-4-20250514) [7]
*   **Deployment:** Vercel [7, 8]
*   **Research Layer:** NotebookLM (pre-build) [7, 8]

## Expected File Structure
```text
/src
  ├── App.js                      # Main assembly of the 3 Acts
  ├── constants.js                # Single source of truth for all data points
  ├── components/
  │   ├── Act1_TheClaim.js        # Static scroll-triggered hero section
  │   ├── Act2_TheCheck.js        # Interactive core layout
  │   ├── SeatMap.js              # Interactive 149-seat grid & slider
  │   ├── EmissionsChart.js       # Live Recharts bar chart
  │   ├── RouteMap.js             # Leaflet.js map with last-mile overlay
  │   └── Act3_TheVerdict.js      # Static conclusion and benchmarks
  ├── utils/
  │   └── emissionsLogic.js       # Core math and breakeven functions
  └── index.css                   # Tailwind imports
Constants
All application variables must live in a single constants.js file so they can easily be swapped once final research is completed
.
// constants.js — replace placeholders with confirmed values
export const VESSEL_CAPACITY = 149;              // confirmed
export const ROUTE_DISTANCE_KM = 40;             // placeholder
export const FERRY_BASE_EMISSIONS_G = 113200;    // placeholder
export const CAR_CO2_PER_KM = 180;               // confirmed
export const BUS_CO2_PER_KM = 27;                // confirmed
export const TERMINAL_DRIVE_KM = 5;              // placeholder
export const NYC_FERRY_YEAR1_OCCUPANCY = 0.0;    // teammate to fill
export const CARTERET_PROJECTED_RIDERSHIP = 0;   // teammate to fill
export const PERCENT_DRIVE_TO_TERMINAL = 0.60;   // assumed based on 700-space lot
export const OFFICIAL_QUOTE = "[exact quote] - [source]"; // teammate to fill
Core Functions
These functions should be housed in /src/utils/emissionsLogic.js and calculate all metrics in grams of CO2 per passenger
.
calculateFerryCO2PerPax(passengerCount)
Signature: (number) -> number
Logic: Returns FERRY_BASE_EMISSIONS_G / passengerCount.
calculateSoloCarCO2()
Signature: () -> number
Logic: Returns CAR_CO2_PER_KM * ROUTE_DISTANCE_KM. (Should equal 7,200g with placeholders).
calculateCarpoolCO2()
Signature: () -> number
Logic: Returns calculateSoloCarCO2() / 2.
calculateBusCO2()
Signature: () -> number
Logic: Returns BUS_CO2_PER_KM * ROUTE_DISTANCE_KM.
calculateAdjustedFerryCO2(passengerCount)
Signature: (number) -> number
Logic: Calculates the full door-to-door trip footprint for riders using the parking lot. Returns calculateFerryCO2PerPax(passengerCount) + (CAR_CO2_PER_KM * TERMINAL_DRIVE_KM).
calculateBreakevenPassengers()
Signature: () -> number
Logic: Returns FERRY_BASE_EMISSIONS_G / calculateSoloCarCO2().
calculateBreakevenPercentage()
Signature: () -> number
Logic: Returns (calculateBreakevenPassengers() / VESSEL_CAPACITY) * 100.
Build Order
Antigravity: Build the Act 2 seat map + chart component (use the specific prompt defined in the rules below)
.
Claude Code: Wire the core emissions formula, connect the slider to the chart bidirectionally, and implement breakeven visual logic
.
Antigravity: Build Act 1 static hero section
.
Claude Code: Build Act 3 verdict section to render the dynamically computed breakeven number alongside the teammate's confirmed constants
.
Integration: Connect all three acts into one scrolling page structure
.
Refinement: Polish UI, add the "Include drive-to-terminal" last-mile toggle (if time permits), and deploy to Vercel
.
Final Data: Swap placeholder constants for confirmed numbers when delivered by the research teammate
.
Claude Code Rules & Requirements
State Management: The passenger count is the single source of truth. The slider and seat map must be bidirectionally synced, and emissions calculations must recalculate instantly without lag or loading states
.
Visual Seat Map Constraints: The interactive grid must represent exactly 149 seats. Arrange as either 15 columns × 10 rows (150 cells, disable 1) or 17 × 9 (153 cells, disable 4). Seats must be 24px × 24px with a 4px gap. Filled seats must use bright teal or green (#4FC3F7 or #43A047), and empty seats must use light grey (#E0E0E0)
.
Chart Indicators: The Recharts bar chart must have a horizontal dashed reference line pinned at the calculateSoloCarCO2() value (e.g., 7200). When the ferry's emission bar drops below this line, the bar must turn green and a "Ferry wins" label must appear
.
Styling Theme: The application must utilize Tailwind CSS. Use a dark navy background with large white type for Act 1 (The Claim) to set a serious tone, and clean white card bodies for the interactive components
.
Antigravity Prompt: When constructing the interactive core, adhere to this exact prompt structure: "Build a React component with two synced elements: (1) a 149-seat grid where each seat is a small circle, filled teal when occupied and grey when empty, seats fill left-to-right top-to-bottom; (2) a slider below the grid ranging from 1 to 149. Dragging the slider fills seats in real time. Clicking a seat toggles it and updates the slider. Show current count as a large bold number above the grid. On the right side, show a live bar chart using Recharts with four bars: Ferry, Solo Car, Carpool, Bus — values update as seat count changes using the formula: ferry_co2 = 113200 / passenger_count. Add a horizontal dashed reference line at 7200 (solo car value). When ferry bar drops below 7200, turn it green and show label 'Ferry wins'. Style with Tailwind, dark navy header, clean white card body."
Transparency: You must display the following disclaimer exactly as written in the app footer: "Emissions data sourced from DEFRA 2024 Greenhouse Gas Conversion Factors and the Carteret Ferry Terminal Environmental Assessment. CO2-only model. Last-mile emissions based on 60% drive-to-terminal assumption. All assumptions are disclosed in our methodology document."
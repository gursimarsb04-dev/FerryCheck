# Full Implementation Plan: Carteret FerryCheck Web Application

This document outlines a comprehensive, step-by-step implementation plan for building the FerryCheck interactive web application. The plan maps the requested architectural and execution facets to the precise requirements of the Carteret Ferry Project outlined in [claude.md](file:///Users/gursimarsingh/Cartetet_FerryCheck/claude.md).

## 1. Architecture Decisions

*   **Frontend Framework**: **React (Single-Page Application)**. The app will be a fast, interactive web app structured around three scrolling "Acts" to tell a data-driven story.
*   **State Management**: **React Context / Local State**. Given the focused nature of the app, global state (like the single source of truth `passengerCount`) can be managed at the top level (`App.js`) and passed down to child components without needing an external store like Zustand.
*   **Backend & Data Layer**: **Serverless / Static Constants**. The primary data will be housed in a strict `constants.js` file for easy updates when NotebookLM research is finalized.
*   **Styling**: **Tailwind CSS**. Used to rapidly build the dark navy header (The Claim) and clean white cards for the interactive components (The Check).

## 2. Backend & AI Services

*   **Logic Engine**: Pure client-side JavaScript (`emissionsLogic.js`) for instant, zero-latency breakeven calculations.
*   **AI Panel**: Integration with the **Claude API (`claude-sonnet-4-20250514`)**. A serverless function (e.g., Vercel API Route) will securely proxy requests to the Claude API to provide dynamic insights or answer user questions about the environmental impact.
*   **Research Layer**: **NotebookLM**. Used pre-build to verify emissions constants, quotes, and assumptions before pushing final data to production.

## 3. Frontend Services

### Web UI Component Structure
*   `src/App.js`: Main assembly and state owner (`passengerCount`).
*   `src/components/`
    *   `Act1_TheClaim.js`: Static, scroll-triggered hero section setting the serious tone.
    *   `Act2_TheCheck.js`: The interactive core housing the map, chart, and slider.
    *   `SeatMap.js`: 149-seat grid syncing bidirectionally with a slider.
    *   `EmissionsChart.js`: Live Recharts bar chart comparing Ferry, Solo Car, Carpool, and Bus.
    *   `RouteMap.js`: Leaflet.js map with a last-mile driving overlay and route visualization.
    *   `Act3_TheVerdict.js`: Static conclusion showing the dynamically computed breakeven number.

### Core Interactions
*   **Seat Map & Slider**: Dragging the slider from 1-149 fills the seats left-to-right, top-to-bottom. Clicking empty/filled seats toggles the state and updates the slider.
*   **Real-time Charting**: As `passengerCount` changes, `EmissionsChart.js` instantly recalculates formulas and re-renders without lag.

## 4. Database Schema

The functional core of FerryCheck is a client-side calculator relying on dynamic math tied to static variables. A traditional relational database (e.g., Supabase or PostgreSQL) is not strictly required. 

However, if analytics or AI chat history tracking is needed later:
*   **Global Data Schema**: Maintained in `src/constants.js` (e.g., `VESSEL_CAPACITY = 149`, `CAR_CO2_PER_KM = 180`).
*   **Optional Telemetry (Supabase)**: A lightweight `analytics` table can be added to log anonymized simulation metrics (e.g., the average `passengerCount` users settle on) or queries asked to the Claude AI panel.

## 5. API Contracts & Prompts

### Core Math Logic Contracts (`emissionsLogic.js`)
*   `calculateFerryCO2PerPax(passengerCount)`: Returns `FERRY_BASE_EMISSIONS_G / passengerCount`.
*   `calculateSoloCarCO2()`: Returns 7,200g.
*   `calculateAdjustedFerryCO2(passengerCount)`: Core full-trip footprint computation inclusive of terminal parking.
*   `calculateBreakevenPassengers()`: Resolves the dynamic breakeven target point.

### System Prompt Structure (Claude AI Panel)
If an AI assistant panel is exposed within the UI, API requests will use the following context prompt:
```text
You are an environmental data analyst assistant for the Carteret FerryCheck application.
Your goal is to explain the CO2 breakeven point between the Carteret diesel ferry and solo car driving.

Guidelines:
1. Ground all answers in our core constants: Capacity = 149, Car CO2/km = 180g.
2. Keep explanations strictly factual, concise, and objective.
3. If users ask about alternative solutions, strictly suggest referencing the project's methodology document.
```

## 6. Deployment Workflow

*   **Version Control & CI/CD**: GitHub integrated with **Vercel** for automatic preview deployments on every pull request.
*   **Production Build**: Vercel handles the optimized production build of the React frontend and any required Serverless API Functions for the AI Panel.
*   **Rollout**: Share Vercel preview URLs with the research teammate to review and finalize `constants.js` values before the final production push.

## 7. Vertical Slices (Execution Plan)

This actionable, step-by-step execution plan applies increasing complexity for AI-assisted coding:

### Slice 1: Constants & Engine Foundation
*   Initialize React web app with Tailwind CSS.
*   Create `src/constants.js` and populate with confirmed/placeholder variables.
*   Implement and unit test `src/utils/emissionsLogic.js` to ensure the math perfectly aligns with the constants.

### Slice 2: Act 2 - The Interactive Core (Seat Map & Chart)
*   Build the `SeatMap` component with a 149-grid constraint (15x10 or 17x9) and a bidirectional range slider.
*   Build the `EmissionsChart` using Recharts, explicitly adding the dashed reference line at `calculateSoloCarCO2()`.
*   Link local state (`passengerCount`) to both components, ensuring the "Ferry wins" green trigger functions correctly.

### Slice 3: Act 2 - Route Map Integration
*   Implement `RouteMap.js` using Leaflet.js.
*   Plot the 40km terminal-to-Manhattan route and add visual overlays reflecting the 60% drive-to-terminal assumption.

### Slice 4: Acts 1 & 3 - Narrative Wrappers
*   Build `Act1_TheClaim.js` utilizing dark navy backgrounds, large white typography, and scroll-reveal animations to set the stage.
*   Build `Act3_TheVerdict.js` to display the final calculated breakeven passenger number.
*   Add the mandatory transparency disclaimer to the application footer.

### Slice 5: Integration, Polish, & AI Extensibility
*   Assemble `App.js` integrating all three Acts into a seamless vertical scroll.
*   Verify UI aesthetics and responsive constraints.
*   (Optional) Stand up a Vercel API Route to securely proxy `claude-sonnet-4-20250514`. 
*   Perform final data swap once the NotebookLM research is complete.

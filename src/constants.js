// constants.js — single source of truth for all data
// Confirmed values from NotebookLM research, EA documents, and project spec (Updates.MD)

// ─── VESSEL ───────────────────────────────────────────────────────
export const VESSEL_CAPACITY = 149;                   // confirmed [EA, press releases]
export const FERRY_CAPACITY = VESSEL_CAPACITY;         // alias used by routeCalculator
export const FERRY_ASSUMED_OCCUPANCY = 45;             // 30% of capacity, conservative Year 1 estimate

// ─── ROUTE DISTANCES (ferry and car travel different paths) ──────
export const FERRY_ROUTE_KM = 33;                     // ~18 Nm navigable waterway via Arthur Kill + Kill Van Kull [Savvy Navvy]
export const EA_FERRY_ROUTE_KM = 32.2;                // EA modeled 20-mile one-way route [EA Table 3.10-1]
export const CAR_ROUTE_KM = 41;                       // 25.5 mi via I-278 E [Google Maps, verified]
export const EA_CAR_ROUTE_KM = 48.3;                  // EA modeled 30-mile "No Build" driving baseline [EA Table 3.10-1]

// ─── EMISSIONS ───────────────────────────────────────────────────
export const FERRY_BASE_EMISSIONS_G = 730000;          // 73 gal one-way × 10 kg CO2/gal — NOT scaled [EA Table 3.10-1]
export const CAR_CO2_PER_KM = 180;                     // US fleet average [DEFRA 2024]
export const BUS_CO2_PER_KM = 27.2;                    // confirmed [DEFRA 2024]
export const BUS_CO2_PER_PAX_KM = BUS_CO2_PER_KM;     // alias used by routeCalculator
export const TRAIN_CO2_PER_KM = 41;                    // NJ Transit diesel, estimated [DEFRA 2024]
export const TRAIN_CO2_PER_PAX_KM = TRAIN_CO2_PER_KM; // alias used by routeCalculator
export const NJ_TRANSIT_BUS_CO2 = 1115;                // Math.round(27.2 × 41 km car route) = 1115g per pax [derived]

// ─── COSTS ───────────────────────────────────────────────────────
export const FERRY_FARE = 25;                          // estimated
export const BUS_FARE = 6.50;                          // NJ Transit estimate
export const TRAIN_FARE = 9.00;                        // Rahway to Penn Station, estimated
export const CAR_TOLLS_ROUND_TRIP = 18;                // NJ Turnpike + tunnel estimate
export const CAR_PARKING_PER_DAY = 40;                 // Manhattan average
export const CAR_GAS_COST_PER_KM = 0.12;               // estimated
export const FERRY_LAST_MILE_UBER = 15;                // estimated average Uber from pier to destination

// ─── TIME ────────────────────────────────────────────────────────
export const FERRY_TIME_WATER_MINS = 25;               // ~18 Nm at ~25 knots [Savvy Navvy, Patch.com]

// ─── CARPOOL ─────────────────────────────────────────────────────
export const CARPOOL_PASSENGERS = 3;                   // assumed average carpool size [Updates.MD spec]

// ─── WALK ────────────────────────────────────────────────────────
export const WALK_CO2 = 0;                             // zero emissions for walking
export const WALK_COST = 0;                            // free to walk
export const WALK_CALORIES_PER_KM = 65;                // approximate

// ─── SUBWAY ─────────────────────────────────────────────────────
export const SUBWAY_FARE = 2.90;                        // NYC MTA single ride [2024]

// ─── TRAIN STATION ──────────────────────────────────────────────
export const RAHWAY_STATION_ADDRESS = 'Rahway Station, Rahway, NJ 07065'; // nearest NJ Transit rail station

// ─── LAST MILE / TERMINAL ────────────────────────────────────────
export const TERMINAL_DRIVE_KM = 5;                    // assumed average [EA]
export const TERMINAL_ADDRESS = 'Carteret Waterfront Park, Carteret, NJ 07008';
export const PERCENT_DRIVE_TO_TERMINAL = 0.84;         // 84-95% per EA (73% drove alone, 11% carpool, 11% drop-off)
export const PARKING_SPACES = 700;                     // ~696-700 spaces [EA, press releases]

// ─── RIDERSHIP ───────────────────────────────────────────────────
export const CARTERET_PROJECTED_RIDERSHIP = 74500;     // annual future year forecast [EA]
export const DAILY_RIDERSHIP_LOW = 739;                // avg weekday boardings, base year low [EA]
export const DAILY_RIDERSHIP_HIGH = 1606;              // avg weekday boardings, base year high [EA]
export const DAILY_ROUND_TRIPS = 4;                    // 3-4 daily round trips at launch [EA]
export const NYC_FERRY_YEAR1_OCCUPANCY = 0.0;          // teammate to fill

// ─── QUOTES ──────────────────────────────────────────────────────
export const OFFICIAL_QUOTE = "From the beginning of my Administration, we have invested in expanding environmentally friendly transportation infrastructure that provides commuters with more options and reduces traffic on our roads. — Governor Phil Murphy, December 12, 2025";
export const PROJECT_GOAL_QUOTE = "To provide reliable and more environmentally-friendly transportation service to New York City — Carteret Ferry Terminal Environmental Assessment, September 25, 2024";

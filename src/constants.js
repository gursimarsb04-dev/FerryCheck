// constants.js — confirmed values from NotebookLM research & EA documents

// VESSEL
export const VESSEL_CAPACITY = 149;                   // confirmed [EA, press releases]

// ROUTE DISTANCES (ferry and car travel different paths)
export const FERRY_ROUTE_KM = 33;                     // ~18 Nm navigable waterway via Arthur Kill + Kill Van Kull [Savvy Navvy]
export const EA_FERRY_ROUTE_KM = 32.2;                // EA modeled 20-mile one-way route [EA Table 3.10-1]
export const CAR_ROUTE_KM = 41;                       // 25.5 mi via I-278 E [Google Maps, verified]
export const EA_CAR_ROUTE_KM = 48.3;                  // EA modeled 30-mile "No Build" driving baseline [EA Table 3.10-1]

// EMISSIONS
export const FERRY_BASE_EMISSIONS_G = 730000;          // 73 gal one-way × 10 kg CO2/gal — NOT scaled [EA Table 3.10-1]
export const CAR_CO2_PER_KM = 180;                     // confirmed [DEFRA 2024]
export const BUS_CO2_PER_KM = 27.2;                    // confirmed [DEFRA 2024]
export const NJ_TRANSIT_BUS_CO2 = 1115;                // Math.round(27.2 × 41 km car route) = 1115g per pax [derived]

// LAST MILE
export const TERMINAL_DRIVE_KM = 5;                    // assumed average [EA]
export const PERCENT_DRIVE_TO_TERMINAL = 0.84;         // 84-95% per EA (73% drove alone, 11% carpool, 11% drop-off)
export const PARKING_SPACES = 700;                     // ~696-700 spaces [EA, press releases]

// RIDERSHIP
export const CARTERET_PROJECTED_RIDERSHIP = 74500;     // annual future year forecast [EA]
export const DAILY_RIDERSHIP_LOW = 739;                // avg weekday boardings, base year low [EA]
export const DAILY_RIDERSHIP_HIGH = 1606;              // avg weekday boardings, base year high [EA]
export const DAILY_ROUND_TRIPS = 4;                    // 3-4 daily round trips at launch [EA]
export const NYC_FERRY_YEAR1_OCCUPANCY = 0.0;          // teammate to fill

// QUOTES
export const OFFICIAL_QUOTE = "From the beginning of my Administration, we have invested in expanding environmentally friendly transportation infrastructure that provides commuters with more options and reduces traffic on our roads. — Governor Phil Murphy, December 12, 2025";
export const PROJECT_GOAL_QUOTE = "To provide reliable and more environmentally-friendly transportation service to New York City — Carteret Ferry Terminal Environmental Assessment, September 25, 2024";

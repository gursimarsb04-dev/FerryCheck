Here's the updated MD with Google Maps integrated:

CarteretCommute — Project Spec
What It Is
A commute optimizer for Carteret, NJ residents traveling anywhere in NYC. User enters a starting address in Carteret and a destination in NYC. The app uses the Google Maps API to calculate real route distances and times for each mode, then layers confirmed emissions and cost data on top. An AI layer synthesizes everything into a plain English personalized recommendation.
The Six Routes

Ferry + Last Mile — Drive or walk to Carteret terminal, ferry to Manhattan, walk or Uber to final destination
Car — Drive door to door through Staten Island or NJ Turnpike, tunnel, park in Manhattan
NJ Transit Bus — Bus from Carteret to Port Authority, walk or subway to destination
Drive to Train + Subway — Drive to Rahway or Woodbridge station, NJ Transit to Penn Station, subway to destination
Carpool — Share a car with 3 passengers, same route as solo car, emissions and cost split per passenger
Walk to New York — Walk from Carteret across Goethals Bridge, through Staten Island, over Verrazzano, through Brooklyn, into Manhattan. Treated with complete seriousness.

Three Outputs Per Route

Carbon — grams CO2 total, door to door
Cost — dollar estimate including fares, gas, tolls, parking, or split costs
Time — total minutes pulled directly from Google Maps API including real-time traffic

Google Maps API Usage
Google Maps is the source of truth for all distance and time calculations. Static constants are used only for emissions factors and fares.
DRIVING_ROUTE — Google Maps Directions API, mode: driving
  Returns: distance_km, duration_mins for car and carpool routes

TRANSIT_ROUTE — Google Maps Directions API, mode: transit
  Returns: duration_mins, transit steps for bus and train routes

WALKING_ROUTE — Google Maps Directions API, mode: walking
  Returns: distance_km, duration_mins for walk route

FERRY_ROUTE — Split into three legs:
  Leg 1: Google Maps driving directions from origin to Carteret terminal
  Leg 2: Fixed waterway distance 33km (~18 Nm via Arthur Kill + Kill Van Kull), fixed ferry time 25 mins
  Leg 3: Google Maps walking or driving directions from Manhattan terminal to destination
All distance and time values passed to the Claude API come from Google Maps responses, not hardcoded constants. Constants are used only where Google Maps cannot provide data (ferry waterway segment, emissions factors, fares).
Confirmed Constants
javascript// FERRY
ROUTE_DISTANCE_WATER_KM = 33          // ~18 Nm via Arthur Kill + Kill Van Kull [Savvy Navvy, verified]
FERRY_CAPACITY = 149                   // confirmed [EA, press releases]
FERRY_ASSUMED_OCCUPANCY = 45          // 30% of capacity, conservative Year 1 estimate
FERRY_BASE_EMISSIONS_G = 730000       // 73 gal one-way × 10 kg CO2/gal [EA Table 3.10-1, confirmed]
FERRY_FARE = 25                        // estimated
FERRY_TIME_WATER_MINS = 25            // ~18 Nm at ~25 knots [Savvy Navvy, Patch.com]
FERRY_LAST_MILE_UBER = 15             // estimated average, varies by destination

// CAR + CARPOOL
CAR_CO2_PER_KM = 180                  // US fleet average, grams
CAR_TOLLS_ROUND_TRIP = 18             // NJ Turnpike + tunnel estimate
CAR_PARKING_PER_DAY = 40             // Manhattan average
CAR_GAS_COST_PER_KM = 0.12           // estimated
CARPOOL_PASSENGERS = 3                // assumed average carpool size

// BUS
BUS_CO2_PER_PAX_KM = 27.2            // DEFRA 2024, confirmed
BUS_FARE = 6.50                       // NJ Transit estimate

// TRAIN
TRAIN_CO2_PER_PAX_KM = 41            // NJ Transit diesel, estimated
TRAIN_FARE = 9.00                     // Rahway to Penn Station, estimated

// WALK
WALK_CO2 = 0                         // confirmed
WALK_COST = 0                        // confirmed
WALK_CALORIES_PER_KM = 65           // approximate

// TERMINAL
TERMINAL_ADDRESS = "Carteret Waterfront Park, Carteret, NJ 07008"
TERMINAL_DRIVE_KM = 5                // average Carteret resident to terminal, assumed
PERCENT_DRIVE_TO_TERMINAL = 0.84    // 84-95% per EA (73% drove alone, 11% carpool, 11% drop-off)
```

## Emissions Derived Calculations
All distances below are replaced at runtime with Google Maps values. These are reference estimates only.
```
FERRY_AT_30PCT = FERRY_BASE_EMISSIONS_G / 45 = 16,222g per passenger
FERRY_WITH_LASTMILE = 16,222 + (180 × terminal_drive_km from Google Maps) = ~17,122g
BUS_TOTAL = 27.2 × google_maps_transit_distance_km
CAR_TOTAL = 180 × google_maps_driving_distance_km
CARPOOL_TOTAL = CAR_TOTAL / 3
TRAIN_TOTAL = 41 × google_maps_transit_distance_km
WALK_TOTAL = 0g
```

## Borough Adjustments
Google Maps destination coordinates are used to detect borough. The AI adjusts its recommendation accordingly:
- **Manhattan Midtown** — Ferry competitive on time, strong on carbon
- **Manhattan Downtown** — Ferry fastest, strongest overall option
- **Brooklyn** — Ferry last mile adds cost, carpool more competitive on time
- **Queens** — Train or bus likely wins on time, ferry loses last mile advantage
- **Bronx** — Train wins, ferry is weakest option
- **Staten Island** — Car or carpool dominates, ferry irrelevant

## Tech Stack
- Frontend: Antigravity + React + Tailwind
- Google Maps: Directions API + Places Autocomplete
- Charts: Recharts
- AI: Claude API (claude-sonnet-4-20250514)
- Deployment: Vercel

## File Structure
```
/src
  ├── App.js
  ├── constants.js
  ├── components/
  │   ├── InputPanel.js           // Google Places Autocomplete inputs
  │   ├── RouteCard.js
  │   ├── RouteGrid.js
  │   ├── SortToggle.js
  │   └── RecommendationPanel.js
  └── utils/
      ├── emissionsLogic.js       // emissions calculations
      ├── routeCalculator.js      // combines Google Maps data with constants
      └── mapsClient.js           // all Google Maps API calls
Google Maps API Call Structure
javascript// mapsClient.js

// Driving route (car + carpool)
getDrivingRoute(origin, destination)
  → { distance_km, duration_mins }

// Transit route (bus + train)
getTransitRoute(origin, destination)
  → { duration_mins, steps }

// Walking route
getWalkingRoute(origin, destination)
  → { distance_km, duration_mins }

// Ferry leg 1: origin to terminal
getFerryDriveToTerminal(origin)
  → { distance_km, duration_mins }

// Ferry leg 3: Manhattan terminal to destination
getFerryLastMile(destination)
  → { distance_km, duration_mins, recommended_mode: "walk" | "uber" }
Core Calculation Functions
javascript// routeCalculator.js

calculateFerryCarbon(terminalDriveKm, lastMileKm)
calculateFerryTime(terminalDriveMins, lastMileMins)
calculateFerryCost(lastMileKm)

calculateCarCarbon(drivingDistanceKm)
calculateCarTime(drivingMins)
calculateCarCost(drivingDistanceKm)

calculateCarpoolCarbon(drivingDistanceKm)
calculateCarpoolCost(drivingDistanceKm)
// time same as car

calculateBusCarbon(transitDistanceKm)
calculateBusTime(transitMins)
calculateBusCost()

calculateTrainCarbon(transitDistanceKm)
calculateTrainTime(transitMins)
calculateTrainCost()

calculateWalkCarbon()              // always 0
calculateWalkTime(walkingMins)
calculateWalkCost()                // always 0
calculateWalkCalories(walkingKm)
Claude API Call Structure
javascript{
  model: "claude-sonnet-4-20250514",
  max_tokens: 1000,
  system: "[system prompt]",
  messages: [{
    role: "user",
    content: `
      Origin: ${origin}
      Destination: ${destination}
      Borough: ${borough}
      Route data: ${JSON.stringify(routeData)}
      All distances and times sourced from Google Maps API.
    `
  }]
}
AI Output Structure
json{
  "routes": {
    "ferry": { "carbon": 0, "cost": 0, "time": 0 },
    "car": { "carbon": 0, "cost": 0, "time": 0 },
    "carpool": { "carbon": 0, "cost": 0, "time": 0 },
    "bus": { "carbon": 0, "cost": 0, "time": 0 },
    "train": { "carbon": 0, "cost": 0, "time": 0 },
    "walk": { "carbon": 0, "cost": 0, "time": 0 }
  },
  "recommendation": "3-4 sentence plain English synthesis personalized to origin and destination",
  "bestCarbon": "route name",
  "bestCost": "route name",
  "bestTime": "route name"
}
Rules

Google Maps is the source of truth for all distance and time values
No hardcoded distances in routeCalculator.js — all come from mapsClient.js responses
All emissions constants live in constants.js only
Borough detection uses Google Maps geocoding response
Carpool always assumes 3 passengers
Walk route calculated seriously with real Google Maps distance, time, and calories
No form tags, use onClick handlers
No localStorage
Ferry waterway segment always uses fixed 33km and 25 mins — Google Maps cannot route by water

Data Still Needed From EA

~~Vessel fuel consumption per one-way trip (liters)~~ → 73 gal (276L), confirmed [EA Table 3.10-1]
~~Diesel CO2 factor used in EA calculations~~ → 10 kg CO2/gal, confirmed [EA] (EPA/EIA cite 10.18)
~~Official projected ridership per trip~~ → 74,500 annual / 739-1,606 daily weekday boardings [EA]

Official Quote For Display
"From the beginning of my Administration, we have invested in expanding environmentally friendly transportation infrastructure that provides commuters with more options and reduces traffic on our roads."
— Governor Phil Murphy, Groundbreaking Ceremony, December 12, 2025
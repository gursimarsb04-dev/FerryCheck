### ROUTE
*   **Waterway distance Carteret to Manhattan (km + nautical miles):** 22 km (12 nautical miles) based on nautical routing [1]. *(Note: The official Environmental Assessment models a 20-mile / 32.2 km one-way route [2]).*
*   **Driving distance to terminal (km):** ASSUMED: ~5 km avg [3, 4].
*   **Daily round trips at launch:** 3 to 4 daily round trips [5-8].
*   **Projected ridership (per trip, daily, or annual):** 
    *   Daily: 739 to 1,606 average weekday boardings in the Base Year [9]. 
    *   Annual: 74,500 riders (future year forecast) [10].

### VESSEL
*   **Passenger capacity:** 149 passengers [3, 10, 11].
*   **Fuel type:** Diesel (ultra-low sulfur diesel) [3, 12, 13].
*   **Fuel consumption per one-way trip (liters):** 188.8 liters (Scaled down from the EA's 32.2km modeled 276L to the actual 22km route) [1, 2].
*   **Number of vessels:** 2 vessels [8, 11, 14].

### EMISSIONS
*   **Total CO2 per one-way trip (grams):** 498,750 grams (Derived from 73 gallons scaled down to 22km actual route: 73 × (22/32.2) × 10 kg/gal) [1, 2]. 
*   **CO2 per liter of diesel used (grams):** 2,641.7 grams/liter (Derived from EA's metric of 10 kg/gal and 3.785 liters/gallon) [2].
*   **Car CO2 per km (grams):** 180 grams [3, 15].
*   **Bus CO2 per passenger-km (grams):** 27.2 grams [15].

### LAST MILE
*   **Parking spaces at terminal:** Approximately 700 spaces (also cited as 696 spaces) [5, 6, 16, 17].
*   **% of riders driving to terminal:** 84% to 95%. (73% Drove Alone, 11% Carpool, 11% Drop-off) [18-20].

### QUOTES
*   **Quote:** *"From the beginning of my Administration, we have invested in expanding environmentally friendly transportation infrastructure that provides commuters with more options and reduces traffic on our roads."*
    *   **Speaker:** Governor Phil Murphy
    *   **Date:** December 12, 2025
    *   **Source:** Borough of Carteret Press Release / Groundbreaking Event [1, 21-24].
*   **Quote:** *"To provide reliable and more environmentally-friendly transportation service to New York City"*
    *   **Speaker:** N/A (Listed as an official Project Goal)
    *   **Date:** September 25, 2024 (EA Finalization Date)
    *   **Source:** Carteret Ferry Terminal Environmental Assessment / Borough of Carteret News Releases [25-28].

### DERIVED CALCULATIONS
*(Note: These calculations utilize the corrected geographic route distance of 22 km [1] rather than the EA's generalized 32.2 km [2] baseline).*

**FERRY_BASE_EMISSIONS_G = fuel per trip scaled to 22km**
*   **498,750 grams** (or 498.7 kg)

**BREAKEVEN_PASSENGERS = FERRY_BASE_EMISSIONS_G ÷ (180 × route distance)**
*   498,750 ÷ (180 × 22 km) 
*   498,750 ÷ 3,960 = **125.9 => 126 passengers** 
*(Note: Because the vessel capacity is 149, the ferry CAN mathematically break even against a solo car if it operates at 85% capacity).*

**BUS_TOTAL = 27 × route distance**
*   27 × 22 km = **594 grams CO2 per passenger**

**BREAKEVEN_BUS = FERRY_BASE_EMISSIONS_G ÷ 594**
*   498,750 ÷ 594 = **840 passengers**
*(Note: To beat a bus, the vessel requires 840 pax per trip, which is physically impossible).*

**FERRY_AT_30PCT_WITH_LASTMILE = (FERRY_BASE_EMISSIONS_G ÷ 45) + (180 × 5)**
*   (498,750 ÷ 45) + (180 × 5)
*   11,083.3 + 900 = **11,983.3 grams CO2 per passenger**


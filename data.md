# FerryCheck — Data Reference & Edge Case Analysis

*Last updated: 2026-03-07. All values match `constants.js`.*

---

## ROUTE

| Parameter | Value | Source |
|-----------|-------|--------|
| Ferry waterway distance | **33 km** (~18 Nm) | Savvy Navvy marine navigation |
| EA modeled ferry distance | 32.2 km (20 mi) | EA Table 3.10-1 |
| Car driving distance (Carteret → Pier 11) | **41 km** (25.5 mi) | Google Maps via I-278 E (verified) |
| EA modeled car distance ("No Build") | 48.3 km (30 mi) | EA Table 3.10-1 |
| Drive to terminal (last mile) | 5 km (assumed avg) | EA |
| Daily round trips at launch | 3–4 | EA |

**Ferry route direction:** NORTH via Arthur Kill → Kill Van Kull → Upper New York Bay → Pier 11, Manhattan.
Confirmed by Wikipedia ("via Arthur Kill and Kill van Kull"), Patch.com ("from the north end of Carteret Waterfront Park"), and the 25-minute travel time (consistent with ~18 Nm at 25 knots, NOT a 45+ km southern route around Staten Island).

---

## VESSEL

| Parameter | Value | Source |
|-----------|-------|--------|
| Passenger capacity | **149** | EA, press releases, Federal Permitting Dashboard |
| Fuel type | Diesel (ULSD) | EA |
| Fuel per one-way trip | **73 gallons** (276 liters) | EA Table 3.10-1 |
| Number of vessels | 2 | EA |
| Vessel type | 149-pax diesel catamaran (~86 ft) | NY Waterway fleet specs |
| Service speed | ~25 knots | Standard for this vessel class |

---

## EMISSIONS

| Parameter | Value | Source |
|-----------|-------|--------|
| Ferry CO2 per one-way trip | **730,000g** (730 kg) | 73 gal × 10 kg CO2/gal (EA Table 3.10-1) |
| Car CO2 per km | **180 g/km** | DEFRA 2024 |
| Bus CO2 per passenger-km | **27.2 g/km** | DEFRA 2024 |
| NJ Transit Bus (full trip) | **1,115g** | 27.2 × 41 km (derived) |
| CO2 per gallon of diesel | ~10 kg/gal | EA assumption (EPA/EIA cite 10.18 kg/gal) |

---

## LAST MILE

| Parameter | Value | Source |
|-----------|-------|--------|
| Parking spaces | ~700 (696–700) | EA, press releases |
| % riders driving to terminal | **84–95%** | EA: 73% drove alone + 11% carpool + 11% drop-off |

---

## RIDERSHIP

| Parameter | Value | Source |
|-----------|-------|--------|
| Annual projected ridership | **74,500** | EA (future year forecast) |
| Daily weekday boardings (low) | 739 | EA (base year) |
| Daily weekday boardings (high) | 1,606 | EA (base year) |
| NYC Ferry Year-1 occupancy | Pending data | — |

---

## QUOTES

- **Governor Phil Murphy (Dec 12, 2025):** "From the beginning of my Administration, we have invested in expanding environmentally friendly transportation infrastructure that provides commuters with more options and reduces traffic on our roads."
- **EA Project Goal (Sep 25, 2024):** "To provide reliable and more environmentally-friendly transportation service to New York City"

---

## DERIVED CALCULATIONS

| Metric | Formula | Result |
|--------|---------|--------|
| Solo car CO2 (full trip) | 180 × 41 | **7,380g** |
| Carpool CO2 (per pax) | 7,380 / 2 | **3,690g** |
| Ferry @ 100% capacity | 730,000 / 149 | **4,899g** |
| Ferry breakeven vs car | 730,000 / 7,380 | **99 passengers (66.4%)** |
| Bus breakeven passengers | 730,000 / 1,115 | **655 passengers (impossible on 149 seats)** |
| Bus breakeven occupancy | 655 / 149 × 100 | **439% (physically impossible)** |

---

## EDGE CASES & DATA ACCURACY NOTES

### 1. Diesel CO2 Factor: 10 vs 10.18 kg/gal
The EA and our model use 10 kg CO2/gal. EPA/EIA cite **10.18 kg/gal** for diesel.
- At 10.18: 73 × 10.18 × 1000 = **743,140g** (vs 730,000g)
- This shifts breakeven from 99 to **101 passengers** (67.8%)
- Impact: **+1.8%** on ferry emissions. Our 730,000g figure is slightly conservative (favors ferry).

### 2. Car CO2: UK DEFRA (180 g/km) vs US EPA (~249 g/km)
DEFRA 2024 is a UK source. UK cars average ~170 g/km. US cars are larger; EPA says ~400 g/mile (~249 g/km).
- Using 180 (current): breakeven = 99 passengers
- Using 249 (US EPA): solo car = 10,209g → breakeven = **72 passengers (48.3%)**
- Impact: Using UK data makes the ferry look **worse** relative to cars. This is actually conservative for our argument (ferry needs MORE passengers to break even). If we used US EPA data, the ferry would look better.

### 3. Bus CO2: 27.2 g/pax-km needs verification
DEFRA average local bus (UK) is ~96 g/passenger-km. Our 27.2 g/km is marked "confirmed [DEFRA 2024]" but may be the wrong DEFRA category.
- At 27.2: bus trip = 1,115g → ferry needs 655 pax to match (impossible)
- At 96: bus trip = 3,936g → ferry needs 186 pax (still impossible on 149 seats)
- Impact: Either way, **ferry cannot beat a bus**. The exact figure doesn't change the conclusion.

### 4. Multi-Stop Routing
Rutgers Study: ferry stops at West 39th St before Pier 11 (50 min + 10 min unloading + 10 min to Pier 11 = 70 min total). Mid-route stops may increase fuel burn beyond 73 gal.

### 5. Deadhead (Empty Return) Trips
Analysis is per one-way trip. Peak commuting: ferries run full inbound AM, near-empty outbound AM. Over a full day, average occupancy per sailing is much lower than any single peak sailing.

### 6. Speed Zones & Currents
Kill Van Kull has strong tidal currents and speed restrictions. Against-tide fuel burn can increase 10-20%.

### 7. Cold-Start Fuel Overhead
73 gal figure is presumably steady-state. First trip of the day may use additional fuel for warm-up.

### 8. EA Car Distance Discrepancy
EA models car at 48.3 km (30 mi), but Google Maps shows 41 km (25.5 mi). Our model uses verified 41 km (conservative — shorter trip = less car CO2 = harder for ferry to beat). Using EA's 48.3 km: solo car = 8,694g → breakeven = **84 passengers (56.4%)**.

### 9. Manhattan Last-Mile Omission
Model includes last-mile driving TO Carteret terminal but NOT last-mile transit FROM Pier 11 to final Manhattan destination. This omission slightly favors the ferry.

### 10. Weather & Seasonal Variation
Rougher seas = more fuel. Winter crossings face stronger winds and waves. 73 gal likely represents average conditions.

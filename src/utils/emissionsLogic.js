import {
    VESSEL_CAPACITY,
    CAR_ROUTE_KM,
    FERRY_BASE_EMISSIONS_G,
    CAR_CO2_PER_KM,
    BUS_CO2_PER_KM,
    TRAIN_CO2_PER_KM,
    TERMINAL_DRIVE_KM,
    CARPOOL_PASSENGERS,
    FERRY_FARE,
    BUS_FARE,
    TRAIN_FARE,
    CAR_TOLLS_ROUND_TRIP,
    CAR_PARKING_PER_DAY,
    CAR_GAS_COST_PER_KM,
    FERRY_LAST_MILE_UBER,
} from '../constants';

// ─── FERRY ───────────────────────────────────────────────────────

export const calculateFerryCO2PerPax = (passengerCount) => {
    if (passengerCount === 0) return 0;
    return FERRY_BASE_EMISSIONS_G / passengerCount;
};

export const calculateAdjustedFerryCO2 = (passengerCount) => {
    if (passengerCount === 0) return 0;
    return calculateFerryCO2PerPax(passengerCount) + (CAR_CO2_PER_KM * TERMINAL_DRIVE_KM);
};

export const calculateFerryCost = (lastMileKm = 0) => {
    // Ferry fare + drive to terminal gas + optional last-mile Uber
    const terminalDriveCost = CAR_GAS_COST_PER_KM * TERMINAL_DRIVE_KM;
    const lastMileCost = lastMileKm > 0 ? FERRY_LAST_MILE_UBER : 0;
    return FERRY_FARE + terminalDriveCost + lastMileCost;
};

// ─── CAR ─────────────────────────────────────────────────────────

export const calculateSoloCarCO2 = () => {
    return CAR_CO2_PER_KM * CAR_ROUTE_KM;
};

export const calculateCarCost = (drivingDistanceKm = CAR_ROUTE_KM) => {
    return (CAR_GAS_COST_PER_KM * drivingDistanceKm) + CAR_TOLLS_ROUND_TRIP + CAR_PARKING_PER_DAY;
};

// ─── CARPOOL ─────────────────────────────────────────────────────

export const calculateCarpoolCO2 = () => {
    return calculateSoloCarCO2() / CARPOOL_PASSENGERS;
};

export const calculateCarpoolCost = (drivingDistanceKm = CAR_ROUTE_KM) => {
    return calculateCarCost(drivingDistanceKm) / CARPOOL_PASSENGERS;
};

// ─── BUS ─────────────────────────────────────────────────────────

export const calculateBusCO2 = (transitDistanceKm = CAR_ROUTE_KM) => {
    return BUS_CO2_PER_KM * transitDistanceKm;
};

export const calculateBusCost = () => {
    return BUS_FARE;
};

// ─── TRAIN ───────────────────────────────────────────────────────

export const calculateTrainCO2 = (transitDistanceKm = CAR_ROUTE_KM) => {
    return TRAIN_CO2_PER_KM * transitDistanceKm;
};

export const calculateTrainCost = () => {
    return TRAIN_FARE;
};

// ─── WALK ────────────────────────────────────────────────────────

export const calculateWalkCO2 = () => {
    return 0;
};

export const calculateWalkCost = () => {
    return 0;
};

// ─── BREAKEVEN ───────────────────────────────────────────────────

export const calculateBreakevenPassengers = () => {
    // 730,000 / (180 * 41) = 98.9 -> 99
    return Math.ceil(FERRY_BASE_EMISSIONS_G / calculateSoloCarCO2());
};

export const calculateBreakevenPercentage = () => {
    return (calculateBreakevenPassengers() / VESSEL_CAPACITY) * 100;
};

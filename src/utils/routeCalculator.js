import {
    FERRY_BASE_EMISSIONS_G,
    CAR_CO2_PER_KM,
    CARPOOL_PASSENGERS,
    BUS_CO2_PER_PAX_KM,
    TRAIN_CO2_PER_PAX_KM,
    WALK_CO2,
    FERRY_CAPACITY,
    FERRY_ASSUMED_OCCUPANCY,
    FERRY_TIME_WATER_MINS,
    FERRY_FARE,
    FERRY_LAST_MILE_UBER,
    CAR_TOLLS_ROUND_TRIP,
    CAR_PARKING_PER_DAY,
    CAR_GAS_COST_PER_KM,
    BUS_FARE,
    TRAIN_FARE,
    WALK_COST,
    WALK_CALORIES_PER_KM
} from '../constants';

// --- FERRY ---
export const calculateFerryCarbon = (terminalDriveKm, lastMileKm) => {
    const fixedFerryCO2 = FERRY_BASE_EMISSIONS_G / FERRY_ASSUMED_OCCUPANCY; // 730000 / 45 = 16,222g
    const terminalDriveCO2 = terminalDriveKm * CAR_CO2_PER_KM;
    const lastMileCO2 = lastMileKm * CAR_CO2_PER_KM; // assuming Uber/car last mile
    return fixedFerryCO2 + terminalDriveCO2 + lastMileCO2;
};

export const calculateFerryTime = (terminalDriveMins, lastMileMins) => {
    return terminalDriveMins + FERRY_TIME_WATER_MINS + lastMileMins;
};

export const calculateFerryCost = (lastMileKm) => {
    // Assuming Last Mile is an Uber if > 1km walk, else 0
    let lastMileCost = lastMileKm > 1 ? FERRY_LAST_MILE_UBER : 0;
    return FERRY_FARE + lastMileCost;
};

// --- CAR ---
export const calculateCarCarbon = (drivingDistanceKm) => drivingDistanceKm * CAR_CO2_PER_KM;
export const calculateCarTime = (drivingMins) => drivingMins;
export const calculateCarCost = (drivingDistanceKm) => {
    return (drivingDistanceKm * CAR_GAS_COST_PER_KM) + (CAR_TOLLS_ROUND_TRIP / 2) + CAR_PARKING_PER_DAY;
};

// --- CARPOOL ---
export const calculateCarpoolCarbon = (drivingDistanceKm) => calculateCarCarbon(drivingDistanceKm) / CARPOOL_PASSENGERS;
export const calculateCarpoolTime = (drivingMins) => drivingMins;
export const calculateCarpoolCost = (drivingDistanceKm) => calculateCarCost(drivingDistanceKm) / CARPOOL_PASSENGERS;

// --- BUS ---
export const calculateBusCarbon = (transitDistanceKm) => transitDistanceKm * BUS_CO2_PER_PAX_KM;
export const calculateBusTime = (transitMins) => transitMins;
export const calculateBusCost = () => BUS_FARE;

// --- TRAIN ---
export const calculateTrainCarbon = (transitDistanceKm) => transitDistanceKm * TRAIN_CO2_PER_PAX_KM;
export const calculateTrainTime = (transitMins) => transitMins;
export const calculateTrainCost = () => TRAIN_FARE;

// --- WALK ---
export const calculateWalkCarbon = () => WALK_CO2;
export const calculateWalkTime = (walkingMins) => walkingMins;
export const calculateWalkCost = () => WALK_COST;
export const calculateWalkCalories = (walkingKm) => walkingKm * WALK_CALORIES_PER_KM;

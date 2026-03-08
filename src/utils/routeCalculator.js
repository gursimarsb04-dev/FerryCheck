import {
    FERRY_BASE_EMISSIONS_G,
    CAR_CO2_PER_KM,
    CARPOOL_PASSENGERS,
    BUS_CO2_PER_PAX_KM,
    TRAIN_CO2_PER_PAX_KM,
    WALK_CO2,
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
    WALK_CALORIES_PER_KM,
    SUBWAY_FARE
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

export const calculateFerryCost = (terminalDriveKm, lastMileKm) => {
    const gasCost = terminalDriveKm * CAR_GAS_COST_PER_KM;
    const lastMileCost = lastMileKm > 1 ? FERRY_LAST_MILE_UBER : 0;
    return FERRY_FARE + gasCost + lastMileCost;
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

// --- BUS (Two-Leg: Bus 116 to Port Authority + NYC Subway/Bus to destination) ---
export const calculateBusCarbon = (busDistanceKm) => busDistanceKm * BUS_CO2_PER_PAX_KM;
// subway is electric, ~0 CO2 — so we only count the NJ Transit bus leg
export const calculateBusTime = (busMins, subwayMins) => busMins + subwayMins;
export const calculateBusCost = () => BUS_FARE + SUBWAY_FARE; // $6.50 NJ Transit Bus 116 + $2.90 NYC subway transfer

// --- TRAIN (Two-Leg: Drive to Rahway + NJ Transit to Penn + Subway) ---
export const calculateTrainCarbon = (driveToStationKm, trainRideKm) => {
    const driveCO2 = driveToStationKm * CAR_CO2_PER_KM;       // driving to Rahway
    const trainCO2 = trainRideKm * TRAIN_CO2_PER_PAX_KM;      // NJ Transit rail
    return driveCO2 + trainCO2;
};

export const calculateTrainTime = (driveToStationMins, trainRideMins) => {
    return driveToStationMins + trainRideMins;
};

export const calculateTrainCost = (driveToStationKm) => {
    const gasCost = driveToStationKm * CAR_GAS_COST_PER_KM;
    return gasCost + TRAIN_FARE + SUBWAY_FARE; // gas + $9 NJ Transit + $2.90 subway
};

// --- WALK ---
export const calculateWalkCarbon = () => WALK_CO2;
export const calculateWalkTime = (walkingMins) => walkingMins;
export const calculateWalkCost = () => WALK_COST;
export const calculateWalkCalories = (walkingKm) => walkingKm * WALK_CALORIES_PER_KM;

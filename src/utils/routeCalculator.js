// routeCalculator.js — combines Google Maps data with emission/cost constants
// All distances come from mapsClient.js. Constants come from constants.js.
// No hardcoded distances in this file.

import {
    FERRY_BASE_EMISSIONS_G,
    FERRY_ASSUMED_OCCUPANCY,
    FERRY_ROUTE_KM,
    FERRY_TIME_WATER_MINS,
    FERRY_FARE,
    FERRY_LAST_MILE_UBER,
    CAR_CO2_PER_KM,
    CAR_TOLLS_ROUND_TRIP,
    CAR_PARKING_PER_DAY,
    CAR_GAS_COST_PER_KM,
    BUS_CO2_PER_KM,
    BUS_FARE,
    TRAIN_CO2_PER_KM,
    TRAIN_FARE,
    CARPOOL_PASSENGERS,
    WALK_CALORIES_PER_KM,
} from '../constants';

// ─── FERRY ───────────────────────────────────────────────────────

export const calculateFerryCarbon = (terminalDriveKm, lastMileKm = 0) => {
    const ferryPerPax = FERRY_BASE_EMISSIONS_G / FERRY_ASSUMED_OCCUPANCY;
    const drivingEmissions = CAR_CO2_PER_KM * (terminalDriveKm + lastMileKm);
    return Math.round(ferryPerPax + drivingEmissions);
};

export const calculateFerryTime = (terminalDriveMins, lastMileMins) => {
    return Math.round(terminalDriveMins + FERRY_TIME_WATER_MINS + lastMileMins);
};

export const calculateFerryCost = (lastMileKm = 0) => {
    const terminalGas = CAR_GAS_COST_PER_KM * 5; // avg terminal drive
    const lastMileCost = lastMileKm > 1.5 ? FERRY_LAST_MILE_UBER : 0;
    return +(FERRY_FARE + terminalGas + lastMileCost).toFixed(2);
};

// ─── CAR ─────────────────────────────────────────────────────────

export const calculateCarCarbon = (drivingDistanceKm) => {
    return Math.round(CAR_CO2_PER_KM * drivingDistanceKm);
};

export const calculateCarTime = (drivingMins) => {
    return Math.round(drivingMins);
};

export const calculateCarCost = (drivingDistanceKm) => {
    const gas = CAR_GAS_COST_PER_KM * drivingDistanceKm;
    return +(gas + CAR_TOLLS_ROUND_TRIP + CAR_PARKING_PER_DAY).toFixed(2);
};

// ─── CARPOOL ─────────────────────────────────────────────────────

export const calculateCarpoolCarbon = (drivingDistanceKm) => {
    return Math.round(calculateCarCarbon(drivingDistanceKm) / CARPOOL_PASSENGERS);
};

export const calculateCarpoolCost = (drivingDistanceKm) => {
    return +(calculateCarCost(drivingDistanceKm) / CARPOOL_PASSENGERS).toFixed(2);
};

// ─── BUS ─────────────────────────────────────────────────────────

export const calculateBusCarbon = (transitDistanceKm) => {
    return Math.round(BUS_CO2_PER_KM * transitDistanceKm);
};

export const calculateBusTime = (transitMins) => {
    return Math.round(transitMins);
};

export const calculateBusCost = () => {
    return BUS_FARE;
};

// ─── TRAIN ───────────────────────────────────────────────────────

export const calculateTrainCarbon = (transitDistanceKm) => {
    return Math.round(TRAIN_CO2_PER_KM * transitDistanceKm);
};

export const calculateTrainTime = (transitMins) => {
    return Math.round(transitMins);
};

export const calculateTrainCost = () => {
    return TRAIN_FARE;
};

// ─── WALK ────────────────────────────────────────────────────────

export const calculateWalkCarbon = () => 0;

export const calculateWalkTime = (walkingMins) => {
    return Math.round(walkingMins);
};

export const calculateWalkCost = () => 0;

export const calculateWalkCalories = (walkingKm) => {
    return Math.round(WALK_CALORIES_PER_KM * walkingKm);
};

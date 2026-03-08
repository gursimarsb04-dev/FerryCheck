import {
    VESSEL_CAPACITY,
    ROUTE_DISTANCE_KM,
    FERRY_BASE_EMISSIONS_G,
    CAR_CO2_PER_KM,
    BUS_CO2_PER_KM,
    TERMINAL_DRIVE_KM,
} from '../constants';

export const calculateFerryCO2PerPax = (passengerCount) => {
    if (passengerCount === 0) return 0; // Avoid division by zero
    return FERRY_BASE_EMISSIONS_G / passengerCount;
};

export const calculateSoloCarCO2 = () => {
    return CAR_CO2_PER_KM * ROUTE_DISTANCE_KM;
};

export const calculateCarpoolCO2 = () => {
    return calculateSoloCarCO2() / 2;
};

export const calculateBusCO2 = () => {
    return BUS_CO2_PER_KM * ROUTE_DISTANCE_KM;
};

export const calculateAdjustedFerryCO2 = (passengerCount) => {
    if (passengerCount === 0) return 0;
    // FERRY_BASE_EMISSIONS_G / pax + (180 * 5)
    return calculateFerryCO2PerPax(passengerCount) + (CAR_CO2_PER_KM * TERMINAL_DRIVE_KM);
};

export const calculateBreakevenPassengers = () => {
    // 498,750 / (180 * 22) = 125.9 -> 126
    return Math.ceil(FERRY_BASE_EMISSIONS_G / calculateSoloCarCO2());
};

export const calculateBreakevenPercentage = () => {
    return (calculateBreakevenPassengers() / VESSEL_CAPACITY) * 100;
};

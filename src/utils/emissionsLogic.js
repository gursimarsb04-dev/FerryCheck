import {
    VESSEL_CAPACITY,
    CAR_ROUTE_KM,
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
    return CAR_CO2_PER_KM * CAR_ROUTE_KM;
};

export const calculateCarpoolCO2 = () => {
    return calculateSoloCarCO2() / 2;
};

export const calculateBusCO2 = () => {
    return BUS_CO2_PER_KM * CAR_ROUTE_KM;
};

export const calculateAdjustedFerryCO2 = (passengerCount) => {
    if (passengerCount === 0) return 0;
    return calculateFerryCO2PerPax(passengerCount) + (CAR_CO2_PER_KM * TERMINAL_DRIVE_KM);
};

export const calculateBreakevenPassengers = () => {
    // 730,000 / (180 * 41) = 98.9 -> 99
    return Math.ceil(FERRY_BASE_EMISSIONS_G / calculateSoloCarCO2());
};

export const calculateBreakevenPercentage = () => {
    return (calculateBreakevenPassengers() / VESSEL_CAPACITY) * 100;
};

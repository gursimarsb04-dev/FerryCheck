// mapsClient.js — all Google Maps API calls
// Google Maps is the source of truth for distance and time calculations.
// Requires VITE_GOOGLE_MAPS_API_KEY in .env

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

/**
 * Driving route (car + carpool)
 * @param {string} origin - origin address
 * @param {string} destination - destination address
 * @returns {Promise<{distance_km: number, duration_mins: number}>}
 */
export const getDrivingRoute = async (origin, destination) => {
    // TODO: integrate Google Maps Directions API, mode: driving
    // Return: { distance_km, duration_mins }
    throw new Error('Not implemented — requires Google Maps API key');
};

/**
 * Transit route (bus + train)
 * @param {string} origin
 * @param {string} destination
 * @returns {Promise<{duration_mins: number, steps: Array}>}
 */
export const getTransitRoute = async (origin, destination) => {
    // TODO: integrate Google Maps Directions API, mode: transit
    // Return: { duration_mins, steps }
    throw new Error('Not implemented — requires Google Maps API key');
};

/**
 * Walking route
 * @param {string} origin
 * @param {string} destination
 * @returns {Promise<{distance_km: number, duration_mins: number}>}
 */
export const getWalkingRoute = async (origin, destination) => {
    // TODO: integrate Google Maps Directions API, mode: walking
    // Return: { distance_km, duration_mins }
    throw new Error('Not implemented — requires Google Maps API key');
};

/**
 * Ferry leg 1: origin to Carteret terminal
 * @param {string} origin
 * @returns {Promise<{distance_km: number, duration_mins: number}>}
 */
export const getFerryDriveToTerminal = async (origin) => {
    // TODO: Google Maps driving directions from origin to TERMINAL_ADDRESS
    // Return: { distance_km, duration_mins }
    throw new Error('Not implemented — requires Google Maps API key');
};

/**
 * Ferry leg 3: Manhattan terminal (Pier 11) to final destination
 * @param {string} destination
 * @returns {Promise<{distance_km: number, duration_mins: number, recommended_mode: 'walk'|'uber'}>}
 */
export const getFerryLastMile = async (destination) => {
    // TODO: Google Maps walking directions from Pier 11 to destination
    // If walking > 20 mins, recommend Uber and use driving distance
    // Return: { distance_km, duration_mins, recommended_mode }
    throw new Error('Not implemented — requires Google Maps API key');
};

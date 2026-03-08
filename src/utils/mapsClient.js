import { TERMINAL_ADDRESS, FERRY_ROUTE_KM, CAR_ROUTE_KM } from '../constants';

// ─── Core Directions Wrappers ─────────────────────────────────────
// Each function wraps the Google Maps DirectionsService and includes
// a .catch() fallback so that Promise.all in App.jsx never rejects.

export const getDrivingRoute = async (origin, destination) => {
    if (!window.google) throw new Error("Google Maps API not loaded");
    const directionsService = new window.google.maps.DirectionsService();
    return new Promise((resolve, reject) => {
        directionsService.route(
            { origin, destination, travelMode: window.google.maps.TravelMode.DRIVING },
            (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    const route = result.routes[0].legs[0];
                    resolve({
                        distance_km: route.distance.value / 1000,
                        duration_mins: Math.round(route.duration.value / 60)
                    });
                } else {
                    reject(new Error(`DRIVING API failed: ${status}`));
                }
            }
        );
    });
};

export const getTransitRoute = async (origin, destination) => {
    if (!window.google) throw new Error("Google Maps API not loaded");
    const directionsService = new window.google.maps.DirectionsService();
    return new Promise((resolve, reject) => {
        directionsService.route(
            { origin, destination, travelMode: window.google.maps.TravelMode.TRANSIT },
            (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    const route = result.routes[0].legs[0];
                    resolve({
                        distance_km: route.distance.value / 1000,
                        duration_mins: Math.round(route.duration.value / 60),
                        steps: route.steps
                    });
                } else {
                    reject(new Error(`TRANSIT API failed: ${status}`));
                }
            }
        );
    });
};

export const getWalkingRoute = async (origin, destination) => {
    if (!window.google) throw new Error("Google Maps API not loaded");
    const directionsService = new window.google.maps.DirectionsService();
    return new Promise((resolve, reject) => {
        directionsService.route(
            { origin, destination, travelMode: window.google.maps.TravelMode.WALKING },
            (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    const route = result.routes[0].legs[0];
                    resolve({
                        distance_km: route.distance.value / 1000,
                        duration_mins: Math.round(route.duration.value / 60)
                    });
                } else {
                    reject(new Error(`WALKING API failed: ${status}`));
                }
            }
        );
    });
};

// ─── Safe Wrappers with Fallbacks ─────────────────────────────────
// These ensure the app always works, even if the Directions API is
// not enabled or quota is exceeded. Fallback values use verified
// constants from the EA and Google Maps manual lookups.

export const getSafeDrivingRoute = async (origin, destination) => {
    return getDrivingRoute(origin, destination).catch((err) => {
        console.warn("Driving route fallback used:", err.message);
        return { distance_km: CAR_ROUTE_KM, duration_mins: 55 }; // 41 km, ~55 min Carteret→Manhattan
    });
};

export const getSafeTransitRoute = async (origin, destination) => {
    return getTransitRoute(origin, destination).catch((err) => {
        console.warn("Transit route fallback used:", err.message);
        return { distance_km: CAR_ROUTE_KM, duration_mins: 90, steps: [] }; // ~90 min NJ Transit estimate
    });
};

export const getSafeWalkingRoute = async (origin, destination) => {
    return getWalkingRoute(origin, destination).catch((err) => {
        console.warn("Walking route fallback used:", err.message);
        return { distance_km: CAR_ROUTE_KM, duration_mins: 540 }; // ~9 hours walking
    });
};

// ─── Ferry-Specific Legs ──────────────────────────────────────────

export const getFerryDriveToTerminal = async (origin) => {
    // If origin IS the terminal (hardcoded default), no drive needed
    if (origin === TERMINAL_ADDRESS) {
        return { distance_km: 0, duration_mins: 0 };
    }
    return getDrivingRoute(origin, TERMINAL_ADDRESS).catch(() => {
        return { distance_km: 5.2, duration_mins: 12 }; // Fallback: avg Carteret resident
    });
};

export const getFerryLastMile = async (destination) => {
    const PIER_11_ADDRESS = "Pier 11 / Wall St, New York, NY 10005";
    return getDrivingRoute(PIER_11_ADDRESS, destination).catch(() => {
        return { distance_km: 2.1, duration_mins: 18, recommended_mode: 'uber' }; // Fallback
    });
};

// ─── Borough Detection ────────────────────────────────────────────
export const getBoroughFromAddress = async (destination) => {
    const d = destination.toLowerCase();
    if (d.includes('brooklyn')) return 'brooklyn';
    if (d.includes('queens')) return 'queens';
    if (d.includes('staten')) return 'staten_island';
    if (d.includes('bronx')) return 'bronx';
    return 'manhattan';
};

import { TERMINAL_ADDRESS, FERRY_ROUTE_KM, CAR_ROUTE_KM, RAHWAY_STATION_ADDRESS, PORT_AUTHORITY_ADDRESS } from '../constants';

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

// ─── Filtered Transit (specify preferred modes) ──────────────────
// modes: array of google.maps.TransitMode values, e.g. [BUS], [TRAIN, SUBWAY]
// Google treats these as PREFERENCES — falls back to other modes if needed.
export const getFilteredTransitRoute = async (origin, destination, modes) => {
    if (!window.google) throw new Error("Google Maps API not loaded");
    const directionsService = new window.google.maps.DirectionsService();
    return new Promise((resolve, reject) => {
        directionsService.route(
            {
                origin,
                destination,
                travelMode: window.google.maps.TravelMode.TRANSIT,
                transitOptions: { modes }
            },
            (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    const route = result.routes[0].legs[0];
                    resolve({
                        distance_km: route.distance.value / 1000,
                        duration_mins: Math.round(route.duration.value / 60),
                        steps: route.steps
                    });
                } else {
                    reject(new Error(`FILTERED TRANSIT API failed (modes: ${modes}): ${status}`));
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
        return { distance_km: CAR_ROUTE_KM, duration_mins: 55 };
    });
};

export const getSafeTransitRoute = async (origin, destination) => {
    return getTransitRoute(origin, destination).catch((err) => {
        console.warn("Transit route fallback used:", err.message);
        return { distance_km: CAR_ROUTE_KM, duration_mins: 90, steps: [] };
    });
};

export const getSafeWalkingRoute = async (origin, destination) => {
    return getWalkingRoute(origin, destination).catch((err) => {
        console.warn("Walking route fallback used:", err.message);
        return { distance_km: CAR_ROUTE_KM, duration_mins: 540 };
    });
};

// ─── Bus 116 Route: Two-Leg (Bus to Port Authority + NYC Transit) ─
// NJ Transit Bus 116 runs direct from Carteret to Port Authority.
// We filter Google Transit to BUS mode so it picks Bus 116 (not train/subway).
// Then NYC transit (subway/bus) from Port Authority to the destination.
export const getSafeBusRoute = async (origin, destination) => {
    try {
        // Leg 1: Bus 116 from Carteret to Port Authority — filter to BUS mode
        const busLeg = await getFilteredTransitRoute(
            origin,
            PORT_AUTHORITY_ADDRESS,
            [window.google.maps.TransitMode.BUS]
        ).catch(() => ({
            distance_km: 35, duration_mins: 65, steps: []
        }));

        // Leg 2: NYC transit (subway/bus) from Port Authority to destination
        const subwayLeg = await getTransitRoute(
            PORT_AUTHORITY_ADDRESS,
            destination
        ).catch(() => ({
            distance_km: 5, duration_mins: 15, steps: []
        }));

        return { busLeg, subwayLeg };
    } catch (err) {
        console.warn("Bus 116 route fallback used:", err.message);
        return {
            busLeg: { distance_km: 35, duration_mins: 65, steps: [] },
            subwayLeg: { distance_km: 5, duration_mins: 15, steps: [] }
        };
    }
};

// ─── Train Route: Two-Leg (Drive to Rahway + NJ Transit Train) ───
// Drive to Rahway station, NJ Transit to Penn Station, subway to destination.
// We filter leg 2 to TRAIN + SUBWAY modes to prioritize rail over bus.
export const getSafeTrainRoute = async (origin, destination) => {
    try {
        const [driveLeg, transitLeg] = await Promise.all([
            getDrivingRoute(origin, RAHWAY_STATION_ADDRESS),
            getFilteredTransitRoute(
                RAHWAY_STATION_ADDRESS,
                destination,
                [window.google.maps.TransitMode.TRAIN, window.google.maps.TransitMode.SUBWAY]
            )
        ]);
        return {
            driveToStation: driveLeg,
            trainToDestination: transitLeg
        };
    } catch (err) {
        console.warn("Train route fallback used:", err.message);
        return {
            driveToStation: { distance_km: 11, duration_mins: 15 },
            trainToDestination: { distance_km: 30, duration_mins: 55, steps: [] }
        };
    }
};

// ─── Ferry-Specific Legs ──────────────────────────────────────────

export const getFerryDriveToTerminal = async (origin) => {
    if (origin === TERMINAL_ADDRESS) {
        return { distance_km: 0, duration_mins: 0 };
    }
    return getDrivingRoute(origin, TERMINAL_ADDRESS).catch(() => {
        return { distance_km: 5.2, duration_mins: 12 };
    });
};

export const getFerryLastMile = async (destination) => {
    const PIER_11_ADDRESS = "Pier 11 / Wall St, New York, NY 10005";
    return getDrivingRoute(PIER_11_ADDRESS, destination).catch(() => {
        return { distance_km: 2.1, duration_mins: 18, recommended_mode: 'uber' };
    });
};

// ─── NYC Validation ───────────────────────────────────────────────
// Geocodes an address and checks if it falls within the 5 NYC boroughs bounding box.
// FAILS OPEN: if the geocoder errors out (API not enabled, quota exceeded, etc.),
// we allow the search to proceed since autocomplete already restricts to NYC bounds.
export const isWithinNYC = async (address) => {
    const NYC_BOUNDS = { south: 40.49, west: -74.26, north: 40.92, east: -73.68 };

    if (!window.google) return true; // fail open if API not loaded

    return new Promise((resolve) => {
        try {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address }, (results, status) => {
                if (status !== 'OK' || !results[0]) {
                    console.warn('Geocoder failed, allowing search to proceed:', status);
                    resolve(true); // FAIL OPEN — autocomplete already restricts to NYC
                    return;
                }
                const loc = results[0].geometry.location;
                const lat = loc.lat();
                const lng = loc.lng();
                const inBounds = lat >= NYC_BOUNDS.south && lat <= NYC_BOUNDS.north
                              && lng >= NYC_BOUNDS.west  && lng <= NYC_BOUNDS.east;
                resolve(inBounds);
            });
        } catch (err) {
            console.warn('Geocoder exception, allowing search:', err);
            resolve(true); // FAIL OPEN
        }
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

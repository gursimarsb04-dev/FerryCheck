import React, { useState, useEffect } from 'react';
import DashboardSidebar from './components/DashboardSidebar';
import MapCanvas from './components/MapCanvas';
import DataAuditModal from './components/DataAuditModal';
import { useJsApiLoader } from '@react-google-maps/api';
import { TERMINAL_ADDRESS } from './constants';

const libraries = ['places'];

// Import our new utility layers
import { getSafeDrivingRoute, getSafeWalkingRoute, getSafeTrainRoute, getSafeBusRoute, getFerryDriveToTerminal, getFerryLastMile, isWithinNYC } from './utils/mapsClient';
import {
    calculateFerryCarbon, calculateFerryTime, calculateFerryCost,
    calculateCarCarbon, calculateCarTime, calculateCarCost,
    calculateCarpoolCarbon, calculateCarpoolTime, calculateCarpoolCost,
    calculateBusCarbon, calculateBusTime, calculateBusCost,
    calculateTrainCarbon, calculateTrainTime, calculateTrainCost,
    calculateWalkCarbon, calculateWalkTime, calculateWalkCost
} from './utils/routeCalculator';
import { generateRecommendation } from './utils/claudeClient';
import { FERRY_BASE_EMISSIONS_G } from './constants';

function App() {
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
        libraries,
    });

    const [origin, setOrigin] = useState(TERMINAL_ADDRESS);
    const [destination, setDestination] = useState('');
    const [activeSort, setActiveSort] = useState('best');
    const [isLoading, setIsLoading] = useState(false);

    // Dynamic State
    const [routesData, setRoutesData] = useState([]);
    const [aiRecommendation, setAiRecommendation] = useState("");

    // Dashboard Specific State
    const [selectedRouteId, setSelectedRouteId] = useState(null);
    const [passengerCount, setPassengerCount] = useState(45); // 30% default
    const [directionsResponse, setDirectionsResponse] = useState(null);

    // Re-fetch directions visual when a route is selected
    useEffect(() => {
        if (!isLoaded || !origin || !destination || !selectedRouteId) return;

        const directionsService = new window.google.maps.DirectionsService();

        let travelMode = window.google.maps.TravelMode.DRIVING;
        if (selectedRouteId === 'bus' || selectedRouteId === 'train') {
            travelMode = window.google.maps.TravelMode.TRANSIT;
        } else if (selectedRouteId === 'walk') {
            travelMode = window.google.maps.TravelMode.WALKING;
        }

        directionsService.route(
            { origin, destination, travelMode },
            (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    setDirectionsResponse(result);
                } else {
                    console.error('Directions request failed due to ' + status);
                    setDirectionsResponse(null);
                }
            }
        );
    }, [selectedRouteId, origin, destination, isLoaded]);

    const handleSearch = async () => {
        if (!destination) return;
        setIsLoading(true);
        setAiRecommendation('');

        try {
            // 0. Validate destination is within NYC
            const inNYC = await isWithinNYC(destination);
            if (!inNYC) {
                setAiRecommendation('Destination must be within the 5 NYC boroughs (Manhattan, Brooklyn, Queens, Bronx, Staten Island).');
                setIsLoading(false);
                return;
            }

            // 1. Fetch all Google Maps route legs in parallel
            const [
                carRoute,
                busRoute,
                walkRoute,
                ferryDriveLeg,
                ferryLastMileLeg,
                trainRoute
            ] = await Promise.all([
                getSafeDrivingRoute(origin, destination),
                getSafeBusRoute(origin, destination),
                getSafeWalkingRoute(origin, destination),
                getFerryDriveToTerminal(origin),
                getFerryLastMile(destination),
                getSafeTrainRoute(origin, destination)
            ]);

            // 2. Crunch the numbers through the Route Calculator
            const processedRoutes = [
                {
                    id: 'ferry',
                    title: 'Ferry + Last Mile',
                    carbonGrams: calculateFerryCarbon(ferryDriveLeg.distance_km, ferryLastMileLeg.distance_km),
                    timeMins: calculateFerryTime(ferryDriveLeg.duration_mins, ferryLastMileLeg.duration_mins),
                    costDollars: calculateFerryCost(ferryDriveLeg.distance_km, ferryLastMileLeg.distance_km)
                },
                {
                    id: 'car',
                    title: 'Car (Drive Tunnel)',
                    carbonGrams: calculateCarCarbon(carRoute.distance_km),
                    timeMins: calculateCarTime(carRoute.duration_mins),
                    costDollars: calculateCarCost(carRoute.distance_km)
                },
                {
                    id: 'carpool',
                    title: 'Carpool (3 Pax)',
                    carbonGrams: calculateCarpoolCarbon(carRoute.distance_km),
                    timeMins: calculateCarpoolTime(carRoute.duration_mins),
                    costDollars: calculateCarpoolCost(carRoute.distance_km)
                },
                {
                    id: 'bus',
                    title: 'Bus 116 + Subway',
                    carbonGrams: calculateBusCarbon(busRoute.busLeg.distance_km),
                    timeMins: calculateBusTime(busRoute.busLeg.duration_mins, busRoute.subwayLeg.duration_mins),
                    costDollars: calculateBusCost()
                },
                {
                    id: 'train',
                    title: 'Drive to Train + Subway',
                    carbonGrams: calculateTrainCarbon(
                        trainRoute.driveToStation.distance_km,
                        trainRoute.trainToDestination.distance_km
                    ),
                    timeMins: calculateTrainTime(
                        trainRoute.driveToStation.duration_mins,
                        trainRoute.trainToDestination.duration_mins
                    ),
                    costDollars: calculateTrainCost(trainRoute.driveToStation.distance_km)
                },
                {
                    id: 'walk',
                    title: 'Walk to New York',
                    carbonGrams: calculateWalkCarbon(),
                    timeMins: calculateWalkTime(walkRoute.duration_mins),
                    costDollars: calculateWalkCost()
                }
            ];

            // 3. Request AI Synthesis
            const aiData = await generateRecommendation(origin, destination, processedRoutes);

            // 4. Update UI State
            setRoutesData(processedRoutes);
            setAiRecommendation(aiData.recommendation);
            setSelectedRouteId('ferry');

        } catch (error) {
            console.error("Error optimizing route:", error);
            setAiRecommendation("An error occurred while calculating the routes. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (loadError) {
        return <div className="min-h-screen flex items-center justify-center text-red-500 font-bold bg-slate-900">Error loading Google Maps API</div>;
    }

    if (!isLoaded) {
        return <div className="min-h-screen flex items-center justify-center text-teal-500 font-bold bg-slate-900">Loading Google Maps...</div>;
    }

    return (
        <div className="h-screen w-full flex overflow-hidden font-sans bg-slate-950 text-slate-300">
            {/* Split Pane Left: Sidebar */}
            <DashboardSidebar
                origin={origin} setOrigin={setOrigin}
                destination={destination} setDestination={setDestination}
                onSearch={handleSearch}
                routes={routesData}
                activeSort={activeSort} setActiveSort={setActiveSort}
                selectedRouteId={selectedRouteId} setSelectedRouteId={setSelectedRouteId}
                isLoading={isLoading}
                aiRecommendation={aiRecommendation}
            />

            {/* Split Pane Right: Map Canvas */}
            <div className="flex-1 relative bg-slate-900 border-l border-slate-800">
                <MapCanvas directionsResponse={directionsResponse} />

                {/* Conditional Data Overlay when Ferry is selected */}
                {selectedRouteId === 'ferry' && (
                    <DataAuditModal
                        passengerCount={passengerCount}
                        setPassengerCount={setPassengerCount}
                        baseFerryCarbon={FERRY_BASE_EMISSIONS_G}
                        carBaselineCarbon={routesData.find(r => r.id === 'car')?.carbonGrams || 7200}
                        busBaselineCarbon={routesData.find(r => r.id === 'bus')?.carbonGrams || 1100}
                        onClose={() => setSelectedRouteId(null)}
                    />
                )}
            </div>
        </div>
    );
}

export default App;

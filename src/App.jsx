import React, { useState } from 'react';
import InputPanel from './components/InputPanel';
import SortToggle from './components/SortToggle';
import RouteGrid from './components/RouteGrid';
import RecommendationPanel from './components/RecommendationPanel';
import { useJsApiLoader } from '@react-google-maps/api';
import { TERMINAL_ADDRESS } from './constants';

const libraries = ['places'];

// Import our new utility layers
import { getDrivingRoute, getTransitRoute, getWalkingRoute, getFerryDriveToTerminal, getFerryLastMile } from './utils/mapsClient';
import {
    calculateFerryCarbon, calculateFerryTime, calculateFerryCost,
    calculateCarCarbon, calculateCarTime, calculateCarCost,
    calculateCarpoolCarbon, calculateCarpoolTime, calculateCarpoolCost,
    calculateBusCarbon, calculateBusTime, calculateBusCost,
    calculateTrainCarbon, calculateTrainTime, calculateTrainCost,
    calculateWalkCarbon, calculateWalkTime, calculateWalkCost
} from './utils/routeCalculator';
import { generateRecommendation } from './utils/claudeClient';

function App() {
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
        libraries,
    });

    // Origin is always Carteret Waterfront — hardcoded per project spec
    const origin = TERMINAL_ADDRESS;
    const [destination, setDestination] = useState('');
    const [activeSort, setActiveSort] = useState('best');
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    // Dynamic State
    const [routesData, setRoutesData] = useState([]);
    const [aiRecommendation, setAiRecommendation] = useState("");

    const handleSearch = async () => {
        if (!destination) return;
        setIsLoading(true);
        setHasSearched(true);

        try {
            // 1. Fetch all Google Maps route legs in parallel
            const [
                carRoute,
                transitRoute,
                walkRoute,
                ferryDriveLeg,
                ferryLastMileLeg
            ] = await Promise.all([
                getDrivingRoute(origin, destination),
                getTransitRoute(origin, destination),
                getWalkingRoute(origin, destination),
                getFerryDriveToTerminal(origin),
                getFerryLastMile(destination)
            ]);

            // 2. Crunch the numbers through the Route Calculator
            const processedRoutes = [
                {
                    id: 'ferry',
                    title: 'Ferry + Last Mile',
                    carbonGrams: calculateFerryCarbon(ferryDriveLeg.distance_km, ferryLastMileLeg.distance_km),
                    timeMins: calculateFerryTime(ferryDriveLeg.duration_mins, ferryLastMileLeg.duration_mins),
                    costDollars: calculateFerryCost(ferryLastMileLeg.distance_km)
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
                    title: 'NJ Transit Bus',
                    carbonGrams: calculateBusCarbon(transitRoute.distance_km),
                    timeMins: calculateBusTime(transitRoute.duration_mins),
                    costDollars: calculateBusCost()
                },
                {
                    id: 'train',
                    title: 'Drive to Train + Subway',
                    carbonGrams: calculateTrainCarbon(transitRoute.distance_km),
                    timeMins: calculateTrainTime(transitRoute.duration_mins),
                    costDollars: calculateTrainCost()
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
        <div className="min-h-screen flex flex-col w-full overflow-x-hidden font-sans bg-slate-50 text-slate-900">
            {/* Header / Input Area */}
            <InputPanel
                origin={origin}
                destination={destination}
                setDestination={setDestination}
                onSearch={handleSearch}
            />

            {/* Results Area */}
            {hasSearched && (
                <main className="w-full max-w-7xl mx-auto py-12 px-4 md:px-8 flex-1 flex flex-col items-center">
                    <RecommendationPanel
                        isLoading={isLoading}
                        recommendationText={aiRecommendation}
                    />

                    {!isLoading && routesData.length > 0 && (
                        <div className="w-full flex flex-col items-center animate-[fadeIn_0.5s_ease-out]">
                            <SortToggle activeSort={activeSort} onSortChange={setActiveSort} />
                            <RouteGrid routes={routesData} activeSort={activeSort} />
                        </div>
                    )}
                </main>
            )}

            {/* Empty State Instructions (Before Search) */}
            {!hasSearched && (
                <main className="w-full max-w-3xl mx-auto py-24 px-4 md:px-8 flex-1 flex flex-col items-center justify-center text-center opacity-50">
                    <span className="text-6xl mb-6">📍</span>
                    <h2 className="text-2xl font-bold text-slate-400 mb-2">Ready to plan your commute?</h2>
                    <p className="text-slate-500 font-medium">Enter a destination in NYC to compare real-time travel options from Carteret Waterfront.</p>
                </main>
            )}

            {/* Footer */}
            <footer className="w-full bg-slate-900 text-slate-400 py-12 px-4 md:px-8 border-t-8 border-slate-950 mt-auto">
                <div className="max-w-4xl mx-auto text-center text-sm leading-relaxed font-medium">
                    <p className="mb-4">
                        Carteret Commute Optimizer analyzes real-time distances from Google Maps against established emissions factors and fares.
                        It assumes 30% ferry occupancy and a 5km drive to the terminal based on the Environmental Assessment.
                    </p>
                    <p className="opacity-60 font-bold uppercase tracking-widest text-xs">
                        &copy; {new Date().getFullYear()} Carteret Commute Tool
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default App;

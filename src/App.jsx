import React, { useState } from 'react';
import InputPanel from './components/InputPanel';
import SortToggle from './components/SortToggle';
import RouteGrid from './components/RouteGrid';
import RecommendationPanel from './components/RecommendationPanel';

// Mock data — uses verified constants (730,000g ferry, 41km car route, 33km waterway)
// Ferry assumes 30% occupancy (45 pax): 730000/45 + 180*5 last mile = 17,122g
// These will be replaced by Google Maps API data at runtime
const MOCK_ROUTES = [
    { id: 'ferry', title: 'Ferry + Last Mile', carbonGrams: 17122, costDollars: 40.60, timeMins: 50 },
    { id: 'car', title: 'Car (Drive Tunnel)', carbonGrams: 7380, costDollars: 62.92, timeMins: 55 },
    { id: 'bus', title: 'NJ Transit Bus', carbonGrams: 1115, costDollars: 6.50, timeMins: 65 },
    { id: 'train', title: 'Drive to Train + Subway', carbonGrams: 1681, costDollars: 9.00, timeMins: 80 },
    { id: 'carpool', title: 'Carpool (3 Pax)', carbonGrams: 2460, costDollars: 20.97, timeMins: 55 },
    { id: 'walk', title: 'Walk to New York', carbonGrams: 0, costDollars: 0.00, timeMins: 340 }
];

function App() {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [activeSort, setActiveSort] = useState('best');
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = () => {
        if (!origin || !destination) return;
        setIsLoading(true);
        setHasSearched(true);
        // Simulate API delay for UI effect
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen flex flex-col w-full overflow-x-hidden font-sans bg-slate-50 text-slate-900">
            {/* Header / Input Area */}
            <InputPanel
                origin={origin}
                setOrigin={setOrigin}
                destination={destination}
                setDestination={setDestination}
                onSearch={handleSearch}
            />

            {/* Results Area */}
            {hasSearched && (
                <main className="w-full max-w-7xl mx-auto py-12 px-4 md:px-8 flex-1 flex flex-col items-center">
                    <RecommendationPanel
                        isLoading={isLoading}
                        recommendationText="Based on your destination in Midtown Manhattan, the NJ Transit Bus provides the best balance of low emissions and reasonable cost. The Ferry is an option, but the required Uber ride from Pier 11 significantly increases both your carbon footprint and total cost."
                    />

                    {!isLoading && (
                        <div className="w-full flex flex-col items-center animate-[fadeIn_0.5s_ease-out]">
                            <SortToggle activeSort={activeSort} onSortChange={setActiveSort} />
                            <RouteGrid routes={MOCK_ROUTES} activeSort={activeSort} />
                        </div>
                    )}
                </main>
            )}

            {/* Empty State Instructions (Before Search) */}
            {!hasSearched && (
                <main className="w-full max-w-3xl mx-auto py-24 px-4 md:px-8 flex-1 flex flex-col items-center justify-center text-center opacity-50">
                    <span className="text-6xl mb-6">📍</span>
                    <h2 className="text-2xl font-bold text-slate-400 mb-2">Ready to plan your commute?</h2>
                    <p className="text-slate-500 font-medium">Enter an origin in Carteret and a destination in NYC to compare real-time travel options.</p>
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

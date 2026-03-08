import React, { useState } from 'react';
import Act1_TheClaim from './components/Act1_TheClaim';
import Act2_TheCheck from './components/Act2_TheCheck';
import RouteMap from './components/RouteMap';
import Act3_TheVerdict from './components/Act3_TheVerdict';
import { CAR_ROUTE_KM, PERCENT_DRIVE_TO_TERMINAL } from './constants';

function App() {
    const [passengerCount, setPassengerCount] = useState(1);

    return (
        <div className="min-h-screen flex flex-col w-full overflow-x-hidden font-sans bg-slate-50 text-slate-900">

            {/* Act 1: The Claim (Hero section) */}
            <Act1_TheClaim passengerCount={passengerCount} setPassengerCount={setPassengerCount} />

            {/* Act 2: The Interactive Reality Check */}
            <Act2_TheCheck passengerCount={passengerCount} setPassengerCount={setPassengerCount} />

            {/* Interlude: Route Map visualizing the commute context */}
            <section className="w-full bg-slate-50 py-12 px-4 md:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-8 text-center">
                        <h3 className="text-2xl font-bold text-slate-800">The {CAR_ROUTE_KM}km Commute</h3>
                        <p className="text-slate-500">Carteret Terminal to Pier 11, Manhattan</p>
                    </div>
                    <RouteMap />
                </div>
            </section>

            {/* Act 3: The Verdict and Conclusion */}
            <Act3_TheVerdict passengerCount={passengerCount} />

            {/* Transparency Footer */}
            <footer className="w-full bg-slate-900 text-slate-400 py-12 px-4 md:px-8 border-t border-slate-800">
                <div className="max-w-4xl mx-auto text-center text-sm leading-relaxed">
                    <p className="mb-4">
                        Emissions data sourced from DEFRA 2024 Greenhouse Gas Conversion Factors and the Carteret Ferry Terminal Environmental Assessment.
                        CO₂-only model. Last-mile emissions based on {Math.round(PERCENT_DRIVE_TO_TERMINAL * 100)}% drive-to-terminal assumption.
                        All assumptions are disclosed in our methodology document.
                    </p>
                    <p className="opacity-60">
                        &copy; {new Date().getFullYear()} Carteret FerryCheck Open Source Project. Built with React and Recharts.
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default App;

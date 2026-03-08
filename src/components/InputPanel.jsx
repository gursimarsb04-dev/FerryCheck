import React, { useRef } from 'react';
import { Autocomplete } from '@react-google-maps/api';

export default function InputPanel({ origin, destination, setDestination, onSearch }) {
    const destRef = useRef(null);

    const onDestChanged = () => {
        if (destRef.current) {
            const place = destRef.current.getPlace();
            if (place && place.formatted_address) {
                setDestination(place.formatted_address);
            }
        }
    };

    return (
        <div className="w-full bg-slate-900 border-b-8 border-slate-950 p-6 md:p-12 relative overflow-hidden z-20">
            {/* Background pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center">
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4 text-center">
                    Carteret Commute Optimizer
                </h1>
                <p className="text-slate-400 text-lg md:text-xl font-medium mb-10 text-center max-w-2xl">
                    Enter your destination in NYC. We'll crunch the real-time Google Maps data against emissions and costs to find the ultimate route.
                </p>

                <div className="flex flex-col md:flex-row gap-4 w-full">
                    {/* Fixed Starting Point — always Carteret Waterfront */}
                    <div className="flex-1 relative">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest absolute -top-2 left-4 bg-slate-900 px-2 z-10">Starting Point</label>
                        <div className="w-full bg-slate-800/50 text-teal-400 border-2 border-slate-700/50 rounded-2xl px-6 py-4 font-bold flex items-center gap-2">
                            <span className="text-teal-500 text-lg">📍</span>
                            {origin}
                        </div>
                    </div>

                    {/* Destination — Google Places Autocomplete */}
                    <div className="flex-1 relative">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest absolute -top-2 left-4 bg-slate-900 px-2 z-10">Destination</label>
                        <Autocomplete onLoad={(ref) => destRef.current = ref} onPlaceChanged={onDestChanged}>
                            <input
                                type="text"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                className="w-full bg-slate-800 text-white border-2 border-slate-700 rounded-2xl px-6 py-4 outline-none focus:border-teal-500 font-bold placeholder-slate-500 transition-colors"
                                placeholder="Enter NYC Destination..."
                            />
                        </Autocomplete>
                    </div>

                    <button
                        onClick={onSearch}
                        className="bg-teal-500 hover:bg-teal-400 text-slate-900 font-black text-lg px-8 py-4 rounded-2xl border-4 border-slate-950 shadow-[4px_4px_0px_0px_rgba(2,6,23,1)] hover:translate-y-1 hover:shadow-none transition-all uppercase tracking-wider"
                    >
                        Optimize
                    </button>
                </div>
            </div>
        </div>
    );
}

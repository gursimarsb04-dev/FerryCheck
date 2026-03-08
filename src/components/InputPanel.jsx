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
        <div className="w-full relative z-20 flex flex-col gap-3">
            {/* Fixed Starting Point */}
            <div className="w-full relative">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest absolute -top-2 left-3 bg-slate-950 px-1 z-10">Starting Point</label>
                <div className="w-full bg-[#181a20] text-slate-300 border border-slate-800 rounded-xl px-4 py-3 text-sm flex items-center gap-2">
                    <span className="text-slate-500">📍</span>
                    {origin}
                </div>
            </div>

            {/* Destination — Google Places Autocomplete */}
            <div className="w-full relative">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest absolute -top-2 left-3 bg-slate-950 px-1 z-10">Destination</label>
                <Autocomplete onLoad={(ref) => destRef.current = ref} onPlaceChanged={onDestChanged}>
                    <input
                        type="text"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full bg-[#181a20] text-white border border-slate-800 rounded-xl px-4 py-3 outline-none focus:border-teal-500 text-sm placeholder-slate-600 transition-colors"
                        placeholder="Enter NYC Destination..."
                    />
                </Autocomplete>
            </div>

            <button
                onClick={onSearch}
                className="w-full mt-2 bg-teal-500/10 hover:bg-teal-500/20 text-teal-500 font-bold text-sm px-4 py-3 rounded-xl border border-teal-500/30 transition-all uppercase tracking-wider flex justify-between items-center"
            >
                Optimize Route
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
        </div>
    );
}

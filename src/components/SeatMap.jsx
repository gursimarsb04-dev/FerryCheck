import React from 'react';
import { VESSEL_CAPACITY } from '../constants';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default function SeatMap({ passengerCount, setPassengerCount }) {
    // Constants from claude.md: 149 seats, layout: 15 cols, 10 rows (150 total, minus 1)
    const columns = 15;
    const rows = 10;

    // Create an array of 149 seat elements
    const seats = Array.from({ length: VESSEL_CAPACITY }, (_, i) => {
        const isOccupied = i < passengerCount;
        return (
            <button
                key={i}
                aria-label={`Seat ${i + 1}`}
                className={cn(
                    "w-6 h-6 rounded-md transition-all duration-300 border-2",
                    isOccupied
                        ? "bg-teal-500 border-teal-700 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] scale-105"
                        : "bg-slate-100 border-slate-300 hover:bg-slate-200"
                )}
                onClick={() => {
                    // If clicking an un-occupied seat, fill up to that seat
                    // If clicking an occupied seat, empty from that seat onwards
                    // If double-clicking the current max occupied seat, maybe toggle off just one?
                    // Simplest toggle logic:
                    if (isOccupied) {
                        // Clicked an occupied seat: reduce count to just before this seat
                        setPassengerCount(Math.max(1, i));
                    } else {
                        // Clicked an empty seat: fill up to and including this seat
                        setPassengerCount(i + 1);
                    }
                }}
            />
        );
    });

    return (
        <div className="flex flex-col items-center p-8 bg-white rounded-3xl border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] w-full max-w-2xl transition-transform hover:-translate-y-1">
            <div className="mb-8 text-center bg-slate-100 px-6 py-3 rounded-2xl border-2 border-slate-900 inline-block rotate-1">
                <div className="text-sm font-black text-slate-500 uppercase tracking-widest mb-1 -rotate-1">Passengers On Board</div>
                <div className="text-5xl font-black text-slate-800 tabular-nums tracking-tight -rotate-1">
                    {passengerCount} <span className="text-2xl font-bold text-slate-400">/ {VESSEL_CAPACITY}</span>
                </div>
            </div>

            {/* 149-seat grid: 15 columns x 10 rows (last cell in bottom row won't exist because 149 items) */}
            <div
                className="grid gap-[4px] mb-8"
                style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
            >
                {seats}
            </div>

            <div className="w-full px-4 mb-2">
                <input
                    type="range"
                    min="1"
                    max={VESSEL_CAPACITY}
                    value={passengerCount}
                    onChange={(e) => setPassengerCount(parseInt(e.target.value, 10))}
                    className="w-full h-4 bg-slate-200 rounded-full appearance-none cursor-pointer accent-teal-500 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                    <span>1 Pax</span>
                    <span>Full Capacity</span>
                </div>
            </div>
        </div>
    );
}

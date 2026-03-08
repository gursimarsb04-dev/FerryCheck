import React, { useState } from 'react';
import SeatMap from './SeatMap';
import EmissionsChart from './EmissionsChart';

export default function Act2_TheCheck({ passengerCount, setPassengerCount }) {
    const [includeLastMile, setIncludeLastMile] = useState(false);

    return (
        <section className="w-full bg-slate-50 py-24 px-4 md:px-8 border-y-8 border-slate-900 relative overflow-hidden">
            {/* Playful Background Grid */}
            <div className="absolute inset-0 z-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">
                        The Reality Check
                    </h2>
                    <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto font-medium">
                        Watch how the per-passenger footprint compares to the alternatives as ridership grows.
                    </p>
                    <div className="mt-8 inline-flex items-center gap-4 bg-white p-4 rounded-2xl border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                        <label htmlFor="last-mile-toggle" className="text-base font-bold text-slate-800 cursor-pointer uppercase tracking-wide">
                            Add +5km Terminal Drive
                        </label>
                        <button
                            id="last-mile-toggle"
                            role="switch"
                            aria-checked={includeLastMile}
                            onClick={() => setIncludeLastMile(prev => !prev)}
                            className={`relative inline-flex h-8 w-14 items-center rounded-full border-2 border-slate-900 transition-colors focus:outline-none focus:ring-4 focus:ring-teal-500/30 ${includeLastMile ? 'bg-teal-500' : 'bg-slate-200'}`}
                        >
                            <span
                                className={`inline-block h-6 w-6 transform rounded-full bg-white border-2 border-slate-900 transition-transform ${includeLastMile ? 'translate-x-7' : 'translate-x-1'}`}
                            />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                        <SeatMap passengerCount={passengerCount} setPassengerCount={setPassengerCount} />
                    </div>
                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-start self-stretch">
                        <EmissionsChart passengerCount={passengerCount} includeLastMile={includeLastMile} />
                    </div>
                </div>
            </div>
        </section>
    );
}

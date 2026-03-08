import React from 'react';
import { calculateFerryCO2PerPax } from '../utils/emissionsLogic';

export default function Act1_TheClaim({ passengerCount, setPassengerCount }) {
    const currentFerryFootprint = Math.round(calculateFerryCO2PerPax(passengerCount) / 1000);

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-900 overflow-hidden px-4 py-20 border-b-8 border-teal-500">
            {/* Playful Background Grid */}
            <div className="absolute inset-0 z-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <div className="relative z-10 max-w-5xl mx-auto w-full">

                <div className="flex flex-col items-center text-center mb-12 animate-fade-in-up">
                    <div className="inline-flex items-center px-4 py-2 rounded-2xl border-2 border-slate-900 bg-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] font-bold text-slate-800 uppercase tracking-widest text-xs mb-8">
                        The Carteret Ferry Sandbox
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6 leading-[1.1] text-slate-900">
                        Build a <span className="text-teal-500 relative inline-block">Greener<svg className="absolute w-full h-4 -bottom-1 left-0 text-teal-300" viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0 10 Q 50 20 100 10" fill="transparent" stroke="currentColor" strokeWidth="4" /></svg></span> Commute.
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
                        A diesel ferry only beats the bus if it's full. Drag the slider to fill the boat and see how the math changes in real time.
                    </p>
                </div>

                {/* Hero Interactive Sandbox Element */}
                <div className="w-full bg-white rounded-3xl border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] p-8 md:p-12 mt-8 transition-transform hover:-translate-y-1">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-3xl font-black text-slate-900 mb-2">Ferry Passengers</h2>
                            <p className="text-slate-500 font-medium">Out of 149 Capacity</p>
                        </div>
                        <div className="text-center md:text-right">
                            <div className="text-6xl md:text-7xl font-black text-teal-500 tabular-nums tracking-tighter">
                                {passengerCount}
                            </div>
                        </div>
                    </div>

                    <div className="w-full px-2 mb-8">
                        <input
                            type="range"
                            min="1"
                            max="149"
                            value={passengerCount}
                            onChange={(e) => setPassengerCount(parseInt(e.target.value, 10))}
                            className="w-full h-6 bg-slate-100 rounded-full appearance-none cursor-pointer accent-teal-500 shadow-inner border-2 border-slate-200"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50 rounded-2xl p-6 border-2 border-slate-100">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-500 flex items-center justify-center font-black text-xl border-2 border-rose-200">
                                💨
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-500 uppercase">Current Footprint</p>
                                <p className="text-2xl font-black text-slate-900">{currentFerryFootprint}kg <span className="text-base font-medium text-slate-500">CO₂ per person</span></p>
                            </div>
                        </div>
                        <button
                            onClick={() => window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
                            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95"
                        >
                            See the full data ↓
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}

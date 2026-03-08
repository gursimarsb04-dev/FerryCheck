import React from 'react';
import {
    VESSEL_CAPACITY,
    NYC_FERRY_YEAR1_OCCUPANCY,
    CARTERET_PROJECTED_RIDERSHIP,
    OFFICIAL_QUOTE,
    FERRY_BASE_EMISSIONS_G,
    CAR_CO2_PER_KM,
    CAR_ROUTE_KM,
    NJ_TRANSIT_BUS_CO2
} from '../constants';
import { calculateBreakevenPassengers } from '../utils/emissionsLogic';

export default function Act3_TheVerdict({ passengerCount }) {
    const breakevenCar = calculateBreakevenPassengers();
    const soloCarCO2 = CAR_CO2_PER_KM * CAR_ROUTE_KM;
    const ferryAtFull = Math.round(FERRY_BASE_EMISSIONS_G / VESSEL_CAPACITY);

    return (
        <section className="w-full bg-slate-50 py-24 px-4 md:px-8 border-t-8 border-slate-900 relative overflow-hidden">
            {/* Playful Background Grid */}
            <div className="absolute inset-0 z-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-8">
                    The ferry barely beats your car.
                </h2>

                <p className="text-xl text-slate-600 mb-12 leading-relaxed text-left max-w-3xl mx-auto">
                    The breakeven point is {breakevenCar} passengers — requiring the vessel to hit 85% capacity. At 100% capacity, the ferry emits {ferryAtFull.toLocaleString()}g of CO₂ per rider versus {soloCarCO2.toLocaleString()}g for driving alone. The ferry is dirtier than a solo car unless it's nearly full on every single trip. The EA's claim of "environmentally friendly" hangs by a mathematical thread.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
                    <div className="bg-white border-4 border-teal-900 rounded-3xl p-8 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] transition-transform hover:-translate-y-1">
                        <p className="text-sm font-black text-teal-600 uppercase tracking-widest mb-2">
                            Ferry @ 100% Capacity
                        </p>
                        <p className="text-4xl font-black text-teal-700 tabular-nums mb-1">
                            {ferryAtFull.toLocaleString()}g
                        </p>
                        <p className="text-sm font-bold text-teal-700">
                            CO₂ per pax — barely wins
                        </p>
                    </div>

                    <div className="bg-slate-900 text-white border-4 border-slate-900 rounded-3xl p-8 shadow-[6px_6px_0px_0px_rgba(15,23,42,0.5)] transition-transform hover:-translate-y-1">
                        <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2">
                            Solo Car
                        </p>
                        <p className="text-4xl font-black text-white tabular-nums mb-1">
                            {soloCarCO2.toLocaleString()}g
                        </p>
                        <p className="text-sm font-bold text-slate-400">
                            CO₂ per passenger
                        </p>
                    </div>

                    <div className="bg-white border-4 border-rose-900 rounded-3xl p-8 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] transition-transform hover:-translate-y-1">
                        <p className="text-sm font-black text-rose-500 uppercase tracking-widest mb-2">
                            Breakeven vs. Car
                        </p>
                        <p className="text-4xl font-black text-rose-700 tabular-nums mb-1">
                            {breakevenCar}
                        </p>
                        <p className="text-sm font-bold text-rose-600">
                            out of {VESSEL_CAPACITY} total seats
                        </p>
                    </div>
                </div>

                <p className="text-sm text-slate-400 mb-16 text-center max-w-2xl mx-auto">
                    Emissions derived from the project's own Environmental Assessment (73 gal/trip × 10 kg CO₂/gal). Route distance: {CAR_ROUTE_KM}km. Car factor: {CAR_CO2_PER_KM}g/km (DEFRA 2024).
                </p>

                {/* Benchmarks Section */}
                <div className="mt-16 bg-white border-4 border-slate-900 rounded-3xl p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] text-left">
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-8 uppercase tracking-tight">
                        Reference Benchmarks
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-slate-50 rounded-2xl border-4 border-slate-900 p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                            <p className="text-sm font-black text-slate-500 uppercase tracking-widest mb-1">
                                Breakeven Occupancy vs Bus
                            </p>
                            <p className="text-3xl font-black text-rose-600 tabular-nums">
                                {Math.round((Math.ceil(FERRY_BASE_EMISSIONS_G / NJ_TRANSIT_BUS_CO2) / VESSEL_CAPACITY) * 100)}%
                            </p>
                            <p className="text-sm font-bold text-slate-500 mt-1">
                                Physically impossible on {VESSEL_CAPACITY} seats.
                            </p>
                        </div>

                        <div className="bg-slate-50 rounded-2xl border-4 border-slate-900 p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                            <p className="text-sm font-black text-slate-500 uppercase tracking-widest mb-1">
                                NYC Ferry Year-1 Occupancy
                            </p>
                            <p className="text-3xl font-black text-slate-900 tabular-nums">
                                {NYC_FERRY_YEAR1_OCCUPANCY !== 0.0
                                    ? `${NYC_FERRY_YEAR1_OCCUPANCY}%`
                                    : 'Pending data'}
                            </p>
                        </div>

                        <div className="bg-slate-50 rounded-2xl border-4 border-slate-900 p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                            <p className="text-sm font-black text-slate-500 uppercase tracking-widest mb-1">
                                Carteret Projected Ridership
                            </p>
                            <p className="text-3xl font-black text-slate-900 tabular-nums">
                                {CARTERET_PROJECTED_RIDERSHIP !== 0
                                    ? CARTERET_PROJECTED_RIDERSHIP.toLocaleString()
                                    : 'Pending data'}
                            </p>
                        </div>

                        <div className="bg-slate-50 rounded-2xl border-4 border-slate-900 p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] md:col-span-2">
                            <p className="text-sm font-black text-slate-500 uppercase tracking-widest mb-2">
                                Official EA Stated Goal
                            </p>
                            <p className="text-lg text-slate-700 italic font-medium">
                                "To provide reliable and more environmentally-friendly transportation service to New York City..."
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

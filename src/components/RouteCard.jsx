import React from 'react';

export default function RouteCard({ title, carbonGrams, costDollars, timeMins, isRecommended, rank }) {
    return (
        <div className={`flex flex-col p-6 rounded-3xl border-4 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] transition-transform hover:-translate-y-1 relative bg-white
            ${isRecommended ? 'border-teal-500' : 'border-slate-900'}
        `}>
            {isRecommended && (
                <div className="absolute -top-4 -right-4 bg-teal-500 text-slate-900 font-black px-4 py-1 border-4 border-slate-900 rounded-xl rotate-3 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                    ★ BEST CHOICE
                </div>
            )}

            <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{title}</h3>
                <span className="text-slate-400 font-bold text-xl">#{rank}</span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-2">
                {/* Metric cards internally stylized like tags */}
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Time</span>
                    <span className="text-2xl font-black text-slate-900 tabular-nums">
                        {timeMins} <span className="text-sm font-bold text-slate-500">m</span>
                    </span>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">Cost</span>
                    <span className="text-2xl font-black text-emerald-700 tabular-nums">
                        ${costDollars.toFixed(2)}
                    </span>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-1">CO₂</span>
                    <span className="text-2xl font-black text-amber-700 tabular-nums">
                        {(carbonGrams / 1000).toFixed(1)} <span className="text-sm font-bold text-amber-600">kg</span>
                    </span>
                </div>
            </div>
        </div>
    );
}

import React from 'react';

export default function RouteCard({ title, carbonGrams, costDollars, timeMins, isRecommended, rank, isSelected }) {
    return (
        <div className={`flex flex-col p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group
            ${isSelected
                ? 'bg-[#181a20] border-teal-500 shadow-[0_0_15px_rgba(20,184,166,0.15)] ring-1 ring-teal-500/50'
                : 'bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-[#131720]'
            }
        `}>
            {/* Background Glow if selected */}
            {isSelected && <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>}

            {isRecommended && (
                <div className="absolute top-0 right-0 bg-teal-500/10 text-teal-400 font-bold px-3 py-1 text-[10px] uppercase tracking-widest rounded-bl-lg border-b border-l border-teal-500/20">
                    ★ Best Choice
                </div>
            )}

            <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold
                        ${isSelected ? 'bg-teal-500 text-slate-900' : 'bg-slate-800 text-slate-400'}
                    `}>
                        {rank}
                    </span>
                    <h3 className={`text-base font-bold tracking-tight ${isSelected ? 'text-white' : 'text-slate-300 group-hover:text-white transition-colors'}`}>
                        {title}
                    </h3>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3 relative z-10">
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Time</span>
                    <span className="text-lg font-black text-white tabular-nums">
                        {timeMins} <span className="text-xs font-bold text-slate-500">m</span>
                    </span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Cost</span>
                    <span className="text-lg font-black text-white tabular-nums">
                        ${costDollars.toFixed(2)}
                    </span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">CO₂</span>
                    <span className="text-lg font-black text-white tabular-nums">
                        {(carbonGrams / 1000).toFixed(1)} <span className="text-xs font-bold text-slate-500">kg</span>
                    </span>
                </div>
            </div>
        </div>
    );
}

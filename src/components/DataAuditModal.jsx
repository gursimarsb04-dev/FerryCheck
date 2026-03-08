import React from 'react';

export default function DataAuditModal({
    passengerCount,
    setPassengerCount,
    baseFerryCarbon,
    carBaselineCarbon,
    busBaselineCarbon,
    onClose
}) {
    // Math recalculation for the slider
    const currentFerryCarbon = baseFerryCarbon / passengerCount;
    // Add terminal drive (approx 900g based on 5km * 180) and last mile (approx 378g) 
    // This is a simplified display number. In a real app we'd pass the exact computed totals down.
    const ferryTotalPerPax = (currentFerryCarbon + 900 + 378) / 1000; // convert to kg
    const carBaselineKg = carBaselineCarbon / 1000;
    const busBaselineKg = busBaselineCarbon / 1000;

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[480px] bg-[#0f1115] border border-slate-800 rounded-3xl p-6 shadow-2xl z-50 text-slate-300">
            <div className="flex items-center justify-between mb-4">
                <span className="text-teal-500 font-bold uppercase tracking-widest text-xs">ⓘ Data Audit</span>
                <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors bg-slate-900 border border-slate-800 rounded-full p-1 hover:border-slate-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>

            <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">The "Green" Ferry Claim</h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#181a20] p-4 rounded-2xl border border-slate-800">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">The Claim</p>
                    <p className="text-sm font-medium">"A green, eco-friendly alternative to driving into Manhattan."</p>
                </div>
                <div className="bg-[#181a20] p-4 rounded-2xl border border-slate-800">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">The Data</p>
                    <p className="text-sm font-medium">It's a diesel ferry. Its climate impact depends entirely on occupancy.</p>
                </div>
            </div>

            {/* Simulator */}
            <div className="bg-[#181a20] p-5 rounded-2xl border border-slate-800">
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <p className="text-white font-bold">Live Occupancy Simulator</p>
                        <p className="text-xs text-slate-500 mt-1">Adjust passenger load to see emissions impact.</p>
                    </div>
                    <div className="text-right">
                        <span className="text-2xl font-black text-white">{passengerCount}</span>
                        <span className="text-xs text-slate-500 font-bold ml-1">/ 149 pax</span>
                    </div>
                </div>

                <input
                    type="range"
                    min="1"
                    max="149"
                    value={passengerCount}
                    onChange={(e) => setPassengerCount(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500 mb-6"
                />

                <div className="flex gap-2 mb-2">
                    {/* dynamic vs car */}
                    <div className={`flex-1 p-3 rounded-xl border flex flex-col justify-center items-center gap-1 transition-colors
                        ${ferryTotalPerPax < carBaselineKg ? 'bg-emerald-950/30 border-emerald-900/50 text-emerald-500' : 'bg-rose-950/30 border-rose-900/50 text-rose-500'}
                    `}>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Vs. Solo Car</span>
                        <div className="flex items-center gap-1.5 font-bold">
                            {ferryTotalPerPax < carBaselineKg ? (
                                <><span className="text-sm">✓</span> Cleaner</>
                            ) : (
                                <><span className="text-sm">✕</span> Dirtier</>
                            )}
                        </div>
                    </div>

                    {/* dynamic vs bus */}
                    <div className={`flex-1 p-3 rounded-xl border flex flex-col justify-center items-center gap-1 transition-colors
                        ${ferryTotalPerPax < busBaselineKg ? 'bg-emerald-950/30 border-emerald-900/50 text-emerald-500' : 'bg-rose-950/30 border-rose-900/50 text-rose-500'}
                    `}>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Vs. Bus 112</span>
                        <div className="flex items-center gap-1.5 font-bold">
                            {ferryTotalPerPax < busBaselineKg ? (
                                <><span className="text-sm">✓</span> Cleaner</>
                            ) : (
                                <><span className="text-sm">✕</span> Dirtier</>
                            )}
                        </div>
                    </div>
                </div>
                <p className="text-[10px] text-slate-500 text-center mt-3">*Includes "last-mile" driving to terminal.</p>
            </div>
        </div>
    );
}

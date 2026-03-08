import React from 'react';

export default function RecommendationPanel({ isLoading, recommendationText }) {
    return (
        <div className="w-full bg-slate-900 border-4 border-slate-900 rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] relative overflow-hidden mb-12">
            <div className="absolute -right-16 -top-16 opacity-5 pointer-events-none">
                {/* Decorative massive icon (using text as placeholder for SVG) */}
                <span className="text-[200px]">🤖</span>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                <div className="min-w-[120px]">
                    <div className="inline-flex items-center justify-center p-4 bg-teal-500 rounded-2xl border-4 border-slate-950 shadow-[4px_4px_0px_0px_rgba(2,6,23,1)] rotate-[-2deg]">
                        <span className="font-black text-slate-900 uppercase tracking-widest text-sm">AI Analysis</span>
                    </div>
                </div>

                <div className="flex-1">
                    {isLoading ? (
                        <div className="animate-pulse flex flex-col gap-3 mt-2">
                            <div className="h-6 bg-slate-800 rounded-full w-full"></div>
                            <div className="h-6 bg-slate-800 rounded-full w-5/6"></div>
                            <div className="h-6 bg-slate-800 rounded-full w-4/6"></div>
                        </div>
                    ) : (
                        <p className="text-xl md:text-2xl text-slate-300 font-medium leading-relaxed">
                            {recommendationText}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

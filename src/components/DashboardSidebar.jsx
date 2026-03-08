import React from 'react';
import InputPanel from './InputPanel';
import RouteCard from './RouteCard';
import SortToggle from './SortToggle';

export default function DashboardSidebar({
    origin, setOrigin,
    destination, setDestination,
    onSearch,
    routes, activeSort, setActiveSort,
    selectedRouteId, setSelectedRouteId,
    isLoading, aiRecommendation
}) {
    // Sort logic 
    const sortedRoutes = [...routes].sort((a, b) => {
        if (activeSort === 'time') return a.timeMins - b.timeMins;
        if (activeSort === 'cost') return a.costDollars - b.costDollars;
        if (activeSort === 'carbon') return a.carbonGrams - b.carbonGrams;
        return a.rank - b.rank; // default / 'best'
    });

    return (
        <div className="w-full md:w-[450px] lg:w-[500px] h-full flex flex-col bg-slate-950 border-r border-slate-800 z-20 shadow-2xl overflow-y-auto">

            {/* Header Area */}
            <div className="p-6 border-b border-slate-800 shrink-0">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-white rounded-lg flex flex-col justify-center items-center shadow-sm">
                        <div className="w-4 h-1.5 bg-slate-900 rounded-sm mb-0.5" />
                        <div className="w-5 h-2 bg-slate-900 rounded-sm" />
                    </div>
                    <h1 className="text-xl font-black text-white tracking-tight">FerryCheck Optimizer</h1>
                </div>

                <div className="flex flex-col gap-3">
                    <InputPanel
                        origin={origin} setOrigin={setOrigin}
                        destination={destination} setDestination={setDestination}
                        onSearch={onSearch}
                        compact={true}
                    />
                </div>
            </div>

            {/* Results Area */}
            {routes.length > 0 && !isLoading && (
                <div className="flex-1 flex flex-col p-6 overflow-y-auto">

                    {/* Filters Placeholder / Sort */}
                    <div className="flex justify-between items-center mb-6 shrink-0">
                        <SortToggle activeSort={activeSort} onSortChange={setActiveSort} compact={true} />
                        <button className="text-slate-400 text-sm font-medium flex items-center gap-2 hover:text-white transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
                            Filters
                        </button>
                    </div>

                    {/* Route List */}
                    <div className="flex flex-col gap-4">
                        {sortedRoutes.map((route, idx) => (
                            <div key={route.id} onClick={() => setSelectedRouteId(route.id)}>
                                <RouteCard
                                    title={route.title}
                                    carbonGrams={route.carbonGrams}
                                    costDollars={route.costDollars}
                                    timeMins={route.timeMins}
                                    isRecommended={activeSort === 'best' && idx === 0}
                                    rank={idx + 1}
                                    isSelected={selectedRouteId === route.id}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {isLoading && (
                <div className="p-6 flex flex-col gap-4 animate-pulse pt-12">
                    <div className="h-24 bg-slate-900 rounded-xl" />
                    <div className="h-24 bg-slate-900 rounded-xl" />
                    <div className="h-24 bg-slate-900 rounded-xl" />
                </div>
            )}
        </div>
    );
}

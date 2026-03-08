import React from 'react';
import RouteCard from './RouteCard';

export default function RouteGrid({ routes, activeSort }) {
    // Sort logic placeholder based on activeSort
    const sortedRoutes = [...routes].sort((a, b) => {
        if (activeSort === 'time') return a.timeMins - b.timeMins;
        if (activeSort === 'cost') return a.costDollars - b.costDollars;
        if (activeSort === 'carbon') return a.carbonGrams - b.carbonGrams;
        return a.rank - b.rank; // default / 'best'
    });

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 w-full">
            {sortedRoutes.map((route, idx) => (
                <RouteCard
                    key={route.id}
                    title={route.title}
                    carbonGrams={route.carbonGrams}
                    costDollars={route.costDollars}
                    timeMins={route.timeMins}
                    isRecommended={activeSort === 'best' && idx === 0}
                    rank={idx + 1}
                />
            ))}
        </div>
    );
}

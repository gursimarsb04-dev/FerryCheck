import React from 'react';

export default function SortToggle({ activeSort, onSortChange }) {
    const sorts = [
        { id: 'best', label: 'Best Overall' },
        { id: 'time', label: 'Fastest' },
        { id: 'carbon', label: 'Greenest' },
        { id: 'cost', label: 'Cheapest' }
    ];

    return (
        <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-8">
            {sorts.map((sort) => {
                const isActive = activeSort === sort.id;
                return (
                    <button
                        key={sort.id}
                        onClick={() => onSortChange(sort.id)}
                        className={`px-6 py-2 rounded-xl font-bold text-sm md:text-base border-2 transition-all uppercase tracking-wide
                            ${isActive
                                ? 'bg-slate-900 border-slate-900 text-white shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]'
                                : 'bg-white border-slate-300 text-slate-500 hover:border-slate-400 hover:text-slate-800'
                            }
                        `}
                    >
                        {sort.label}
                    </button>
                );
            })}
        </div>
    );
}

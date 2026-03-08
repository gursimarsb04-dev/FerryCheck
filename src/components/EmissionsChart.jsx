import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
    Cell,
    Label,
    LabelList
} from 'recharts';
import {
    calculateFerryCO2PerPax,
    calculateAdjustedFerryCO2,
    calculateSoloCarCO2,
    calculateCarpoolCO2
} from '../utils/emissionsLogic';
import { NJ_TRANSIT_BUS_CO2 } from '../constants';

export default function EmissionsChart({ passengerCount, includeLastMile }) {
    const soloCarValue = calculateSoloCarCO2();
    const ferryValue = includeLastMile
        ? calculateAdjustedFerryCO2(passengerCount)
        : calculateFerryCO2PerPax(passengerCount);

    const busThreshold = NJ_TRANSIT_BUS_CO2;
    const ferryBeatsCar = ferryValue < soloCarValue;
    const ferryWins = ferryBeatsCar;

    const data = [
        {
            name: 'Ferry',
            co2: Math.round(ferryValue),
            fill: ferryWins ? '#14b8a6' : '#f43f5e', // Stronger teal / rose
        },
        {
            name: 'Solo Car',
            co2: Math.round(soloCarValue),
            fill: '#94a3b8',
        },
        {
            name: 'Carpool',
            co2: Math.round(calculateCarpoolCO2()),
            fill: '#cbd5e1',
        },
        {
            name: 'NJ Transit Bus',
            co2: busThreshold,
            fill: '#f59e0b',
            isBus: true
        }
    ];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 border-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] rounded-2xl">
                    <p className="font-black text-slate-800 uppercase tracking-wide mb-1 opacity-80">{label}</p>
                    <p className="text-slate-600">
                        <span className="font-bold text-slate-900">{payload[0].value.toLocaleString()}g</span> CO₂ per pax
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="flex flex-col items-center p-8 bg-white rounded-3xl border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] w-full h-full min-h-[400px] transition-transform hover:-translate-y-1">
            <div className="mb-6 text-center w-full">
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Emissions Race</h3>
                <p className="text-sm font-bold text-slate-500 mt-1">LOWER IS BETTER</p>
                {ferryWins && (
                    <div className="mt-4 inline-flex items-center px-6 py-2 rounded-2xl border-2 border-teal-600 bg-teal-100 text-teal-900 md:text-lg font-black shadow-[4px_4px_0px_0px_rgba(15,23,42,0.1)] animate-bounce-subtle">
                        🏆 Ferry wins at {passengerCount} riders!
                    </div>
                )}
            </div>

            <div className="w-full flex-grow mt-4 relative">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                        barCategoryGap="20%"
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontWeight: 600 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8' }}
                            dx={-10}
                            domain={[0, Math.max(10000, ferryValue + 1000)]}
                            tickFormatter={(val) => `${(val / 1000).toFixed(0)}kg`}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                        <ReferenceLine
                            y={soloCarValue}
                            stroke="#64748b"
                            strokeDasharray="5 5"
                            strokeWidth={2}
                        >
                            <Label
                                value={`Solo Car (${(soloCarValue / 1000).toFixed(1)}kg)`}
                                position="insideTopRight"
                                fill="#64748b"
                                fontSize={12}
                                fontWeight={600}
                                dy={-15}
                            />
                        </ReferenceLine>
                        <ReferenceLine
                            y={busThreshold}
                            stroke="#f59e0b"
                            strokeDasharray="5 5"
                            strokeWidth={2}
                        >
                            <Label
                                value={`NJ Transit Bus (${busThreshold}g)`}
                                position="insideTopRight"
                                fill="#f59e0b"
                                fontSize={12}
                                fontWeight={600}
                                dy={-15}
                            />
                        </ReferenceLine>
                        <Bar dataKey="co2" radius={[8, 8, 0, 0]} isAnimationActive={false}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} stroke="#0f172a" strokeWidth={3} />
                            ))}
                            <LabelList
                                dataKey="name"
                                position="top"
                                content={(props) => {
                                    const { x, y, width, index } = props;
                                    const currentEntry = data[index];
                                    if (currentEntry.isBus) {
                                        return (
                                            <text x={x + width / 2} y={y - 10} fill="#64748b" textAnchor="middle" fontSize={10} fontWeight="bold">
                                                existing alternative
                                            </text>
                                        );
                                    }
                                    return null;
                                }}
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

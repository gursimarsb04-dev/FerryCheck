import React from 'react';
import { MapContainer, TileLayer, Polyline, CircleMarker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { PERCENT_DRIVE_TO_TERMINAL, TERMINAL_DRIVE_KM, FERRY_ROUTE_KM } from '../constants';

export default function RouteMap() {
    // Precise coordinates for clean Polyline/CircleMarker SVG alignment
    const carteretCoords = [40.5898, -74.2257];
    const manhattanCoords = [40.7050, -74.0090]; // Pier 11 / Wall Street
    const lastMileStart = [40.5600, -74.2400];   // Adjusted for visual flow into the terminal

    return (
        <div className="w-full h-[500px] bg-white rounded-3xl overflow-hidden border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] relative z-0">
            <MapContainer
                center={[40.6500, -74.1200]}
                zoom={11}
                scrollWheelZoom={false}
                className="h-full w-full outline-none"
            >
                {/* Light CartoDB tiles */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />

                {/* The Ferry Route — NORTH via Arthur Kill → Kill Van Kull → Upper NY Bay */}
                <Polyline
                    positions={[
                        carteretCoords,
                        [40.6050, -74.2150], // North along Arthur Kill
                        [40.6250, -74.2000], // Arthur Kill bending NE
                        [40.6450, -74.1800], // Approaching Newark Bay junction
                        [40.6530, -74.1550], // Entering Kill Van Kull
                        [40.6460, -74.1350], // Mid Kill Van Kull (near Bayonne Bridge)
                        [40.6420, -74.0950], // Kill Van Kull narrows
                        [40.6430, -74.0700], // Exiting Kill Van Kull into Upper NY Bay
                        [40.6600, -74.0500], // Upper New York Bay
                        [40.6850, -74.0350], // Past Liberty/Ellis Islands
                        [40.7000, -74.0180], // Approaching Lower Manhattan
                        manhattanCoords
                    ]}
                    color="#0ea5e9"
                    weight={6}
                    dashArray="10, 10"
                >
                    <Tooltip sticky>~{FERRY_ROUTE_KM}km Ferry via Arthur Kill + Kill Van Kull</Tooltip>
                </Polyline>

                {/* The Last Mile Route */}
                <Polyline positions={[lastMileStart, carteretCoords]} color="#f43f5e" weight={4}>
                    <Tooltip sticky>{TERMINAL_DRIVE_KM}km Drive to Terminal</Tooltip>
                </Polyline>

                {/* Carteret Terminal Marker */}
                <CircleMarker center={carteretCoords} radius={8} pathOptions={{ fillColor: '#0ea5e9', color: '#fff', weight: 2, fillOpacity: 1 }}>
                    <Popup>
                        <div className="font-bold text-slate-800">Carteret Terminal</div>
                        <div className="text-sm text-slate-600">Assumes {(PERCENT_DRIVE_TO_TERMINAL * 100).toFixed(0)}% drive here to catch the ferry.</div>
                    </Popup>
                </CircleMarker>

                {/* Manhattan Terminal Marker */}
                <CircleMarker center={manhattanCoords} radius={8} pathOptions={{ fillColor: '#10b981', color: '#fff', weight: 2, fillOpacity: 1 }}>
                    <Popup>
                        <div className="font-bold text-slate-800">Manhattan (Pier 11)</div>
                        <div className="text-sm text-slate-600">Destination</div>
                    </Popup>
                </CircleMarker>
            </MapContainer>
        </div>
    );
}

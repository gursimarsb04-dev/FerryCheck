import React from 'react';
import { MapContainer, TileLayer, Polyline, CircleMarker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { PERCENT_DRIVE_TO_TERMINAL, TERMINAL_DRIVE_KM } from '../constants';

export default function RouteMap() {
    // Precise coordinates for clean Polyline/CircleMarker SVG alignment
    const carteretCoords = [40.5898, -74.2257];
    const manhattanCoords = [40.7050, -74.0090]; // Snapped closer to Pier 11 
    const lastMileStart = [40.5600, -74.2400];   // Adjusted for visual flow into the terminal

    return (
        <div className="w-full h-[500px] bg-white rounded-3xl overflow-hidden border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] relative z-0">
            <MapContainer
                center={[40.6513, -74.1158]}
                zoom={11}
                scrollWheelZoom={false}
                className="h-full w-full outline-none"
            >
                {/* Dark theme map tiles (CartoDB Dark Matter or similar, using standard OSM for now due to simplicity, but styled dark if possible, else standard) */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />

                {/* The Ferry Route (Waterway Path) */}
                <Polyline
                    positions={[
                        carteretCoords,
                        [40.6014, -74.2045], // Up Arthur Kill
                        [40.6405, -74.1795], // Past Tremley Point
                        [40.6450, -74.1350], // Enter Kill Van Kull
                        [40.6455, -74.0815], // North of Staten Island
                        [40.6550, -74.0450], // Entering Upper Bay
                        [40.6860, -74.0200], // Past Governors Island
                        manhattanCoords
                    ]}
                    color="#0ea5e9"
                    weight={6}
                    dashArray="10, 10"
                >
                    <Tooltip sticky>22km Ferry Waterway Route</Tooltip>
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

import React from 'react';
import { GoogleMap, DirectionsRenderer, Polyline } from '@react-google-maps/api';

const mapContainerStyle = {
    width: '100%',
    height: '100%'
};

const defaultCenter = {
    lat: 40.6698, // rough center between NY and NJ
    lng: -74.1500
};

// Dark mode map styles mimicking the mockup
const darkMapStyle = [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
    },
    {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
    },
    {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
    },
    {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
    },
];

export default function MapCanvas({ directionsResponse, selectedRouteId }) {
    // Hardcoded path over the water from Carteret to Pier 11
    const ferryPath = [
        { lat: 40.5843, lng: -74.2185 }, // Carteret Waterfront Park
        { lat: 40.5950, lng: -74.1900 }, // Arthur Kill
        { lat: 40.6400, lng: -74.1000 }, // Kill Van Kull
        { lat: 40.6800, lng: -74.0300 }, // Upper Bay
        { lat: 40.7032, lng: -74.0044 }  // Pier 11
    ];

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={12}
            center={{ lat: 40.5843, lng: -74.2185 }} // Start on Carteret
            options={{
                styles: darkMapStyle,
                disableDefaultUI: true, // cleaner look
                zoomControl: true,
            }}
        >
            {directionsResponse && (
                <DirectionsRenderer
                    directions={directionsResponse}
                    options={{
                        polylineOptions: {
                            strokeColor: '#14b8a6', // teal-500
                            strokeWeight: 5,
                            strokeOpacity: 0.8
                        },
                        suppressMarkers: false
                    }}
                />
            )}

            {/* Hardcoded Ferry Polyline */}
            {selectedRouteId === 'ferry' && (
                <Polyline
                    path={ferryPath}
                    options={{
                        strokeColor: '#38bdf8', // visible light blue
                        strokeOpacity: 0, // 0 because we use icons for dashed line
                        strokeWeight: 4,
                        icons: [{
                            icon: {
                                path: 'M 0,-1 0,1',
                                strokeOpacity: 1,
                                scale: 4
                            },
                            offset: '0',
                            repeat: '20px'
                        }]
                    }}
                />
            )}
        </GoogleMap>
    );
}

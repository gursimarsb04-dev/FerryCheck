import React from 'react';
import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api';

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

export default function MapCanvas({ directionsResponse }) {
    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={11}
            center={defaultCenter}
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
        </GoogleMap>
    );
}

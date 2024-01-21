'use client';
import { useEffect, useState } from 'react';
import * as React from 'react';
import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function App() {
  const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const [viewport, setViewport] = useState({
    longitude: -123.246231,
    latitude: 49.26244,
    zoom: 16,
  });

  useEffect(() => {
    // Function to get the current position
    const getCurrentPosition = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { longitude, latitude } = position.coords;
            setViewport({
              ...viewport,
              longitude,
              latitude,
            });
          },
          (error) => {
            console.error('Error getting current position:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    // Call the function on component mount
    getCurrentPosition();
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <Map
      mapboxAccessToken={mapboxAccessToken}
      initialViewState={viewport}
      style={{ width: 600, height: 700 }}
      mapStyle='mapbox://styles/mapbox/streets-v9'
    />
  );
}

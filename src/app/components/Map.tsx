'use client';
import React, { useRef, useEffect, useMemo, useState } from 'react';
import { useVenue } from '../../hooks/useVenue';
import useMapView from '../../hooks/useMapView';
import '@mappedin/mappedin-js/lib/mappedin.css';
import { MappedinMap, TMapViewOptions } from '@mappedin/mappedin-js';
import './styles.css';

let positionData = {
  timestamp: Date.now(),
  coords: {
    accuracy: 5,
    latitude: 43.51905183293411,
    longitude: -80.53701846381122,
    floorLevel: 0,
  },
};

export default function Map() {
  const options = useMemo(
    () => ({
      venue: 'mappedin-demo-mall',
      clientId: '5eab30aa91b055001a68e996',
      clientSecret: 'RJyRXKcryCMy4erZqqCbuB1NbR66QTGNXVE0x3Pg6oCIlUR1',
    }),
    []
  );

  const venue = useVenue(options);
  const mapOptions = useMemo<TMapViewOptions>(
    () => ({
      // these are necessary for path from locations to show up
      xRayPath: true, // X Ray enables seeing the path through walls
      multiBufferRendering: true, // Multi buffer rendering is necessary for features like x ray
    }),
    []
  );
  const { elementRef, mapView } = useMapView(venue, mapOptions);

  useEffect(() => {
    if (!mapView || !venue) {
      return;
    }

    mapView.addInteractivePolygonsForAllLocations();

    mapView.FloatingLabels.labelAllLocations({
      interactive: true, // Make labels interactive
    });
  }, [mapView, venue]);

  /* Start navigation when the map loads */
  useEffect(() => {
    if (!mapView || !venue) {
      return;
    }

    /*
     * All maps made in Maker will contain a location called "footprintcomponent"
     * which represents the exterior "footprint"
     * You can use this location to get the nearest entrance or exit
     */
    const startLocation = venue.locations.find(
      (location) => location.id == '655cfe0d97f60821d04cca6d' //new balance factory store
    );
    // Navigate to some location on another floor
    const endLocation = venue.locations.find(
      (location) => location.id == '591224bdca1ecc26fe8bdf31' //p1 imports
    );

    if (!startLocation) {
      console.log(`couldn't find start location`);
    }

    console.log(`all locations`, venue.locations);

    if (startLocation && endLocation) {
      // Generate a route between these two locations
      const directions = startLocation.directionsTo(endLocation);
      if (directions && directions.path.length > 0) {
        // The Journey class draws the path & can be configured with a few options
        mapView.Journey.draw(directions, {
          polygonHighlightColor: '#e74c3c', // Start and end polygons colour
          departureMarkerTemplate: (props) => {
            // The departure marker is the person at the start location
            return `<div style="display: flex; flex-direction: column; justify-items: center; align-items: center;">
            <div class="departure-marker">${
              props.location ? props.location.name : 'Departure'
            }</div>
            ${props.icon}
            </div>`;
          },
          destinationMarkerTemplate: (props) => {
            // The destination marker is the pin at the end location
            return `<div style="display: flex; flex-direction: column; justify-items: center; align-items: center;">
            <div class="destination-marker">${
              props.location ? props.location.name : 'Destination'
            }</div>
            ${props.icon}
            </div>`;
          },
          connectionTemplate: (props) => {
            // The connection marker is the button to switch floors on the map
            return `<div class="connection-marker">Take ${props.type} ${props.icon}</div>`;
          },
          pathOptions: {
            nearRadius: 0.25, // The path size in metres at the nearest zoom
            farRadius: 1, // The path size in metres at the furthest zoom
            color: '#40A9FF', // Path colour
            displayArrowsOnPath: false, // Arrow animation on path
            showPulse: true, // Pulse animation on path
            pulseIterations: Infinity, // How many times to play the pulse animation
          },
        });

        // Set the map (floor level) to start at the beginning of the path
        mapView.setMap(directions.path[0].map);
      }
    }
    // Update the selected map state
    setSelectedMap(mapView.currentMap);
  }, [mapView, venue]);

  // Track the selected map with state, for the UI
  const [selectedMap, setSelectedMap] = useState<MappedinMap | undefined>();

  return (
    <div id='app'>
      <div id='ui'>
        <button onClick={() => console.log(venue?.locations)}>CLICK ME</button>
        <div id='map-container' ref={elementRef} style={{ height: '500px' }} />
      </div>
    </div>
  );
}

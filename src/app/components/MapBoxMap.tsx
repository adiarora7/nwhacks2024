"use client"
import { useEffect, useState } from 'react';
import * as React from 'react';
import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Location } from './Search/SearchBox';


export default function MapBoxMap({
  coordinates
}:{
  coordinates?: Location
}) {
  
    const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const [viewport, setViewport] = useState({
      longitude: -123.246231,
      latitude: 49.262440,
      zoom: 16
    });

    useEffect(()=>{

      if(coordinates){
        setViewport({longitude:coordinates.longitude, latitude:coordinates.latitude, zoom:16})
      }

    },[coordinates])
  
    return (
      <Map
        mapboxAccessToken={mapboxAccessToken}
        {...viewport}
        onMove={evt => setViewport(evt.viewState)}
        style={{display: 'flex', position: 'absolute', zIndex: 0}}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      />
    );
  }
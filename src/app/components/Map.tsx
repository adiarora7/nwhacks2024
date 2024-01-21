"use client";
import React, { useRef, useEffect, useMemo } from "react";
import { useVenue } from "../../hooks/useVenue";
import useMapView from "../../hooks/useMapView";
import "@mappedin/mappedin-js/lib/mappedin.css";

export default function Map() {
  const options = useMemo(() => ({
    venue: "mappedin-demo-mall",
      clientId: "5eab30aa91b055001a68e996",
      clientSecret: "RJyRXKcryCMy4erZqqCbuB1NbR66QTGNXVE0x3Pg6oCIlUR1"
  }), []);

  const venue = useVenue(options);
  const { elementRef } = useMapView(venue);

  return <div id="mappedin-map" ref={elementRef} style={{ height: "500px" }} />;
}

"use client"
import MapBoxMap from "../components/MapBoxMap";
import { useState } from "react";
import * as React from 'react';
import { Search } from "../components/Search";
import { Location } from "../components/Search/SearchBox";
import BuildingCard from "../components/BuildingCard/BuildingCard";


export default function App() {

    const [ coordinates, setCoordinates] = useState<Location>();
    
    const locations = [
        { name: "Life Sciences Institute", address:"2350 Health Sciences Mall, Vancouver, BC V6T 1Z3", longitude: -123.246231, latitude: 49.262440},
        { name: "UBC Life Sciences Centre (LSC) Perugia Café", address:"2350 Health Sciences Mall, Vancouver, BC V6T 2A1", longitude: -123.24505587387512 , latitude:49.26246728250251 },
        { name: "UBC Life Building", address:"6138 Student Union Blvd, Vancouver, BC V6T 1Z1", longitude: -123.25018937944034, latitude: 49.26775100554091 },
        { name: "AMS Student Nest", address:"6133 University Blvd, Vancouver, BC V6T 1Z1", longitude: -123.25001497390605, latitude: 49.26661897238175},
        { name: "AMS Food Bank", address:"6133 University Blvd, Vancouver, BC V6T 1Z1", longitude: -123.24986751434675, latitude: 49.26756898352638  },
        { name: "Ambleside Park | West Vancouver", address:"1150 Marine Dr, West Vancouver, BC V7T 1B1", longitude:-123.15060281606733 , latitude:49.32478641945975 }
      ];

    return (
        <div>
            <Search locations={locations} handleCoordinate={setCoordinates} /> 
            <MapBoxMap coordinates={coordinates}  />
            {coordinates&&<BuildingCard/>}
        </div>
        
       
    );
  }
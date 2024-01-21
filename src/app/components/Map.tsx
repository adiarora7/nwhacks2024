'use client';
import {
  TGetVenueMakerOptions,
  MARKER_ANCHOR,
  COLLISION_RANKING_TIERS,
  TMapViewOptions,
  STATE,
  E_SDK_EVENT,
  PositionUpdater,
  TGeolocationObject,
  MappedinDirections,
} from '@mappedin/mappedin-js';
import '@mappedin/mappedin-js/lib/mappedin.css';
import { useEffect, useMemo, useRef } from 'react';
import useMapClick from '../hooks/useMapClick';
import useMapView from '../hooks/useMapView';
import useVenueMaker from '../hooks/useVenueMaker';
/* This demo shows you how to configure and render a map. */
export default function BasicExample() {
  const mapContainerRef = useRef(null);
  const positionUpdater = useRef(new PositionUpdater());
  const blueDotPosition = useRef({
    timestamp: Date.now(),
    coords: {
      latitude: 43.51913063428935,
      longitude: -80.54104173445346,
      accuracy: 4,
    },
  });
  const directionsRef = useRef<MappedinDirections | null>(null);

  /*
   * API keys and options for fetching the venue must be memoized
   * to prevent React from re-rendering excessively.
   */
  const credentials = useMemo<TGetVenueMakerOptions>(
    () => ({
      mapId: '657cc670040fcba69696e69e',
      key: '65a0422df128bbf7c7072349',
      secret:
        '5f72653eba818842c16c4fdb9c874ae02100ffced413f638b7bd9c65fd5b92a4',
    }),
    []
  );
  // The venue object contains all the iterable data for the map
  const venue = useVenueMaker(credentials);

  const mapOptions = useMemo<TMapViewOptions>(
    () => ({
      backgroundColor: '#CFCFCF', // Background colour behind the map
    }),
    []
  );
  // The mapView is the entrypoint to controling the map
  const { elementRef, mapView } = useMapView(venue, mapOptions);

  /* Map setup should be done in a useEffect */
  useEffect(() => {
    // Check that the map and venue were created successfully
    if (!mapView || !venue) {
      return;
    }

    // IMPLEMENTING NAVIGATION HERE
    const startLocation = venue.locations.find((location) =>
      location.id.includes('footprintcomponent')
    );
    const endLocation = venue.locations.find(
      (location) => location.id == 'location-obstruction-ey'
    );

    console.log(`all locations`, venue.locations);

    if (!startLocation || !endLocation) {
      console.log(`startLocation / endLocation not found`);
      return;
    }
    //Get directions between the start and end locations.
    const directions = startLocation.directionsTo(endLocation);
    directionsRef.current = directions;

    //Pass the directions to Journey to draw a path and icons.
    mapView.Journey.draw(directions);

    //Set the camera state to follow the user's location on the map,
    //marked by a blue dot.
    mapView.setState(STATE.FOLLOW);

    //Enable the showing the user's location on the map as a Blue Dot.
    //A positionUpdater is passed, which will provide the latitude and
    //longtitude coordinates used to locate the user.

    // not working when following the documentation's instructions for populating
    // lattitude and longitude using 'directions' object
    // blueDotPosition.current = {
    //   ...blueDotPosition.current,
    //   coords: {
    //     ...blueDotPosition.current.coords,
    //     latitude: directions.instructions[0].node.lat,
    //     longitude: directions.instructions[0].node.lon,
    //   },
    // };

    console.log(`bluedot current position`, blueDotPosition.current);
    positionUpdater.current.update(blueDotPosition.current);

    // Label all spaces and desks which have a name
    mapView.FloatingLabels.labelAllLocations();
  }, [mapView, venue]);

  // useEffect for testing blue dot
  useEffect(() => {
    if (!mapView) {
      return;
    }

    console.log(`running bluedot useEffect`);
    mapView.BlueDot.enable({
      smoothing: false,
      positionUpdater: positionUpdater.current,
      showBearing: true,
    });

    if (!directionsRef) {
      console.log(`directionsRef is null`);
      return;
    }

    blueDotPosition.current = {
      ...blueDotPosition.current,
      coords: {
        ...blueDotPosition.current.coords,
        latitude: directionsRef.current!.instructions[0].node.lat,
        longitude: directionsRef.current!.instructions[0].node.lon,
      },
    };
  }, [mapView, directionsRef]);

  const handleBlueDotMove = (blueDotPosition: React.MutableRefObject<any>) => {
    console.log(`handleBlueDotMove`);
    const newBlueDotPosition = {
      ...blueDotPosition.current,
      coords: {
        ...blueDotPosition.current.coords,
        latitude: blueDotPosition.current.coords.latitude + 1,
        longitude: blueDotPosition.current.coords.longitude + 1,
      },
    };

    blueDotPosition.current = newBlueDotPosition;
    console.log(`newBlueDotPosition`, newBlueDotPosition);
    positionUpdater.current.update(newBlueDotPosition);
  };

  return (
    <div className='flex w-screen h-screen'>
      {/* overlay */}
      <div className='absolute inset-0 px-8 py-6 h-full flex flex-col items-center justify-between'>
        {/* top bar */}
        <div className='relative z-10 w-full flex flex-col max-w-[500px] bg-[#359896] rounded-md p-4'>
          <div className='flex w-full justify-between'>
            {/* distance */}
            <div className='flex items-start'>
              <span className='text-4xl font-bold text-center text-white'>
                0.7
              </span>
              <span className='text-xl font-semibold text-center text-white'>
                m
              </span>
            </div>

            {/* accessible landmark */}
            <div className='flex items-center flex-row'>
              <div className='rounded-md bg-white pl-2 pr-4 py-1 relative'>
                <p className='text-xs font-[#359896] font-semibold'>
                  Nest stairwell
                </p>
              </div>
              <img
                className='rounded-full h-8 w-8 -mx-2 z-10'
                src='https://diginit.sites.olt.ubc.ca/files/2023/07/1.0410990-1024x683.jpg'
                alt='Image'
              />
            </div>
          </div>
          {/* direction */}
          <span className='text-xl text-left font-semibold  text-white'>
            Continue Straight
          </span>
        </div>
        <div className='z-10 flex flex-col w-full '>
          {/* accessibility buttons */}
          <div className='z-10 flex w-full flex-col max-w-[500px] justify-self-start p-4 mt-2'>
            <button
              className='rounded-full bg-red-500 text-white w-12 h-12'
              onClick={() => {
                handleBlueDotMove(blueDotPosition);
              }}
            >
              Simulate Step
            </button>
            <button className='rounded-full bg-blue-500 hover:bg-blue-700 text-white w-12 h-12 flex items-center justify-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='#fff'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                />
              </svg>
            </button>
            <button className='rounded-full bg-blue-500 hover:bg-blue-700 text-white w-12 h-12 flex items-center justify-center mt-6'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                />
              </svg>
            </button>
          </div>
          {/* bottom bar */}
          <div className='z-10 flex w-full flex-col max-w-[500px] bg-[#FAFAFA] border-slate-100 rounded-md p-4'>
            <div className='flex w-full'>
              <span className='text-xl font-semibold text-black'>3m</span>
            </div>
            <div className='flex w-full h-full justify-between items-end'>
              <span className='text-sm font-semibold text-black'>
                50m ● 3rd Floor
              </span>
              <button className='bg-rose-500 hover:bg-rose-700 text-white font-semibold py-1 px-4 rounded'>
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*map */}
      <div className='absolute inset-0 z-0 h-full flex'>
        <div id='map-container' ref={elementRef}></div>;
      </div>
    </div>
  );
}

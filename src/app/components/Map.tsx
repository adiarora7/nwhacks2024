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
import { useEffect, useMemo, useRef, useState } from 'react';
import useMapClick from '../hooks/useMapClick';
import useMapView from '../hooks/useMapView';
import useVenueMaker from '../hooks/useVenueMaker';
import clsx from 'clsx';
import Link from 'next/link';

const imageUrl =
  'https://diginit.sites.olt.ubc.ca/files/2023/07/1.0410990-1024x683.jpg';

/* This demo shows you how to configure and render a map. */
export default function BasicExample() {
  const [isMovementImpaired, setIsMovementImpaired] = useState(false);
  const [isAudioImpaired, setIsAudioImpaired] = useState(false);
  const blueDotPosition = useRef({
    timestamp: Date.now(),
    coords: {
      latitude: 49.26219137378182,
      longitude: -123.24513153466945,
      accuracy: 1,
    },
  } as TGeolocationObject);
  const directionsRef = useRef<MappedinDirections | null>(null);
  const positionUpdater = useRef<PositionUpdater | null>(null); //try this?

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
      backgroundColor: '#FFF', // Background colour behind the map
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

    // IMPLEMENTING INTERACTIVITY FOR NODES HERE
    mapView.addInteractivePolygonsForAllLocations();
    venue.locations.forEach((location) => {
      // An obstruction is something like a desk
      if (location.id.includes('obstruction')) {
        location.polygons.forEach((polygon) => {
          mapView.setPolygonHoverColor(polygon, '#BFBFBF');
        });
      } else {
        location.polygons.forEach((polygon) => {
          mapView.setPolygonHoverColor(polygon, '#F0F0F0');
        });
      }
    });

    mapView.FloatingLabels.labelAllLocations({
      interactive: true, // Make labels interactive
    });

    // IMPLEMENTING NAVIGATION HERE
    const startLocation = venue.locations.find((location) =>
      location.id.includes('footprintcomponent')
    );

    mapView.Camera.focusOn({
      polygons: startLocation?.polygons,
      nodes: startLocation?.nodes,
    });
    const endLocation = venue.locations.find(
      (location) => location.id == 'location-obstruction-ey'
    );

    if (!startLocation || !endLocation) {
      console.log(`startLocation / endLocation not found`);
      return;
    }
    //Get directions between the start and end locations.
    const directions = startLocation.directionsTo(endLocation);
    directionsRef.current = directions;

    //Pass the directions to Journey to draw a path and icons.
    mapView.Journey.draw(directions); //COMMENT OUT

    positionUpdater.current = new PositionUpdater();

    // IMPLEMENTING BLUE DOT HERE

    const coordinate = mapView.currentMap.createCoordinate(
      49.262167877526565,
      -123.24510595416766
    );
    const blueDot = mapView.Markers.add(
      coordinate,
      '<div className="blue-dot"></div>'
    );
    mapView.Markers.animate(blueDot, coordinate);

    //Set the camera state to follow the user's location on the map,
    //marked by a blue dot.
    mapView.setState(STATE.FOLLOW);

    console.log(`bluedot current position`, blueDotPosition.current);
    // positionUpdater.update(blueDotPosition.current);

    // Label all spaces and desks which have a name
    mapView.FloatingLabels.labelAllLocations();
  }, [mapView, venue]);

  // from mappedin nwplpus codesandbox
  // modifying this to try and include blue dot nav update logic
  useMapClick(mapView, (props) => {
    if (!mapView || !venue) {
      return;
    }

    console.log(`tapping is working for blue dot`, newBlueDotPosition);
    positionUpdater.current!.update(newBlueDotPosition); // this raises 'Uncaught TypeError: Cannot read properties of null (reading 'maps')'

    // We can get the clicked geolocation
    console.log(
      `[useMapClick] Clicked at ${props.position.latitude}, ${props.position.longitude}`
    );

    // Interact with clicked markers
    for (const marker of props.markers) {
      console.log(`[useMapClick] Clicked marker ID "${marker.id}"`);
      mapView.Markers.remove(marker.id);
      return;
    }

    // Interact with clicked Floating Labels
    for (const label of props.floatingLabels) {
      console.log(`[useMapClick] Clicked label "${label.text}"`);

      if (label.node) {
        mapView.FloatingLabels.remove(label.node);
      }
      return;
    }

    // Interact with clicked polygons
    for (const polygon of props.polygons) {
      console.log(`[useMapClick] Clicked polygon ID "${polygon.id}"`);

      // Get location details for the clicked polygon
      const location = mapView.getPrimaryLocationForPolygon(polygon);

      // Convert the click information to a coordinate on the map
      const clickedCoordinate = mapView.currentMap.createCoordinate(
        props.position.latitude,
        props.position.longitude
      );

      // And add a new Marker where we clicked
      mapView.Markers.add(
        clickedCoordinate,
        // Provide a HTML template string for the Marker appearance
        `
  <div class="marker-container" style="width:100px;height:100px;border: 2px solid #00FFFF; border-radius: 9999px; overflow: hidden;">
    <img src="${imageUrl}" style="width: 100%; height: 100%;" alt="Marker Image">
  </div>
`,
        {
          interactive: true, // Make markers clickable
          rank: COLLISION_RANKING_TIERS.ALWAYS_VISIBLE, // Marker collision priority
          anchor: MARKER_ANCHOR.TOP, // Position of the Marker
        }
      );
      return;
    }
  });

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
    // positionUpdater.update(newBlueDotPosition);
  };

  const toggleMovementImpairment = () => {
    setIsMovementImpaired(!isMovementImpaired);
  };

  const toggleAudioImpairment = () => {
    setIsAudioImpaired(!isAudioImpaired);
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
            {/* <button
              className='rounded-full bg-red-500 text-white w-12 h-12'
              onClick={() => {
                handleBlueDotMove(blueDotPosition);
              }}
            >
              Simulate Step
            </button> */}
            <button
              className={clsx(
                'rounded-full text-white w-14 h-14 flex items-center justify-center p-3',
                isMovementImpaired ? 'bg-[#D53F8C]' : 'bg-black'
              )}
              onClick={toggleMovementImpairment}
            >
              <WheelChairIcon />
            </button>
            <button
              className={clsx(
                'rounded-full text-white w-14 h-14 flex items-center justify-center mt-4 p-3',
                isAudioImpaired ? 'bg-[#D53F8C]' : 'bg-black'
              )}
              onClick={toggleAudioImpairment}
            >
              <VoicePrintIcon />
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
                <Link href='/homepage'>Exit</Link>
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

function VoicePrintIcon() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='#FFFFFF'>
      <path d='M5 7H7V17H5V7ZM1 10H3V14H1V10ZM9 2H11V20H9V2ZM13 4H15V22H13V4ZM17 7H19V17H17V7ZM21 10H23V14H21V10Z'></path>
    </svg>
  );
}

function WheelChairIcon() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='#FFFFFF'>
      <path d='M7.99837 10.3413L7.99793 12.5352C6.80239 13.2268 5.99805 14.5195 5.99805 16C5.99805 18.2091 7.78891 20 9.99805 20C11.4786 20 12.7712 19.1957 13.4628 18.0001L15.6565 18.0004C14.8327 20.3306 12.6103 22 9.99805 22C6.68434 22 3.99805 19.3137 3.99805 16C3.99805 13.3874 5.66782 11.1649 7.99837 10.3413ZM11.998 17C10.3412 17 8.99805 15.6569 8.99805 14V10C8.99805 8.34315 10.3412 7 11.998 7C13.6549 7 14.998 8.34315 14.998 10V15H16.4319C17.0803 15 17.6849 15.3141 18.0584 15.8362L18.1468 15.971L20.8555 20.4855L19.1406 21.5145L16.4319 17H11.998ZM11.998 2C13.3788 2 14.498 3.11929 14.498 4.5C14.498 5.88071 13.3788 7 11.998 7C10.6173 7 9.49805 5.88071 9.49805 4.5C9.49805 3.11929 10.6173 2 11.998 2Z'></path>
    </svg>
  );
}

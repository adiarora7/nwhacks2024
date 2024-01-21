'use client';
import {
  TGetVenueMakerOptions,
  MARKER_ANCHOR,
  COLLISION_RANKING_TIERS,
  TMapViewOptions,
} from '@mappedin/mappedin-js';
import '@mappedin/mappedin-js/lib/mappedin.css';
import { useEffect, useMemo } from 'react';
import useMapClick from '../hooks/useMapClick';
import useMapView from '../hooks/useMapView';
import useVenueMaker from '../hooks/useVenueMaker';

/* This demo shows you how to configure and render a map. */
export default function BasicExample() {
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

    // Label all spaces and desks which have a name
    mapView.FloatingLabels.labelAllLocations();
  }, [mapView, venue]);

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
          <div className='z-10 flex w-full flex-col max-w-[500px] justify-self-start p-4 mt-4'>
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

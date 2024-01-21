import React from 'react';
import MappedInMap from '../components/Map';

export default function NavigationMap() {
  return (
    <div className='flex w-screen h-screen'>
      <div className='absolute inset-0 z-0 h-full flex'>
        <MappedInMap />
      </div>
    </div>
  );
}

import dynamic from 'next/dynamic';
import React from 'react';

const MapWithNoSSR = dynamic(() => import('../app/components/Map'), {
  ssr: false
});

export default function Home() {
  return (
    <div>
      <h1>Mappedin Integration with Next.js</h1>
      <MapWithNoSSR />
    </div>
  );
}

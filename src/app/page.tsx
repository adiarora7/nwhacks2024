import dynamic from 'next/dynamic';
import React from 'react';
import styles from './page.module.css';

const MapWithNoSSR = dynamic(() => import('../app/components/Map'), {
  ssr: false
});

export default function Home() {
  return (
    <main>
      <h1>Mappedin Integration with Next.js</h1>
      <MapWithNoSSR />
    </main>
  );
}


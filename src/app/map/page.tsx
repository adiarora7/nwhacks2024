import React from 'react';
import dynamic from "next/dynamic";

const MappedInMap = dynamic(() => import('../components/Map'), {
  ssr: false,
});

export default function NavigationMap() {
  return <MappedInMap />;
}

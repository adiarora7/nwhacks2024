import dynamic from 'next/dynamic';
import React from 'react';

const MapWithNoSSR = dynamic(() => import('../app/components/Map'), {
  ssr: false
});

export default function Home() {
  return (
    <main className={styles.main}>
      <p className={styles.tagline}>Accessible indoor maps for all.</p>
      <div className={styles.body}>
        <div className={styles.logo}>
            <img className={styles.img} src="https://imgur.com/0W2V0Ni.png"/>
            <p className={styles.logoText}>mapcessibility</p>
        </div>
        <p className={styles.text}>Create an account</p>
        <button className={styles.button}
          type="submit"
        >
        Sign Up With Google
        </button>
      </div>

      <h1>Mappedin Integration with Next.js</h1>
      <MapWithNoSSR />
    </main>
  );
}


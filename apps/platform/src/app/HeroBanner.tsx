import React from 'react';
import Image from 'next/image';
import styles from './HeroBanner.module.css';

const HeroBanner = () => {
  return (
    <div className={styles.heroBanner}>
      <Image
        src="/muqa_hero.jpg"
        alt="Hero Banner"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
    </div>
  );
};

export default HeroBanner;

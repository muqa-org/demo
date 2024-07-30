'use client';
import Link from 'next/link';

import HeroBanner from './HeroBanner';

export default function Home() {
	return (
		<section>
			<HeroBanner />

			<h3 className='text-2xl text-center mb-8 font-semibold mt-5'>
				Browse Rounds
			</h3>
		</section>
	);
}

function fixSvg(svg: string) {
	return svg.replace(/(width|height)="[^"]*"/g, '$1="100%"');
}

'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import Container from '@/app/components/Container';
import images from '@/app/components/common/Images';

export default function HomepageExampleProject() {
	const t = useTranslations('home');

	return (
		<div className='bg-cover bg-center bg-no-repeat pt-7 leading-normal'>
			<Container className='mx-auto flex flex-col'>
				<h4 className='text-grayDark mb-3 text-center text-base font-normal'>
					{t('exampleProjectSubtitle')}
				</h4>
				<h2 className='mb-5 text-center text-4xl font-normal text-primaryBlack'>
					Blatine - planting trees along Dubrovačka street
				</h2>
				<div className='mx-20 mt-10 grid grid-cols-1 gap-14 p-6 md:grid-cols-3'>
					<div className='col-span-1 rounded'>
						<Image
							width='325'
							height='325'
							alt='Park Sample Image'
							src={images.parkSample}
							className='h-auto w-full rounded-[30px] shadow-md'
						/>
					</div>

					<div className='col-span-1'>
						<Image
							width='325'
							height='325'
							alt='Park Sample Image'
							src={images.mapSample}
							className='h-auto w-full rounded-[30px] shadow-md'
						/>
					</div>

					<div className='col-span-1'>
						<div className='text-grayDark text-left text-base'>
							<p>
								<strong>{t('exampleNeighborhood')}:</strong> Blatine-Škrape and Gripe
							</p>
							<p>
								<strong>{t('exampleStreet')}:</strong> Dubrovnik street
							</p>
							<p>
								<strong>{t('exampleLocationDescription')}:</strong> Below the tunnel, above the hospital
							</p>
							<p className='mt-4'>
								<strong>{t('exampleProjectDescription')}:</strong> Along the street we can plant trees to provide the shade along the wide sidewalks. Where necessary, make holes in asphalt for trees.
							</p>
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
}

'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import images from '@/app/components/common/Images';

export function HomepageExampleProject() {
	const t = useTranslations('home');

	return (
		<div className='bg-cover bg-center bg-no-repeat pt-7 leading-normal'>
			<div className='mx-auto flex flex-col xl:max-w-7xl 2xl:max-w-[1440px]'>
				<h4 className='text-grayDark mb-3 text-center text-base font-normal'>
					{t('exampleProjectSubtitle')}
				</h4>
				<h2 className='mb-5 text-center text-4xl font-normal text-primaryBlack'>
					Blatine - sadnja stabala u Dubrovačkoj ulici
				</h2>
				<div className='mx-20 mt-10 grid grid-cols-1 gap-14 p-6 md:grid-cols-3'>
					<div className='col-span-1'>
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
							width='354'
							height='83'
							alt='Park Sample Image'
							src={images.mapSample}
							className='h-auto w-full rounded-[30px] shadow-md'
						/>
					</div>

					<div className='col-span-1'>
						<div className='text-grayDark text-left text-base'>
							<p>
								<strong>{t('exampleDisctrict')}:</strong> Blatine–Škrape, Gripe
							</p>
							<p>
								<strong>{t('exampleStreet')}:</strong> Dubrovačka ulica
							</p>
							<p>
								<strong>{t('exampleLocationDescription')}:</strong> Ispod
								"tunela" u Dubrovačkoj, povise bolnice.
							</p>
							<p className='mt-4'>
								<strong>{t('exampleProjectDescription')}:</strong> Triba posadit
								stabla koja bi pravila sjen na široke trotoare. Na nekim mistima
								triba prokopat beton i napravit odgovarajuće rupe.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

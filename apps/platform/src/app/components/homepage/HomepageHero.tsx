'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import images from '@/app/components/common/Images';

export function HomepageHero() {
	const t = useTranslations('home');

	return (
		<div
			style={{ backgroundImage: `url("${images.heroGreen}")` }}
			className='bg-cover bg-center bg-no-repeat pb-[35em] pt-44'
		>
			<div className='mx-auto flex flex-col xl:max-w-7xl 2xl:max-w-[1440px]'>
				<Image
					width='354'
					height='83'
					alt='Zazelenimo Split Logo'
					src={images.ZazelenimoLogo}
				/>
				<div className='w-1/3 pt-9 text-[32px] font-normal text-white'>
					{t('heroText')}
				</div>
			</div>
		</div>
	);
}

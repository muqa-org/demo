'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import Container from '@/app/components/Container';
import images from '@/app/components/common/Images';

export default function HomepageHero({ locale }: { locale: string }) {
	const t = useTranslations('home');

	const logo =
		locale === 'hr' ? images.zazelenimoLogohr : images.zazelenimoLogo;

	return (
		<div
			style={{ backgroundImage: `url("${images.heroGreen}")` }}
			className='bg-cover bg-center bg-no-repeat pb-[35em] pt-44'
		>
			<Container className='mx-auto flex flex-col'>
				<Image width='354' height='83' alt='Zazelenimo Split Logo' src={logo} />
				<div className='w-1/3 pt-9 text-[32px] font-normal text-white'>
					{t('heroText')}
				</div>
			</Container>
		</div>
	);
}

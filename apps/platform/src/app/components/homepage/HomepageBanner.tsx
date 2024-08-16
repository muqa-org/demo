'use client';

import { useTranslations } from 'next-intl';

import Container from '@/app/components/Container';
import Banner from '@/app/components//Banner';

export default function HomepageBanner() {
	const t = useTranslations('home');

	return (
		<div className='mx-5 py-8 pb-20 sm:mx-0'>
			<Container className='mx-auto'>
				<Banner
					message={t('bannerMessage')}
					buttonText={t('bannerButtonText')}
				/>
			</Container>
		</div>
	);
}

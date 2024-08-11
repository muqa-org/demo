'use client';

import { useTranslations } from 'next-intl';

import Container from '@/app/components/Container';
import Banner from '@/app/components//Banner';

export default function HomepageBanner() {
	const t = useTranslations('homeAbout');

	return (
		<div className='py-8 pb-20'>
			<Container className='mx-auto text-center'>
				<h2 className='mb-8 text-5xl font-normal text-primaryBlack'>
					{t('title')}
				</h2>
				<div className='mx-auto w-4/6 px-20 text-xl text-grayDark'>
					<p className='mb-6'>{t('firstParagraph')}</p>
					<p>{t('secondParagraph')}</p>
				</div>
			</Container>
		</div>
	);
}

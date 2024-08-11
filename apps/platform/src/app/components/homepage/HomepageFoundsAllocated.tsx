'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

import Container from '@/app/components/Container';

import Images from '@/app/components/common/Images';

export default function HomepageFoundsAllocated() {
	const t = useTranslations('foundsAllocated');

	return (
		<div className='py-16 pb-12'>
			<Container className='mx-auto justify-between'>
				<div className='mb-20 h-[1px] border-2 border-dashed border-borderGray'></div>
				<div className='flex flex-row mx-32'>
					<div className='w-1/3'>
						<Image
							width={394}
							height={240}
							src={Images.contributionMatchedSample}
							alt='Contribution Matched Sample'
						/>
					</div>
					<div className='w-2/3 pl-24'>
						<h1 className='mb-6 text-5xl font-normal text-primaryBlack'>
							{t('title')}
						</h1>
						<div className='text-base text-grayDark'>
							<p className='mb-4'>{t('votingMechanism')}</p>
							<p>{t('allowsAnyone')}</p>
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
}

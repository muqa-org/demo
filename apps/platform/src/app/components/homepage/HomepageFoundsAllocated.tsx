'use client';

import { useTranslations } from 'next-intl';

import Button from '@/app/components/Button';
import Container from '@/app/components/Container';
import HomepageRoundBoxes from '@/app/components/homepage/HomepageRoundBoxes';

export default function HomepageFoundsAllocated() {
	const t = useTranslations('round');

	return (
		<div className='py-16 pb-24'>
			<div className='mb-20 h-[1px] border-2 border-dashed border-borderGray'></div>
			<Container className='mx-auto flex flex-col items-center justify-center'>
				<h1 className='mb-4 text-center text-5xl font-normal text-primaryBlack'>
					{t('timeline')}
				</h1>
				<div className='text-center text-xl font-normal text-gray'>
					August - September 2024
				</div>
				<HomepageRoundBoxes />
				<div className='mt-10'>
					<Button
						buttonType='green'
						handleOnClick={() => {
							return true;
						}}
						className='px-16'
					>
						{t('buttonTitle')}
					</Button>
				</div>
			</Container>
		</div>
	);
}

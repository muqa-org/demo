'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import Container from '@/app/components/Container';

export default function HomepageStats() {
	const t = useTranslations('home');

	return (
		<div className='mt-14 bg-cover bg-center bg-no-repeat pb-16 leading-normal'>
			<Container className='mx-auto flex flex-col'>
				<div className='mb-20 h-[1px] border-2 border-dashed border-borderGray'></div>
				<h2 className='mb-5 text-center text-4xl font-normal text-primaryBlack'>
					{t('stats')}
				</h2>
				<div className='mx-10 mt-10 grid grid-cols-1 gap-[17em] py-6 text-base font-normal text-grayDark md:grid-cols-3'>
					<div className='col-span-1 text-center'>
						<h3 className='mb-6 text-[45px] font-bold text-green'>
							50.000€
						</h3>
						<div>{t('statsBudget')}</div>
					</div>

					<div className='col-span-1 text-center'>
						<h3 className='mb-6 text-[45px] font-bold text-green'>
							25 projects
						</h3>
						<div>{t('statsAccepted')}</div>
						<Link href='/' className='underline hover:text-blue'>
							{t('statsLearn')}
						</Link>
					</div>

					<div className='col-span-1 text-center'>
						<h3 className='mb-6 text-[45px] font-bold text-green'>
							20 days
						</h3>
						<div>{t('statsPeriod')}</div>
					</div>
				</div>
			</Container>
		</div>
	);
}

'use client';

import Container from '@/app/components/Container';

import { useTranslations } from 'next-intl';

export default function HomepageEligibleProjects() {
	const t = useTranslations('EligibleProjects');

	return (
		<div className='pb-20 pt-20 leading-normal'>
			<Container className='mx-auto flex flex-col px-72'>
				<h2 className='mb-12 text-center text-4xl font-semibold'>
					{t('title')}
				</h2>

				<div className='grid grid-cols-1 gap-20 md:grid-cols-2'>
					<div className='text-xl text-gray'>
						<h3 className='mb-4 text-xl font-bold uppercase text-primaryBlack'>
							{t('public')}
						</h3>
						<ul className='space-y-2'>
							<li className='flex items-center'>
								<span className='text-red-500'>🚫</span>
								<span className='ml-2'>{t('publicPrivate')}</span>
							</li>
							<li className='flex items-center'>
								<span className='text-green-500'>✅</span>
								<span className='ml-2'>{t('publicStreet')}</span>
							</li>
						</ul>
					</div>

					<div className='pl-20 text-xl text-gray'>
						<h3 className='mb-4 text-xl font-bold uppercase text-primaryBlack'>
							{t('can')}
						</h3>
						<ul className='space-y-2'>
							<li className='flex items-center'>
								<span className='text-red-500'>🚫</span>
								<span className='ml-2'>{t('canHuge')}</span>
							</li>
							<li className='flex items-center'>
								<span className='text-green-500'>✅</span>
								<span className='ml-2'>{t('canSmall')}</span>
							</li>
						</ul>
					</div>

					<div className='text-xl text-gray'>
						<h3 className='mb-4 text-xl font-bold uppercase text-primaryBlack'>
							{t('conflicting')}
						</h3>
						<ul className='space-y-2'>
							<li className='flex items-center'>
								<span className='text-red-500'>🚫</span>
								<span className='ml-2'>{t('conflictingMiddle')}</span>
							</li>
							<li className='flex items-center'>
								<span className='text-green-500'>✅</span>
								<span className='ml-2'>{t('conflictingGreeen')}</span>
							</li>
						</ul>
					</div>

					<div className='pl-20 text-xl text-gray'>
						<h3 className='mb-4 text-xl font-bold uppercase text-primaryBlack'>
							{t('contains')}
						</h3>
						<ul className='flex flex-row flex-wrap space-y-2'>
							<li className='flex w-1/2 items-center'>
								<span className='text-green-500'>✅</span>
								<span className='ml-2'>{t('containsTrees')}</span>
							</li>
							<li className='flex w-1/2 items-center'>
								<span className='text-green-500'>✅</span>
								<span className='ml-2'>{t('containsBushes')}</span>
							</li>
							<li className='flex w-1/2 items-center'>
								<span className='text-green-500'>✅</span>
								<span className='ml-2'>{t('containsGrass')}</span>
							</li>
							<li className='flex w-1/2 items-center'>
								<span className='text-green-500'>✅</span>
								<span className='ml-2'>{t('containsFlowers')}</span>
							</li>
							<li className='flex w-1/2 items-center'>
								<span className='text-green-500'>✅</span>
								<span className='ml-2'>{t('containsBenches')}</span>
							</li>
							<li className='flex w-1/2 items-center'>
								<span className='text-green-500'>✅</span>
								<span className='ml-2'>{t('containsTaps')}</span>
							</li>
							<li className='flex w-1/2 items-center'>
								<span className='text-green-500'>✅</span>
								<span className='ml-2'>{t('containsCleanup')}</span>
							</li>
							<li className='flex w-1/2 items-center'>
								<span className='text-green-500'>✅</span>
								<span className='ml-2'>{t('containsDesign')}</span>
							</li>
						</ul>
					</div>
				</div>
			</Container>
		</div>
	);
}

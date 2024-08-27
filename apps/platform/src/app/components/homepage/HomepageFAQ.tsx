'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import Container from '@/app/components/Container';

export default function HomepageFAQ() {
	const t = useTranslations('faq');

	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggle = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	const faqs = [
		{
			question: t('voting'),
			answer: t('votingAnswer'),
		},
		{
			question: t('city'),
			answer: t('cityAnswer'),
		},
		{
			question: t('vote'),
			answer: t('voteAnswer'),
		},
		{
			question: t('canVote'),
			answer: t('canVoteAnswer'),
		},
		{
			question: t('decide'),
			answer: t('decideAnswer'),
		},
		{
			question: t('should'),
			answer: t('shouldAnswer'),
		},
	];

	return (
		<div id="faq" className='py-16 pb-4'>
			<Container className='mx-auto justify-between'>
				<div className='mx-5 mb-20 h-[1px] border-2 border-dashed border-borderGray sm:mx-5 lg:mx-0'></div>
				<div className='py-10 mx-5 sm:mx-16 xl:mx-56'>
					<h2 className='mb-16 text-center text-4xl font-normal'>
						{t('title')}
					</h2>

					{faqs.map((faq, index) => (
						<div key={index} className='mb-10'>
							<button
								onClick={() => toggle(index)}
								className='mb-6 flex w-full items-center text-left text-xl font-bold uppercase focus:outline-none'
							>
								{faq.question}{' '}
								<span className='ml-1 inline-block'>
									{openIndex === index ? '▲' : '▼'}
								</span>
							</button>
							{openIndex === index && (
								<div className='mt-2'>
									<p className='text-base text-grayDark'>{faq.answer}</p>
								</div>
							)}
						</div>
					))}
				</div>
			</Container>
		</div>
	);
}

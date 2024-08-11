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
		<div className='py-16 pb-24'>
			<Container className='mx-auto justify-between'>
				<div className='mb-20 h-[1px] border-2 border-dashed border-borderGray'></div>
				<div className='mx-56 py-10'>
					<h2 className='mb-16 text-center text-4xl font-normal'>
						{t('title')}
					</h2>

					{faqs.map((faq, index) => (
						<div key={index} className='mb-10'>
							<button
								onClick={() => toggle(index)}
								className='mb-6 flex w-full items-center uppercase text-left text-xl font-bold focus:outline-none'
							>
								{faq.question} <span className='inline-block ml-1'>{openIndex === index ? '▲' : '▼'}</span>
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

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
			question: t('zazelenimo'),
			answer: t('zazelenimoAnswer1'),
			answer2: t('zazelenimoAnswer2'),
		},
		{
			question: t('participatory'),
			answer: t('participatoryAnswer1'),
			answer2: t('participatoryAnswer2'),
		},
		{
			question: t('ethereum'),
			answer: t('ethereumAnswer'),
		},
		{
			question: t('quadratic'),
			answer: t('quadraticAnswer'),
		},
		{
			question: t('participate'),
			answer: t('participateAnswer'),
		},
		{
			question: t('participateZazelenimo'),
			answer: t('participateZazelenimoAnswer'),
			list1: t.rich('participateZazelenimoList1', {
				strong: chunks => <strong>{chunks}</strong>,
				link: chunks => (
					<a
						href='https://docs.zazelenimo.com/osnove/obrazac-za-prijedloge'
						target='_blank'
						className='underline hover:text-blue'
					>
						{chunks}
					</a>
				),
			}),
			list2: t.rich('participateZazelenimoList2', {
				strong: chunks => <strong>{chunks}</strong>,
				link1: chunks => (
					<a
						href='https://forum.zazelenimo.com/'
						target='_blank'
						className='underline hover:text-blue'
					>
						{chunks}
					</a>
				),
				link2: chunks => (
					<a
						href='https://forum.zazelenimo.com/c/projekti/8'
						target='_blank'
						className='underline hover:text-blue'
					>
						{chunks}
					</a>
				),
				link3: chunks => (
					<a
						href='https://docs.zazelenimo.com/najcesca-pitanja/rasprava'
						target='_blank'
						className='underline hover:text-blue'
					>
						{chunks}
					</a>
				),
			}),
			list3: t.rich('participateZazelenimoList3', {
				strong: chunks => <strong>{chunks}</strong>,
				link1: chunks => (
					<a
						href='https://zazelenimo.hr/'
						target='_blank'
						className='underline hover:text-blue'
					>
						{chunks}
					</a>
				),
				link2: chunks => (
					<a
						href='https://docs.zazelenimo.com/najcesca-pitanja/glasovanje'
						target='_blank'
						className='underline hover:text-blue'
					>
						{chunks}
					</a>
				),
			}),
			list4: t.rich('participateZazelenimoList4', {
				strong: chunks => <strong>{chunks}</strong>,
				link1: chunks => (
					<a
						href='https://forum.zazelenimo.com/'
						target='_blank'
						className='underline hover:text-blue'
					>
						{chunks}
					</a>
				),
				link2: chunks => (
					<a
						href='https://forum.zazelenimo.com/c/upravljanje/11'
						target='_blank'
						className='underline hover:text-blue'
					>
						{chunks}
					</a>
				),
				link3: chunks => (
					<a
						href='https://docs.zazelenimo.com/najcesca-pitanja/upravljanje'
						target='_blank'
						className='underline hover:text-blue'
					>
						{chunks}
					</a>
				),
			}),
		},
		{
			question: t('participateNeed'),
			answer: t('participateNeedAnswer'),
		},
		{
			question: t('cost'),
			answer: t('costAnswer'),
		},
		{
			question: t('observe'),
			answer: t('observeAnswer'),
		},
	];

	return (
		<div id='faq' className='py-16 pb-4'>
			<Container className='mx-auto justify-between'>
				<div className='mx-5 mb-20 h-[1px] border-2 border-dashed border-borderGray sm:mx-5 lg:mx-0'></div>
				<div className='mx-5 py-10 sm:mx-16 xl:mx-56'>
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
									{faq.answer2 && (
										<p className='pt-4 text-base text-grayDark'>
											{faq.answer2}
										</p>
									)}
									{faq.list1 && (
										<ul className='list-disc pl-6 pt-6'>
											<li>{faq.list1}</li>
											<li>{faq.list2}</li>
											<li>{faq.list3}</li>
											<li>{faq.list4}</li>
										</ul>
									)}
								</div>
							)}
						</div>
					))}
				</div>
			</Container>
		</div>
	);
}

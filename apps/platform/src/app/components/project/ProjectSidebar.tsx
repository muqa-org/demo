'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { getProjectProgressBGColor } from '@/app/helpers/projectHelper';

import AddToCart from '@/app/components/cart/AddToCart';

export default function ProjectSidebar() {
	let progressColor = getProjectProgressBGColor(68);
	const t = useTranslations('project');

	const [donationAmount, setDonationAmount] = useState(10);

	// You can adjust this
	const estimatedMatch = donationAmount * 28.6;

	const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDonationAmount(Number(e.target.value));
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/[^0-9]/g, '');
		if (value === '') {
			setDonationAmount(0);
		} else {
			setDonationAmount(parseInt(value, 10));
		}
	};

	return (
		<>
			<div className='mb-4 hidden h-2 w-full rounded-full bg-[#E2E2E2] lg:block'>
				<div
					className={`h-full rounded-full ${progressColor}`}
					style={{ width: `${68}%` }}
				></div>
			</div>
			<h2 className='mt-3 text-[32px] text-[#09CE78]'>€ 1,474</h2>
			<h4 className='leading-normal text-gray'>
				{t('funded', { amount: '2,000' })}
			</h4>
			<h3 className='mt-8 text-[32px] leading-normal text-[#3F3F3F]'>67</h3>
			<h4 className='leading-normal text-gray'>{t('bakers')}</h4>
			<h3 className='mt-8 text-[32px] leading-normal text-[#3F3F3F]'>34</h3>
			<h4 className='leading-normal text-gray'>{t('daysGo')}</h4>

			<div className='mt-8 border-t border-borderGray pt-8'>
				<div className='mb-6 flex flex-row items-center justify-between'>
					<label htmlFor='donation-slider' className='text-xs text-black'>
						{t('donationAmount')}
					</label>
					<input
						type='range'
						id='donation-slider'
						min='0'
						max='100'
						value={donationAmount}
						onChange={handleSliderChange}
						className='h-2 w-2/6 appearance-none'
						style={{
							background: `linear-gradient(to right, #39A56A ${donationAmount}%, black ${donationAmount}%)`,
						}}
					/>
					<input
						type='text'
						id='donation-amount'
						value={`${donationAmount} €`}
						onChange={handleInputChange}
						className='w-20 rounded-md border border-borderGray px-2 py-2 text-left text-sm text-black focus:outline-none'
					/>
				</div>

				<div className='mb-6 flex items-center justify-between'>
					<label className='text-xs text-black'>{t('estimatedMatch')}</label>
					<input
						type='text'
						value={`${estimatedMatch.toFixed(2)} €`}
						readOnly
						className='w-20 rounded-md border border-borderGray px-2 py-2 text-left text-sm text-grayLight focus:outline-none'
					/>
				</div>
				<AddToCart variant='text' />
			</div>
		</>
	);
}

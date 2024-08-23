'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { CartItemType } from '@/app/types/cart';
import icons from '@/app/components/common/Icons';

import { getProjectProgressBGColor } from '@/app/helpers/projectHelper';

export default function CartProjectCard({ item }: { item: CartItemType }) {
	const t = useTranslations('cart');
	const [donationAmount, setDonationAmount] = useState(item.amount);

	let progressColor = getProjectProgressBGColor(item.funded);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/[^0-9]/g, '');
		if (value === '') {
			setDonationAmount(0);
		} else {
			setDonationAmount(parseInt(value, 10));
		}
	};

	return (
		<div
			key={item.id}
			className='mb-2 flex flex-row flex-wrap items-center lg:rounded-lg lg:border lg:border-borderGrayLight lg:bg-white lg:p-4'
		>
			<Image
				width={150}
				height={95}
				src={item.image}
				alt={item.name}
				className='w-full rounded-t-md lg:w-1/6 lg:rounded-md'
			/>
			<div className='w-full lg:w-4/6 lg:flex-grow lg:pl-6'>
				<div className='mb-4 h-2 w-full rounded-b bg-[#E2E2E2] lg:w-2/6 lg:rounded lg:mt-2'>
					<div
						className={`h-full rounded-b lg:rounded ${progressColor}`}
						style={{ width: `${item.funded}%` }}
					></div>
				</div>
				<h3 className='flex justify-between text-xl font-medium text-primaryBlack'>
					{item.name}
					<button className='inline-block lg:hidden'>
						<Image
							src={icons.trashIcon}
							alt='Trash icon'
							width={20}
							height={20}
							className='ml-4'
						/>
					</button>
				</h3>
				<p className='text-base text-gray'>
					{item.funded}% {t('funded')} ({item.amount} €)
				</p>
			</div>
			<div className='mb-10 mt-7 flex items-center lg:mb-0 lg:mt-0'>
				<input
					type='text'
					value={`${donationAmount} €`}
					onChange={handleInputChange}
					className='w-20 rounded-md border border-borderGray px-2 py-2 text-left text-sm text-black focus:outline-none'
				/>
				<button className='lg:inline-blockblock hidden'>
					<Image
						src={icons.trashIcon}
						alt='Trash icon'
						width={20}
						height={20}
						className='ml-4'
					/>
				</button>
			</div>
		</div>
	);
}

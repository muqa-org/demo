import React from 'react';
import AddToCart from '@/app/components/cart/AddToCart';
import { getProjectProgressBGColor } from '@/app/helpers/projectHelper';

export default function ProjectMapInfoWindow({
	title,
	progressPercentage,
	fundedAmount,
}: {
	title: string;
	progressPercentage: number;
	fundedAmount: number;
}) {
	let progressColor = getProjectProgressBGColor(progressPercentage);

	return (
		<div className='rounded-lg bg-white p-0 shadow-lg'>
			<div className='mb-4 h-1.5 w-full rounded-full bg-gray'>
				<div
					className={`h-full rounded-full ${progressColor}`}
					style={{ width: `${progressPercentage}%` }}
				></div>
			</div>
			<div className='flex items-center justify-between'>
				<h3 className='text-xl font-medium text-primaryBlack'>{title}</h3>
				<div className='ml-4'>
					<AddToCart variant='icon' />
				</div>
			</div>
			<p className='text-base text-gray'>
				{progressPercentage}% funded ({fundedAmount} €)
			</p>
		</div>
	);
}

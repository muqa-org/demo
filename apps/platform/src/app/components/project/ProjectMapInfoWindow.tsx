import React from 'react';
import AddToCart from '@/app/components/cart/AddToCart';

export default function ProjectMapInfoWindow({
	title,
	progressPercentage,
	fundedAmount,
}: {
	title: string;
	progressPercentage: number;
	fundedAmount: number;
}) {
	let progressColor = 'bg-green';
	if (progressPercentage > 0 && progressPercentage <= 33) {
		progressColor = 'bg-[#C9767B]';
	} else if (progressPercentage > 33 && progressPercentage <= 66) {
		progressColor = 'bg-[#E2CB55]';
	} else if (progressPercentage > 66 && progressPercentage <= 100) {
		progressColor = 'bg-green';
	}

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

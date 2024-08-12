import { Share_Tech_Mono } from 'next/font/google';
import { useEffect, useState } from 'react';

import { RoundData } from '@/app/types/round';

const shareTechMono = Share_Tech_Mono({ weight: '400', subsets: ['latin'] });

interface TimeLeft {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

export default function ProjectsSidebarFinish({ round }: { round: RoundData }) {
	const calculateTimeLeft = (): TimeLeft => {
		const difference = +new Date(round.endDate) - +new Date();
		let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

		if (difference > 0) {
			timeLeft = {
				days: Math.floor(difference / (1000 * 60 * 60 * 24)),
				hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((difference / 1000 / 60) % 60),
				seconds: Math.floor((difference / 1000) % 60),
			};
		}

		return timeLeft;
	};

	const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
	const [mounted, setMounted] = useState(false); // This is used because Next.js does server-side rendering, so we need to wait for the component to be mounted before setting the state. Hydration will happen on the client-side.

	useEffect(() => {
		setMounted(true);
		const timer = setTimeout(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);

		return () => clearTimeout(timer);
	}, [timeLeft]);

	if (!mounted) {
		return null;
	}

	return (
		<div className='mt-4 flex flex-col items-center space-y-2 border-t border-borderGray pt-5'>
			<div className='w-full text-left text-base text-gray'>
				DONIRANJE ZAVRŠAVA
			</div>
			<div className='flex w-full space-x-4'>
				<div className='flex flex-col items-center'>
					<div className='text-2xl font-extrabold'>{timeLeft.days}</div>
					<div className='text-[10px] font-medium text-gray'>DANA</div>
				</div>
				<div className='flex flex-col items-center'>
					<div className='text-2xl font-extrabold'>{timeLeft.hours}</div>
					<div className='text-[10px] font-medium text-gray'>SATI</div>
				</div>
				<div className='flex flex-col items-center'>
					<div className='text-2xl font-extrabold'>{timeLeft.minutes}</div>
					<div className='text-[10px] font-medium text-gray'>MINUTA</div>
				</div>
				<div className='flex flex-col items-center'>
					<div className='text-2xl font-extrabold'>{timeLeft.seconds}</div>
					<div className='text-[10px] font-medium text-gray'>SEKUNDI</div>
				</div>
			</div>
		</div>
	);
}

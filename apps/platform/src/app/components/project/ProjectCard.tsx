import Image from 'next/image';
import Link from 'next/link';

import AddToCart from '@/app/components/cart/AddToCart';
import { getProjectProgressBGColor } from '@/app/helpers/projectHelper';

interface ProjectCardProps {
	className?: string;
	progress: number;
}

export default function ProjectCard({
	className,
	progress,
}: ProjectCardProps) {
	let progressColor = getProjectProgressBGColor(progress);

	return (
		<div className={`${className} flex h-full flex-col gap-1 overflow-hidden`}>
			<div className='relative mb-2'>
				<Image
					width='330'
					height='135'
					src='https://picsum.photos/315/200'
					alt='Project Image'
					className='w-full rounded-t-md'
				/>
				<div className='h-1.5 rounded-b-md bg-white'>
					<div
						className={`h-1.5 rounded-b-md ${progressColor}`}
						style={{ width: progress + '%' }}
					></div>
				</div>
			</div>
			<div className='px-0 pb-1 pt-2'>
				<h3 className='flex items-center justify-between gap-1'>
					<Link
						href='/3/projects/3/'
						className='text-xl font-medium leading-normal text-primaryBlack hover:text-green'
					>
						Klupe od Đardina do Jokera
					</Link>
					<AddToCart variant='icon' />
				</h3>
			</div>
			<div className='text-base text-gray'>
				{progress}% funded (2000 €)
			</div>
		</div>
	);
}

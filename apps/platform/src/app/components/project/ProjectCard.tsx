import Image from 'next/image';
import Link from 'next/link';

import AddToCart from '@/app/components/cart/AddToCart';

interface ProjectCardProps {
	className?: string;
}

export default function ProjectCard({ className }: ProjectCardProps) {
	return (
		<div
			className={`${className} flex h-full flex-col justify-between rounded-xl border border-lightGray shadow-[0_8px_18px_rgba(0,0,0,0.08),0_0px_1px_rgba(0,0,0,0.05)]`}
		>
			<div className='relative'>
				<Image
					width='330'
					height='135'
					src='https://picsum.photos/330/135?grayscale'
					alt='Project Image'
					className='w-full rounded-t-xl'
				/>
				<div className='absolute -bottom-[32px] left-6 top-auto h-[62px] w-[62px] overflow-hidden rounded-full border border-lightGray bg-white shadow-[0_8px_18px_rgba(0,0,0,0.08),0_0px_1px_rgba(0,0,0,0.05)]'>
					<Image
						width='60'
						height='60'
						src='https://picsum.photos/60/60?grayscale'
						alt='Project Image Badge'
						className='border-white rounded-full border'
					/>
				</div>
			</div>
			<div className='px-[18px] pb-6 pt-[46px]'>
				<h3 className='mb-1 text-base font-medium leading-normal text-primaryBlack'>
					<Link href='/3/projects/3/'>NAZIV PROJEKTA</Link>
				</h3>
				<div className='mb-3 text-sm font-normal leading-normal text-gray'>
					Lorem ipsum dolor sit amet consectetur. Eu nam libero arcu ipsum
					varius commodo libero cursus orci.
				</div>
				<div>
					<Link
						href='/'
						className='border-lightBlue mr-1 rounded border px-2 py-1 text-[10px] font-normal leading-normal text-blue'
					>
						Ethereum Infrastructure
					</Link>
					<Link
						href='/'
						className='border-lightBlue mr-1 rounded border px-2 py-1 text-[10px] font-normal leading-normal text-blue'
					>
						Web3 Community & Education
					</Link>
				</div>
				<div className='mt-12 text-right'>
					<AddToCart />
				</div>
			</div>
		</div>
	);
}

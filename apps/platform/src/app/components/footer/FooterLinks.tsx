import Image from 'next/image';
import Link from 'next/link';

export function FooterLinks() {
	return (
		<div className='flex items-center gap-10'>
			<Link
				href='/'
				className='flex items-center gap-2 font-medium leading-6 text-primary hover:text-blue'
			>
				Documentation
				<Image
					width='20'
					height='20'
					alt='Top Right Arrow'
					src={`/images/icons/icon-top-right-arrow.svg`}
				/>
			</Link>
			<Link
				href='/'
				className='flex items-center gap-2 font-medium leading-6 text-primary hover:text-blue'
			>
				About Quadratic Funding
				<Image
					width='18'
					height='18'
					alt='Top Right Arrow'
					src={`/images/icons/icon-top-right-arrow.svg`}
				/>
			</Link>
		</div>
	);
}

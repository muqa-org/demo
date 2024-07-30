import Image from 'next/image';
import Link from 'next/link';

export function FooterLinks() {
	return (
		<div className='items-center flex gap-10'>
			<Link href='/' className='flex items-center gap-2 font-medium text-primary leading-6 hover:text-blue'>
				Documentation
				<Image
					width='20'
					height='20'
					alt='Top Right Arrow'
					src={`/images/icons/icon-top-right-arrow.svg`}
				/>
			</Link>
			<Link href='/' className='flex items-center gap-2 font-medium text-primary leading-6 hover:text-blue'>
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

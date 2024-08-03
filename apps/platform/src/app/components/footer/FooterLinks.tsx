import Image from 'next/image';
import Link from 'next/link';

import icons from '../common/Icons';

export function FooterLinks() {
	return (
		<div className='flex items-center gap-10'>
			<Link
				href='/'
				className='flex items-center gap-2 font-medium leading-6 text-primaryBlack hover:text-blue'
			>
				Documentation
				<Image
					width='20'
					height='20'
					alt='Top Right Arrow'
					src={icons.topRightArrowIcon}
				/>
			</Link>
			<Link
				href='/'
				className='flex items-center gap-2 font-medium leading-6 text-primaryBlack hover:text-blue'
			>
				About Quadratic Funding
				<Image
					width='18'
					height='18'
					alt='Top Right Arrow'
					src={icons.topRightArrowIcon}
				/>
			</Link>
		</div>
	);
}

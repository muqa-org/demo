'use client';

// import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { MuqaConnectButton } from '@/app/components/MuqaConnectButton';
// import Images from '@/app/components/common/Images';
import Container from '@/app/components/Container';

export default function Header() {
	const t = useTranslations('navigation');

	return (
		<header className='border-b border-borderGray'>
			<Container className='mx-auto flex items-center justify-between px-5 py-5'>
				{/* <Link href='/'>
					<Image width='44' height='44' alt='MUQA logo' src={Images.MUQALogo} />
				</Link> */}

				<nav className='flex gap-8'>
					<Link
						href={'/'}
						className='border-b border-lightBlue px-1 pb-1 text-sm font-medium uppercase leading-6 text-primaryBlack hover:text-blue'
					>
						{t('home')}
					</Link>
					<Link
						href={'/projects'}
						className='border-b border-white text-sm font-medium uppercase leading-6 text-primaryBlack hover:text-blue'
					>
						{t('projects')}
					</Link>
					<Link
						href={'/admin/rounds/create'}
						className='border-b border-white text-sm font-medium uppercase leading-6 text-primaryBlack hover:text-blue'
					>
						{t('myContribution')}
					</Link>
					<Link
						href={'/11155111/projects/create'}
						className='border-b border-white text-sm font-medium uppercase leading-6 text-primaryBlack hover:text-blue'
					>
						{t('results')}
					</Link>
				</nav>

				<div className='ml-auto'>
					<MuqaConnectButton  variant='blue' />
				</div>
			</Container>
		</header>
	);
}

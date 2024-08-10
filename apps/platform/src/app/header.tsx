'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { MuqaConnectButton } from './components/MuqaConnectButton';
import Images from './components/common/Images';

export default function Header() {
	const t = useTranslations('navigation');

	return (
		<header className='border-b border-borderGray'>
			<div className='mx-auto flex items-center justify-between px-5 py-5 xl:max-w-7xl xl:px-0 2xl:max-w-[1440px] 2xl:px-0'>
				{/* <Link href='/'>
					<Image width='44' height='44' alt='MUQA logo' src={Images.MUQALogo} />
				</Link> */}

				<nav className='ml-24 flex gap-8'>
					<Link
						href={'/'}
						className='border-b border-lightBlue px-1 pb-1 text-sm font-medium uppercase leading-6 text-primaryBlack hover:text-blue'
					>
						{t('home')}
					</Link>
					<Link
						href={'/projects'}
						className='border-white border-b text-sm font-medium uppercase leading-6 text-primaryBlack hover:text-blue'
					>
						{t('projects')}
					</Link>
					<Link
						href={'/admin/rounds/create'}
						className='border-white border-b text-sm font-medium uppercase leading-6 text-primaryBlack hover:text-blue'
					>
						{t('myContribution')}
					</Link>
					<Link
						href={'/11155111/projects/create'}
						className='border-white border-b text-sm font-medium uppercase leading-6 text-primaryBlack hover:text-blue'
					>
						{t('results')}
					</Link>
				</nav>

				<div className='ml-auto'>
					<MuqaConnectButton  variant='blue' />
				</div>
			</div>
		</header>
	);
}

'use client';

import Image from 'next/image';
import Link from 'next/link';

import Images from './components/common/Images';
import { MuqaConnectButton } from './components/MuqaConnectButton';

export function Header() {
	return (
		<header className='border-color-borderGray border-b'>
			<div className='mx-auto flex items-center justify-between px-5 py-5 xl:max-w-7xl xl:px-0 2xl:max-w-7xl 2xl:px-0'>
				<Link href='/'>
					<Image width='44' height='44' alt='MUQA logo' src={Images.MUQALogo} />
				</Link>

				<nav className='ml-24 flex gap-8'>
					<Link
						href={'/admin/rounds'}
						className='text-sm font-medium uppercase leading-6 text-primaryBlack hover:text-blue'
					>
						Projekti
					</Link>
					<Link
						href={'/admin/rounds/create'}
						className='text-sm font-medium uppercase leading-6 text-primaryBlack hover:text-blue'
					>
						Create Round
					</Link>
					<Link
						href={'/11155111/projects/create'}
						className='text-sm font-medium uppercase leading-6 text-primaryBlack hover:text-blue'
					>
						Create Project
					</Link>
				</nav>

				<div className='ml-auto'>
					<MuqaConnectButton  variant='blue' />
				</div>
			</div>
		</header>
	);
}

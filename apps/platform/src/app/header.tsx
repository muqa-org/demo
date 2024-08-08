'use client';

import { ComethButton } from '@allo/kit';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from './components/Button';
import Images from './components/common/Images';

export default function Header() {
	return (
		<header className='border-borderGray border-b'>
			<div className='mx-auto flex items-center justify-between px-5 py-5 xl:max-w-7xl xl:px-0 2xl:max-w-[1440px] 2xl:px-0'>
				<Link href='/'>
					<Image width='44' height='44' alt='MUQA logo' src={Images.MUQALogo} />
				</Link>

				<nav className='ml-24 flex gap-8'>
					<Link
						href={'/projects'}
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
					<Button
						buttonType='blue'
						handleOnClick={() => {
							return true;
						}}
					>
						Prijavi se
					</Button>
					<ComethButton />
				</div>
			</div>
		</header>
	);
}

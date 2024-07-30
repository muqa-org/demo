'use client';

import { ComethButton } from '@allo/kit';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from './components/Button';

export function Header() {
	return (
		<header className='border-color-borderGray border-b'>
			<div className='mx-auto flex max-w-7xl items-center justify-between py-5'>
				<Link href='/'>
					<Image
						width='44'
						height='44'
						alt='MUQA logo'
						src={`/images/logo/logo-muqa.svg`}
					/>
				</Link>

				<nav className='ml-24 flex gap-8'>
					<Link
						href={'/admin/rounds'}
						className='text-sm font-medium uppercase leading-6 text-primary hover:text-blue'
					>
						Projekti
					</Link>
					<Link
						href={'/admin/rounds/create'}
						className='text-sm font-medium uppercase leading-6 text-primary hover:text-blue'
					>
						Create Round
					</Link>
					<Link
						href={'/11155111/projects/create'}
						className='text-sm font-medium uppercase leading-6 text-primary hover:text-blue'
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

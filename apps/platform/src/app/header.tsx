import { ComethButton } from '@allo/kit';
import Image from 'next/image';
import Link from 'next/link';

export function Header() {
	return (
		<header className='border-b border-color-borderGray'>
			<div className='py-5 max-w-7xl mx-auto flex items-center justify-between'>
				<Link href='/'>
					<Image
						width='44'
						height='44'
						alt='MUQA logo'
						src={`/images/logo/logo-muqa.svg`}
					/>
				</Link>

				<nav className='flex gap-8 ml-24'>
					<Link
						href={'/admin/rounds'}
						className='text-primary font-medium text-sm uppercase leading-6 hover:text-blue'
					>
						Projekti
					</Link>
					<Link
						href={'/admin/rounds/create'}
						className='text-primary font-medium text-sm uppercase leading-6 hover:text-blue'
					>
						Create Round
					</Link>
					<Link
						href={'/11155111/projects/create'}
						className='text-primary font-medium text-sm uppercase leading-6 hover:text-blue'
					>
						Create Project
					</Link>
				</nav>

				<div className='ml-auto'>
					<ComethButton className='flex items-center px-5 py-2 bg-blue rounded-lg font-normal text-base leading-6 text-white' />
				</div>
			</div>
		</header>
	);
}

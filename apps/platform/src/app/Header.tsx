'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import Container from '@/app/components/Container';
import { usePathname } from 'next/navigation';

import { CodaFormProjectLink } from '@/app/config/config';

export default function Header() {
	const t = useTranslations('navigation');
	const pathname = usePathname();

	return (
		<header className='border-b border-borderGray'>
			<Container className='mx-auto flex items-center justify-between px-5 py-5'>
				<nav className='flex gap-8'>
					<Link
						href='/'
						className={`border-b px-1 pb-1 text-sm font-medium uppercase leading-6 hover:text-blue ${
							pathname === '/'
								? 'border-lightBlue text-primaryBlack'
								: 'border-white text-primaryBlack'
						}`}
					>
						{t('home')}
					</Link>
					<Link
						href='/projects'
						className={`border-b text-sm font-medium uppercase leading-6 hover:text-blue ${
							pathname === '/projects'
								? 'border-lightBlue text-primaryBlack'
								: 'border-white text-primaryBlack'
						}`}
					>
						{t('projects')}
					</Link>
					<Link
						href='/admin/rounds/create'
						className={`border-b text-sm font-medium uppercase leading-6 hover:text-blue ${
							pathname === '/admin/rounds/create'
								? 'border-lightBlue text-primaryBlack'
								: 'border-white text-primaryBlack'
						}`}
					>
						{t('myContribution')}
					</Link>
					<Link
						href='/11155111/projects/create'
						className={`border-b text-sm font-medium uppercase leading-6 hover:text-blue ${
							pathname === '/11155111/projects/create'
								? 'border-lightBlue text-primaryBlack'
								: 'border-white text-primaryBlack'
						}`}
					>
						{t('results')}
					</Link>
				</nav>

				<div className='ml-auto'>
					<Link
						href={CodaFormProjectLink}
						target='_blank'
						className='rounded-xl bg-green px-10 py-3 text-base font-normal text-white hover:opacity-85'
					>
						{t('propose')}
					</Link>
				</div>
			</Container>
		</header>
	);
}

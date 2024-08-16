'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

export default function Navigation({
	navClassName,
	linkClassName,
}: {
	navClassName?: string;
	linkClassName?: string;
}) {
	const t = useTranslations('navigation');
	const pathname = usePathname();

	return (
		<nav className={`${navClassName} flex gap-8`}>
			<Link
				href={'/'}
				className={`${linkClassName} border-b border-lightBlue px-1 pb-1 text-sm font-medium uppercase leading-6 text-primaryBlack hover:text-blue ${
					pathname === '/'
						? 'border-lightBlue text-primaryBlack'
						: 'border-white text-primaryBlack'
				}`}
			>
				{t('home')}
			</Link>
			<Link
				href={'/projects'}
				className={`${linkClassName} border-b border-lightBlue px-1 pb-1 text-sm font-medium uppercase leading-6 text-primaryBlack hover:text-blue ${
					pathname === '/projects'
						? 'border-lightBlue text-primaryBlack'
						: 'border-white text-primaryBlack'
				}`}
			>
				{t('projects')}
			</Link>
			<Link
				href={'/admin/rounds/create'}
				className={`${linkClassName} border-b border-lightBlue px-1 pb-1 text-sm font-medium uppercase leading-6 text-primaryBlack hover:text-blue ${
					pathname === '/admin/rounds/create'
						? 'border-lightBlue text-primaryBlack'
						: 'border-white text-primaryBlack'
				}`}
			>
				{t('myContribution')}
			</Link>
			<Link
				href={'/11155111/projects/create'}
				className={`${linkClassName} border-b border-lightBlue px-1 pb-1 text-sm font-medium uppercase leading-6 text-primaryBlack hover:text-blue ${
					pathname === '/11155111/projects/create'
						? 'border-lightBlue text-primaryBlack'
						: 'border-white text-primaryBlack'
				}`}
			>
				{t('results')}
			</Link>
		</nav>
	);
}

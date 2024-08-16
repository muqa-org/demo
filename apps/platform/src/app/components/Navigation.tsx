'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Navigation({
	navClassName,
	linkClassName,
}: {
	navClassName?: string;
	linkClassName?: string;
}) {
	const t = useTranslations('navigation');

	return (
		<nav className={`${navClassName} flex gap-8`}>
			<Link
				href={'/'}
				className={`${linkClassName} border-b border-lightBlue px-1 pb-1 text-sm font-medium uppercase leading-6 text-primaryBlack hover:text-blue`}
			>
				{t('home')}
			</Link>
			<Link
				href={'/projects'}
				className={`${linkClassName} border-b border-white text-sm font-medium uppercase leading-6 text-primaryBlack hover:text-blue`}
			>
				{t('projects')}
			</Link>
			<Link
				href={'/admin/rounds/create'}
				className={`${linkClassName} border-b border-white text-sm font-medium uppercase leading-6 text-primaryBlack hover:text-blue`}
			>
				{t('myContribution')}
			</Link>
			<Link
				href={'/11155111/projects/create'}
				className={`${linkClassName} border-b border-white text-sm font-medium uppercase leading-6 text-primaryBlack hover:text-blue`}
			>
				{t('results')}
			</Link>
		</nav>
	);
}

'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

export default function Navigation({ screen }: { screen: string }) {
	const t = useTranslations('navigation');
	const pathname = usePathname();

	const navClassName =
		screen === 'mobile' ? 'flex-column flex-wrap flex gap-8' : 'flex gap-8';

	const linkClassName =
		screen === 'mobile'
			? 'mt-2 w-full border-b-0 text-lg border-b border-borderGreen px-1 pb-1 font-medium uppercase leading-6 text-white hover:text-green'
			: 'border-b-2 border-borderGreen px-1 pb-1 text-sm font-medium uppercase leading-6 text-primaryBlack hover:text-green';

	return (
		<nav className={navClassName}>
			<Link
				href={'/'}
				className={`${linkClassName} ${
					pathname === '/'
						? 'border-borderGreen text-primaryBlack'
						: 'border-white text-primaryBlack'
				}`}
			>
				{t('home')}
			</Link>
			<Link
				href={'/projects'}
				className={`${linkClassName} ${
					pathname === '/projects'
						? 'border-borderGreen text-primaryBlack'
						: 'border-white text-primaryBlack'
				}`}
			>
				{t('projects')}
			</Link>
			<Link
				href={'/admin/rounds/create'}
				className={`${linkClassName} ${
					pathname === '/admin/rounds/create'
						? 'border-borderGreen text-primaryBlack'
						: 'border-white text-primaryBlack'
				}`}
			>
				{t('myContribution')}
			</Link>
			<Link
				href={'/11155111/projects/create'}
				className={`${linkClassName} ${
					pathname === '/11155111/projects/create'
						? 'border-borderGreen text-primaryBlack'
						: 'border-white text-primaryBlack'
				}`}
			>
				{t('results')}
			</Link>
		</nav>
	);
}

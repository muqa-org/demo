'use client'
import Image from 'next/image';
import Link from 'next/link';

import icons from '../common/Icons';
import { Button } from '../Button';

async function setLang(lang: string) {
	const body = { lang };
	await fetch('/api/locale', { method: 'POST', body: JSON.stringify(body) });
	location.reload();
}

function LocaleButton({lang }: { lang: 'en' | 'hr' }) {
	const flag = lang === 'en' ? '🇬🇧' : '🇭🇷';
	return (
		<Button
				onClick={() => setLang(lang)}
				className='text-sm px-3 py-1 text-primaryBlack bg-transparent hover:bg-primaryBlack hover:text-white'
			>
				{lang.toUpperCase()} {flag}
			</Button>
	);
}

export default function FooterLinks() {
	return (
		<div className='flex items-center gap-10'>
			<Link
				href='/'
				className='flex items-center gap-2 font-medium leading-6 text-primaryBlack hover:text-blue'
			>
				Documentation
				<Image
					width='20'
					height='20'
					alt='Top Right Arrow'
					src={icons.topRightArrowIcon}
				/>
			</Link>
			<Link
				href='/'
				className='flex items-center gap-2 font-medium leading-6 text-primaryBlack hover:text-blue'
			>
				About Quadratic Funding
				<Image
					width='18'
					height='18'
					alt='Top Right Arrow'
					src={icons.topRightArrowIcon}
				/>
			</Link>
			<div className="lang flex items-center gap-2 text-sm leading-6">
				<LocaleButton lang='hr' />
				<LocaleButton lang='en' />
			</div>
		</div>
	);
}

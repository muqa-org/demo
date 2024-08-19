'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

import icons from '@/app/components/common/Icons';

export default function LanguageSwitcher() {
	const t = useTranslations('languages');
	const locale = useLocale();

	const [isOpen, setIsOpen] = useState(false);

	const languages = [
		{ code: 'en', label: t('en') },
		{ code: 'hr', label: t('hr') },
	];

	const toggleDropdown = () => setIsOpen(!isOpen);

	const setLang = async (lang: string) => {
		const body = { lang };
		await fetch('/api/locale', { method: 'POST', body: JSON.stringify(body) });
		location.reload();
	};

	return (
		<div className='relative inline-block text-left'>
			<button
				onClick={toggleDropdown}
				className='border-green inline-flex items-center justify-center rounded-md border px-3 py-2 text-base font-normal text-green focus:outline-none'
			>
				{locale.toUpperCase()}
				<Image
					width='13'
					height='8'
					alt='Arrow Down Icon'
					src={icons.arrowDownIconGreen}
					className='ml-2'
				/>
			</button>
			{isOpen && (
				<div className='w-30 border-borderGreen absolute right-0 mt-2 origin-top-right rounded-md border bg-white shadow-lg'>
					<div className='py-1'>
						{languages.map(lang => (
							<button
								key={lang.code}
								onClick={() => setLang(lang.code)}
								className={`block px-4 py-2 text-sm ${
									locale === lang.code ? 'text-green' : 'text-primaryBlack'
								} hover:text-green`}
							>
								{lang.label}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

import icons from '@/app/components/common/Icons';

import Container from '@/app/components/Container';
import Navigation from '@/app/components/Navigation';
import LanguageSwitcher from '@/app/components/LanguageSwitcher';

import { CodaFormProjectLink } from '@/app/config';
import { MuqaConnectButton } from './components/MuqaConnectButton';
import { useSession } from 'next-auth/react';

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const { data: session } = useSession();

	const t = useTranslations('navigation');

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	if (session) {
		console.log(`Signed in as ${session.user?.name}`);
	} else {
		console.log('Not signed in');
	}

	return (
		<header className='border-b border-borderGray bg-white'>
			<div className='mx-auto flex items-center justify-between px-5 py-5'>
				<button className='text-2xl md:hidden' onClick={toggleMenu}>
					<Image width='24' height='18' alt='Menu Icon' src={icons.menuIcon} />
				</button>
				<div className='hidden md:flex'>
					<Navigation screen='desktop' />
				</div>

				<div className='ml-auto flex items-center justify-end'>
					<div className='mr-4 hidden md:block'>
						<LanguageSwitcher screen='desktop' />
					</div>
					{process.env.NODE_ENV === 'development' && (
						<MuqaConnectButton className='mx-4 rounded-md bg-blue px-10 py-[0.55em]' />
					)}
					<Link
						href={CodaFormProjectLink}
						target='_blank'
						className='rounded-md bg-green px-10 py-[0.55em] text-base font-normal text-white hover:opacity-85'
					>
						{t('propose')}
					</Link>
				</div>
			</div>
			<div
				className={`${
					isOpen ? 'block' : 'hidden'
				} absolute left-0 top-0 h-full w-full md:hidden`}
			>
				<div className='flex h-full w-full flex-row'>
					<div className='h-full w-3/4 bg-green p-7'>
						<LanguageSwitcher screen='mobile' />
						<Navigation screen='mobile' />
					</div>
					<button
						onClick={toggleMenu}
						className='flex h-full w-1/4 flex-col items-center justify-start bg-black bg-opacity-80 p-7'
					>
						<Image
							width='24'
							height='18'
							alt='Menu Icon'
							src={icons.closeIconGray}
						/>
					</button>
				</div>
			</div>
		</header>
	);
}

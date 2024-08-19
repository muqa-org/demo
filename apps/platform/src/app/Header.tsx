'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import icons from '@/app/components/common/Icons';

import { MuqaConnectButton } from '@/app/components/MuqaConnectButton';
import Container from '@/app/components/Container';
import { usePathname } from 'next/navigation';
import Navigation from '@/app/components/Navigation';
import LanguageSwitcher from '@/app/components/LanguageSwitcher';

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);

	const t = useTranslations('navigation');
	const pathname = usePathname();

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<header className='border-b border-borderGray'>
			<Container className='mx-auto flex items-center justify-between px-5 py-5'>
				<button className='text-2xl md:hidden' onClick={toggleMenu}>
					<Image width='24' height='18' alt='Menu Icon' src={icons.menuIcon} />
				</button>
				<div className='hidden md:flex'>
					<Navigation />
				</div>

				<div className='ml-auto flex items-center justify-end'>
					<div className='hidden md:block'>
						<LanguageSwitcher />
					</div>
					<MuqaConnectButton variant='green' className='ml-4' />
				</div>
			</Container>
			<div
				className={`${
					isOpen ? 'block' : 'hidden'
				} absolute left-0 top-0 h-full w-full md:hidden`}
			>
				<div className='flex h-full w-full flex-row'>
					<div className='h-full w-2/3 bg-green p-7'>
						<LanguageSwitcher />
						<Navigation
							navClassName='flex-column flex-wrap'
							linkClassName='mt-2 w-full border-b-0 text-lg text-white'
						/>
					</div>
					<div className='h-full w-1/3 bg-green p-7'></div>
				</div>
			</div>
		</header>
	);
}

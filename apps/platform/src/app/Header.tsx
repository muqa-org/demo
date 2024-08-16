'use client';

import { useTranslations } from 'next-intl';

import { MuqaConnectButton } from '@/app/components/MuqaConnectButton';
import Container from '@/app/components/Container';
import { usePathname } from 'next/navigation';

export default function Header() {
	const t = useTranslations('navigation');
	const pathname = usePathname();

	return (
		<header className='border-b border-borderGray'>
			<Container className='mx-auto flex items-center justify-between px-5 py-5'>
				<button className='text-2xl md:hidden' onClick={toggleMenu}>
					☰
				</button>
				<div className='hidden md:flex'>
					<Navigation />
				</div>

				<div className='ml-auto'>
					<MuqaConnectButton variant='green' />
				</div>
			</Container>
			<div
				className={`${
					isOpen ? 'block' : 'hidden'
				} absolute left-0 top-0 h-full w-2/3 bg-green p-7 md:hidden`}
			>
				<Navigation
					navClassName='flex-column flex-wrap'
					linkClassName='mt-2 w-full border-b-0 text-lg text-white'
				/>
			</div>
		</header>
	);
}

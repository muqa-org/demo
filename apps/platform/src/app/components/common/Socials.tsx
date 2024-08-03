import Image from 'next/image';
import Link from 'next/link';

import icons from './Icons';

export function Socials() {
	return (
		<div className='mb-6 flex items-center gap-6 lg:mb-0'>
			<Link href='/' className='hover:opacity-85'>
				<Image width='20' height='20' alt='X logo' src={icons.XLogo} />
			</Link>
			<Link href='/' className='hover:opacity-85'>
				<Image
					width='22'
					height='22'
					alt='Telegram logo'
					src={icons.TelegramLogo}
				/>
			</Link>
			<Link href='/' className='hover:opacity-85'>
				<Image
					width='23'
					height='23'
					alt='GitHub logo'
					src={icons.GithubLogo}
				/>
			</Link>
			<Link href='/' className='hover:opacity-85'>
				<Image
					width='24'
					height='24'
					alt='Discord logo'
					src={icons.DiscordLogo}
				/>
			</Link>
		</div>
	);
}

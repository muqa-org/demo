import Image from 'next/image';
import Link from 'next/link';

export function Socials() {
	return (
		<div className='items-center flex gap-6'>
			<Link href='/' className='hover:opacity-85'>
				<Image
					width='20'
					height='20'
					alt='X logo'
					src={`/images/icons/socials/icon-x.svg`}
				/>
			</Link>
			<Link href='/' className='hover:opacity-85'>
				<Image
					width='22'
					height='22'
					alt='Telegram logo'
					src={`/images/icons/socials/icon-telegram.svg`}
				/>
			</Link>
			<Link href='/' className='hover:opacity-85'>
				<Image
					width='23'
					height='23'
					alt='GitHub logo'
					src={`/images/icons/socials/icon-github.svg`}
				/>
			</Link>
			<Link href='/' className='hover:opacity-85'>
				<Image
					width='24'
					height='24'
					alt='Discord logo'
					src={`/images/icons/socials/icon-discord.svg`}
				/>
			</Link>
		</div>
	);
}

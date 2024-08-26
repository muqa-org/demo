'use client';

import Image from 'next/image';

import icons from '@/app/components/common/Icons';

export default function ProjectSocialIcons({
	url,
	title,
}: {
	url: string;
	title: string;
}) {
	const shareOnFacebook = () => {
		const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
		window.open(facebookUrl, '_blank', 'noopener,noreferrer');
	};

	const shareOnTwitter = () => {
		const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
		window.open(twitterUrl, '_blank', 'noopener,noreferrer');
	};

	return (
		<div className='mt-4 flex space-x-4'>
			<button
				onClick={shareOnFacebook}
				className='flex items-center rounded bg-[#3D56A2] px-16 py-[6px] hover:opacity-85'
			>
				<Image
					src={icons.FacebookLogo}
					alt='Facebook'
					width={20}
					height={20}
					className='mx-2 my-1'
				/>
			</button>

			<button
				onClick={shareOnTwitter}
				className='flex items-center rounded bg-[#439BD7] px-16 py-[6px] hover:opacity-85'
			>
				<Image
					src={icons.XLogoWhite}
					alt='Twitter'
					width={19}
					height={19}
					className='mx-2 my-1'
				/>
			</button>
		</div>
	);
}

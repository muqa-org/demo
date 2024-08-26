import Image from 'next/image';
import { useTranslations } from 'next-intl';

import icons from '@/app/components/common/Icons';

interface AddButtonProps {
	className?: string;
	variant: 'icon' | 'text';
}

export default function AddToCart({ className, variant }: AddButtonProps) {
	const t = useTranslations('cart');
	return (
		<button className={`${className}`}>
			{variant === 'icon' ? (
				<Image
					src={icons.cartIconGreen}
					alt='Add to cart'
					width={18}
					height={15}
					className='mx-2 my-1'
				/>
			) : (
				<span className='flex flex-row items-center justify-between rounded-md bg-green px-5 py-3 text-base text-white hover:opacity-85'>
					<span>
						<Image
							src={icons.cartIconWhite}
							alt='Add to cart'
							width={18}
							height={15}
							className='mr-4'
						/>
					</span>
					{t('addCart')}
				</span>
			)}
		</button>
	);
}

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Noto_Sans } from 'next/font/google';

import icons from '@/app/components/common/Icons';
import { FundedApplication } from '@allo/kit';
import { useCart } from '@/lib/util/context/cart.context';

const notoSans = Noto_Sans({
	subsets: ['latin'],
	weight: ['400'],
	style: ['normal'],
	display: 'swap',
});

interface AddButtonProps {
	application: FundedApplication
	className?: string;
	variant: 'icon' | 'text';
}


export default function AddToCart({ application, className, variant }: AddButtonProps) {
	const t = useTranslations('cart');
	const { addItem } = useCart();

	const addToCart = () => {
		addItem(application);
	}

	return (
		<button className={`${className} ${notoSans.className}`} onClick={addToCart}>
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

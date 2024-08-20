import Image from 'next/image';

import icons from '@/app/components/common/Icons';

interface AddButtonProps {
	className?: string;
	variant: 'icon' | 'text';
}

export default function AddToCart({ className, variant }: AddButtonProps) {
	return (
		<button
			className={`${className} px-2 py-1 text-sm font-medium text-primaryBlack hover:bg-gray-100 focus:outline-none`}
		>
			{variant === 'icon' ? (
				<Image
					src={icons.cartIconGreen}
					alt='Add to cart'
					width={18}
					height={15}
				/>
			) : (
				<span>Add to Cart</span>
			)}
		</button>
	);
}

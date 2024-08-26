import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Noto_Sans } from 'next/font/google';

import Container from '@/app/components/Container';
import CartProjectCard from '@/app/components/cart/CartProjectCard';

import icons from '@/app/components/common/Icons';

const notoSans = Noto_Sans({
	subsets: ['latin'],
	weight: ['400'],
	style: ['normal'],
	display: 'swap',
});

export default function Cart() {
	const t = useTranslations('cart');

	// TODO: Replace with actual data
	const items = [
		{
			id: 1,
			name: 'Klupe od Đardina do Jokera',
			funded: 76,
			fundedAmont: 2000,
			amount: 10,
			image: 'https://picsum.photos/150/95',
		},
		{
			id: 2,
			name: 'Klupe od Đardina do Jokera',
			funded: 55,
			fundedAmont: 2000,
			amount: 20,
			image: 'https://picsum.photos/150/95',
		},
		{
			id: 3,
			name: 'Klupe od Đardina do Jokera',
			funded: 10,
			fundedAmont: 2000,
			amount: 10,
			image: 'https://picsum.photos/150/95',
		},
	];

	return (
		<section className='py-4 pb-32'>
			<Container className='mx-auto mb-6 flex flex-wrap justify-between gap-1 px-5 py-5 lg:gap-10'>
				<h1 className='w-full pb-4 pt-4 text-center text-[28px] font-normal leading-normal text-primaryBlack md:text-4xl lg:border-b lg:border-borderGrayLight lg:pb-10 lg:pt-10 lg:text-left'>
					{t('selectedProjects')}
				</h1>
				<div className='mt-4 flex w-full flex-row flex-wrap justify-between'>
					<div className='mb-8 flex w-full flex-col gap-4 lg:mb-0 lg:w-4/6'>
						{items.map(item => (
							<CartProjectCard key={item.id} item={item} />
						))}
						<button className='ml-5 mt-10 hidden self-start text-sm text-primaryBlack underline hover:text-gray lg:inline-block'>
							{t('removeAllProjects')}
						</button>
					</div>

					<div className='w-full pl-0 lg:w-2/6 lg:pl-24'>
						<div className='mb-10'>
							<h2 className='text-base font-normal text-gray'>
								{t('totalAmount')}
							</h2>
							<p className='mt-8 text-[32px] font-normal text-primaryBlack'>
								€ 30
							</p>
						</div>
						<p className='mb-7 text-xs italic text-gray'>
							<span className='flw-row flex items-start justify-start gap-1'>
								<Image
									src={icons.alertIcon}
									alt='Alert Icon'
									width={16}
									height={16}
								/>
								<span>{t('finalSubmission')}</span>
							</span>
						</p>
						<button className='flex flex-row items-center justify-between rounded-md bg-green px-5 py-3 text-base text-white hover:opacity-85'>
							<Image
								src={icons.cartIconWhite}
								alt={t('checkout')}
								width={18}
								height={15}
								className='mr-4'
							/>
							<span className={notoSans.className}>{t('checkout')}</span>
						</button>
					</div>
				</div>
			</Container>
		</section>
	);
}

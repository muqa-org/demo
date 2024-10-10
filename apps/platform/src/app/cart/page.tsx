'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Noto_Sans } from 'next/font/google';

import Container from '@/app/components/Container';
import CartProjectCard from '@/app/components/cart/CartProjectCard';

import icons from '@/app/components/common/Icons';
import { useCart } from '@/lib/util/context/cart.context';
import { comethConfig, Donate, Donation } from '@allo/kit';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const notoSans = Noto_Sans({
	subsets: ['latin'],
	weight: ['400'],
	style: ['normal'],
	display: 'swap',
});

const roundId = process.env.NEXT_PUBLIC_ROUND_ID ?? '3';

export default function Cart() {
	const t = useTranslations('cart');

	const { items, clearCart, totalAmount } = useCart();

	// TODO: get these from actual data
	// const { chain } = comethConfig;
  // const { data: applications } = useApplications({
  //   where: {
  //     roundId: { equals: roundId },
  //     status: { equals: 'APPROVED' },
  //     chainId: { equals: chain.id },
  //   },
  // });

	const [donations, setDonations] = useState<Donation[]>([]);

	useEffect(() => {
		const donations = items.map(item => ({
			recipientAddress: item.project.recipient,
			amount: BigInt(item.amount)
		}));
		setDonations(donations);
	}, [items]);


	return (
		<section className='py-4 pb-32'>
			<Container className='mx-auto mb-6 flex flex-wrap justify-between gap-1 px-5 py-5 lg:gap-10'>
				{items.length === 0 && (
					<div className="w-full text-center py-10">
						<h2 className="text-2xl font-semibold text-gray-700 mb-4">
							{t('emptyCart')}
						</h2>
						<p className="text-gray-500 mb-6">
							{t('emptyCartDescription')}
						</p>
						<Link href="/projects" className="inline-block bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors">
							{t('browseProjects')}
						</Link>
					</div>
				)}
				{items.length !== 0 && (
					<>
						<h1 className='w-full pb-4 pt-4 text-center text-[28px] font-normal leading-normal text-primaryBlack md:text-4xl lg:border-b lg:border-borderGrayLight lg:pb-10 lg:pt-10 lg:text-left'>
							{t('selectedProjects')}
						</h1>
						<div className='mt-4 flex w-full flex-row flex-wrap justify-between'>
							<div className='mb-8 flex w-full flex-col gap-4 lg:mb-0 lg:w-4/6'>
								{items.map(item => (
									<CartProjectCard key={item.project.id} item={item} />
									))}
									<button
										onClick={clearCart}
										className='ml-5 mt-10 hidden self-start text-sm text-primaryBlack underline hover:text-gray lg:inline-block'>
										{t('removeAllProjects')}
									</button>
							</div>
							<div className='w-full pl-0 lg:w-2/6 lg:pl-24'>
								<div className='mb-10'>
									<h2 className='text-base font-normal text-gray'>
										{t('totalAmount')}
									</h2>
									<p className='mt-8 text-[32px] font-normal text-primaryBlack'>
										€ {totalAmount}
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
								<Donate donations={donations}>
									<Image
										src={icons.cartIconWhite}
										alt={t('checkout')}
										width={18}
										height={15}
										className='mr-4'
									/>
									<span className={notoSans.className}>{t('checkout')}</span>
								</Donate>
							</div>
						</div>
					</>
				)}
			</Container>
		</section>
	);
}

'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import Container from '@/app/components/Container';
import icons from '@/app/components/common/Icons';
import { useState } from 'react';

import { CodaFormProjectLink } from '@/app/config';

const NotificationBar = ({ message }: { message: string }) => {
	const t = useTranslations('home');

	const [isShown, toggleNotification] = useState(true);

	if (!isShown) return null;

	return (
		<div className='bg-[#6AFCAD]'>
			<Container className='mx-auto flex items-center justify-between px-5 py-5'>
				<span className='font-normal leading-normal text-black'>
					{t.rich('notification', {
						guidelines: chunks => <a href={CodaFormProjectLink} target='_blank'>{chunks}</a>,
					})}
				</span>
				<button>
					<Image
						width='16'
						height='16'
						alt='Close Icon'
						src={icons.closeIcon}
						onClick={() => toggleNotification(false)}
						className='hover:opacity-50'
					/>
				</button>
			</Container>
		</div>
	);
};
export default NotificationBar;

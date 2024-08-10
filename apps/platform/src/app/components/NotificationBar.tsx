import Image from 'next/image';
import { useTranslations } from 'next-intl';

import icons from '@/app/components/common/Icons';

const NotificationBar = ({ message }: { message: string }) => {
	const t = useTranslations('home');

	return (
		<div className='bg-[#6AFCAD]'>
			<div className='mx-auto flex items-center justify-between px-5 py-5 xl:max-w-7xl xl:px-0 2xl:max-w-[1440px] 2xl:px-0'>
				<span className='font-normal leading-normal text-black'>
					{t(message)}
				</span>
				<button>
					<Image
						width='16'
						height='16'
						alt='Close Icon'
						src={icons.closeIcon}
						className='hover:opacity-50'
					/>
				</button>
			</div>
		</div>
	);
};

export default NotificationBar;

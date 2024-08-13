import images from '@/app/components/common/Images';

const Banner = ({
	message,
	buttonText,
}: {
	message: string;
	buttonText: string;
}) => {
	return (
		<div
			className='flex items-center justify-between rounded-[30px] bg-cover bg-center bg-no-repeat px-12 py-8'
			style={{ backgroundImage: `url(${images.bannerBg})` }}
		>
			<h2 className='text-4xl font-normal text-white'>{message}</h2>
			<button className='rounded-md bg-white px-4 py-2 text-base font-normal text-green shadow-md hover:bg-green-50'>
				{buttonText}
			</button>
		</div>
	);
};

export default Banner;

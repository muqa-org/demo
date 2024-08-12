import images from '@/app/components/common/Images';

const Banner = ({ message }: { message: string }) => {
	return (
		<div
			className='fle flex items-center justify-between bg-cover bg-center bg-no-repeat py-8 px-12 rounded-[30px]'
			style={{ backgroundImage: `url(${images.bannerBg})` }}
		>
			<h2 className='text-4xl font-normal text-white'>{message}</h2>
			<button className='rounded-md bg-white px-4 py-2 font-normal text-base text-[#39A56A] shadow-md hover:bg-green-50'>
				Propose a project
			</button>
		</div>
	);
};

export default Banner;

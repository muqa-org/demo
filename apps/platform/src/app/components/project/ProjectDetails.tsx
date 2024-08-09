import Image from 'next/image';
import Link from 'next/link';

import RemoveFromCart from '@/app/components/cart/RemoveFromCart';
import AddToCartAmount from '@/app/components/cart/AddToCartAmount';
import icons from '@/app/components/common/Icons';
import images from '@/app/components/common/Images';

interface ProjectCardProps {
	className?: string;
}

export default function ProjectDetails({ className }: ProjectCardProps) {
	return (
		<div className={`${className} flex h-full w-full flex-col justify-between`}>
			<div className='relative'>
				<Image
					width='1028'
					height='221'
					src='https://picsum.photos/1028/221?grayscale'
					alt='Project Image'
					className='w-full rounded-xl'
				/>
				<div className='absolute -bottom-[42px] left-6 top-auto h-[112px] w-[112px] overflow-hidden rounded-full border border-lightGray bg-white shadow-[0_8px_18px_rgba(0,0,0,0.08),0_0px_1px_rgba(0,0,0,0.05)]'>
					<Image
						width='110'
						height='110'
						src='https://picsum.photos/110/110?grayscale'
						alt='Project Image Badge'
						className='border-white rounded-full border'
					/>
				</div>
			</div>
			<div className='mt-16 flex flex-row items-center justify-between'>
				<h1 className='text-[34px] font-medium leading-normal text-primaryBlack'>
					NAZIV PROJEKTA
				</h1>
				<div className='flex items-center justify-between gap-1'>
					<RemoveFromCart className='mr-4' />
					<AddToCartAmount />
				</div>
			</div>
			<div className='g-4 my-8 flex flex-row flex-wrap border-b border-t border-borderGray pb-3 pt-7'>
				<Link
					href='/'
					className='mb-4 flex w-2/5 flex-row items-center text-base font-medium text-blue hover:text-primaryBlack'
				>
					<Image
						width='19'
						height='20'
						alt='ETH Icon'
						src={icons.ethIconBlue}
						className='mr-2'
					/>{' '}
					0x605290...42cd114ae
				</Link>
				<Link
					href='/'
					className='mb-4 flex w-2/5 flex-row items-center text-base font-medium text-blue hover:text-primaryBlack'
				>
					<Image
						width='17'
						height='18'
						alt='ETH Icon'
						src={icons.XLogoBlue}
						className='mr-2'
					/>{' '}
					projectname
				</Link>
				<Link
					href='/'
					className='mb-4 flex w-2/5 flex-row items-center text-base font-medium text-blue hover:text-primaryBlack'
				>
					<Image
						width='19'
						height='20'
						alt='ETH Icon'
						src={icons.globeIcon}
						className='mr-2'
					/>{' '}
					projectname.com
				</Link>
				<Link
					href='/'
					className='mb-4 flex w-2/5 flex-row items-center text-base font-medium text-blue hover:text-primaryBlack'
				>
					<Image
						width='18'
						height='19'
						alt='ETH Icon'
						src={icons.GithubLogoBlue}
						className='mr-2'
					/>{' '}
					projectname
				</Link>
			</div>
			<h2 className='mb-5 text-xl font-bold leading-normal text-primaryBlack'>
				IMPACT STATEMENTS
			</h2>
			<h3 className='mb-5 text-lg font-bold leading-normal text-primaryBlack'>
				CONTRIBUTIONS
			</h3>
			<div className='mb-5 text-lg font-normal leading-normal text-gray'>
				Lorem ipsum dolor sit amet consectetur. Maecenas etiam dictum tellus
				egestas amet cum sed egestas. Elit at aliquet auctor massa pellentesque.
				Sed maecenas est turpis morbi tortor. Sollicitudin quam ultrices velit
				adipiscing sem. Tincidunt integer tempor enim vitae. Dui morbi vulputate
				felis risus enim purus. Nunc venenatis etiam nisi venenatis facilisi
				posuere malesuada convallis.
			</div>
			<h4 className='text-lightBlack mb-1 text-sm font-medium leading-normal'>
				CONTRIBUTION LINKS
			</h4>
			<div className='mb-7'>
				<Link
					href='/'
					className='flex flex-row items-center text-base font-normal text-blue hover:text-primaryBlack'
				>
					<Image
						width='12'
						height='12'
						alt='ETH Icon Small'
						src={icons.ethIconBlue12}
						className='mr-2'
					/>
					<span>Contribution link name</span>
					<Image
						width='16'
						height='16'
						alt='Arrow Icon Top Right'
						src={icons.arrowTopRight16Icon}
						className='mr-2'
					/>
				</Link>
			</div>
			<h3 className='mb-5 text-lg font-bold leading-normal text-primaryBlack'>
				IMPACT
			</h3>
			<div className='mb-5 text-lg font-normal leading-normal text-gray'>
				Lorem ipsum dolor sit amet consectetur. Maecenas etiam dictum tellus
				egestas amet cum sed egestas. Elit at aliquet auctor massa pellentesque.
				Sed maecenas est turpis morbi tortor. Sollicitudin quam ultrices velit
				adipiscing sem. Tincidunt integer tempor enim vitae. Dui morbi vulputate
				felis risus enim purus. Nunc venenatis etiam nisi venenatis facilisi
				posuere malesuada convallis.
			</div>
			<h4 className='text-lightBlack mb-1 text-sm font-medium leading-normal'>
				IMPACT METRICS LINKS
			</h4>
			<div className='mb-7'>
				<Link
					href='/'
					className='flex flex-row items-center text-base font-normal text-blue hover:text-primaryBlack'
				>
					<span>Impact metrics link name - 13k</span>
					<Image
						width='16'
						height='16'
						alt='Arrow Icon Top Right'
						src={icons.arrowTopRight16Icon}
						className='mr-2'
					/>
				</Link>
			</div>
			<h3 className='mb-5 text-lg font-bold leading-normal text-primaryBlack'>
				PAST GRANTS AND FUNDING
			</h3>
			<div className='w-full text-lg font-normal leading-normal text-gray'>
				<div className='flex flex-row items-center'>
					<span>Funding source name</span>
					<Image
						width='30'
						height='2'
						alt='Line blue'
						src={images.lineBlue}
						className='mx-2'
					/>
					<span className='inline-block pr-2 text-sm font-medium uppercase text-grayLight'>
						Grants
					</span>
					<span className='text-lg font-normal text-grayLight'>2000 USD</span>
				</div>
			</div>
		</div>
	);
}

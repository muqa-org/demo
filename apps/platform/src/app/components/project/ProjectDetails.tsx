import Image from 'next/image';
import { useTranslations } from 'next-intl';

import ProjectSidebar from '@/app/components/project/ProjectSidebar';
import ProjectMap from '@/app/components/project/ProjectMap';
import ProjectSocialIcons from '@/app/components/project/ProjectSocialIcons';

import { getProjectProgressBGColor } from '@/app/helpers/projectHelper';

interface ProjectCardProps {
	className?: string;
}

export default function ProjectDetails({ className }: ProjectCardProps) {
	let progressColor = getProjectProgressBGColor(68);
	const t = useTranslations('project');

	return (
		<div
			className={`${className} flex h-full w-full flex-col flex-wrap justify-between`}
		>
			<h1 className='w-full border-b border-borderGrayLight pb-10 pt-10 text-[28px] font-normal leading-normal text-primaryBlack md:text-4xl'>
				Klupe od Đardina do Jokera
			</h1>
			<div className='flex flex-row flex-wrap justify-between pb-8 pt-14 lg:pb-0'>
				<div className='w-full lg:w-4/6'>
					<Image
						width='1028'
						height='221'
						src='https://picsum.photos/908/514'
						alt='Project Image'
						className='w-full rounded-t-xl lg:rounded-xl'
					/>
					<div className='mb-4 h-2 w-full rounded-b bg-[#E2E2E2] lg:hidden'>
						<div
							className={`h-full rounded-b ${progressColor}`}
							style={{ width: `${68}%` }}
						></div>
					</div>
				</div>
				<div className='w-full lg:w-2/6 lg:pl-20'>
					<ProjectSidebar />
				</div>
			</div>
			<div className='w-full lg:w-4/6'>
				<ProjectMap />
			</div>
			<div className='content mt-6 w-full text-base text-grayDark lg:w-4/6'>
				<p>
					A new voting mechanism is used, called Quadratic Funding. The project
					with most donations will get the most funding from the City. It allows
					anyone to vote by donating money to their favourite projects. With
					every donation, funding is given to project from the matching pool. A
					new voting mechanism is used, called Quadratic Funding. The project
					with most donations will get the most funding from the City.
				</p>
				<p>
					It allows anyone to vote by donating money to their favourite
					projects. With every donation, funding is given to project from the
					matching pool.
				</p>
			</div>
			<div className='mb-6 mt-14 w-full lg:w-4/6'>
				<h3>{t('supportProject')}</h3>
				<ProjectSocialIcons
					url='https://slobodnadalmacija.hr'
					title='Klupe od Đardina do Jokera'
				/>
			</div>
		</div>
	);
}

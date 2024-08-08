import ProjectsSidebarFinish from '@/app/components/projects/ProjectsSidebarFinish';
import ProjectsSidebarPhases from '@/app/components/projects/ProjectsSidebarPhases';
import ProjectsSidebarsUserDonations from '@/app/components/projects/ProjectsSidebarsUserDonations';

import { RoundData } from '@/app/types/round';

export default function ProjectsSidebar({ round }: { round: RoundData }) {
	return (
		<div className='w-1/4'>
			<div className='rounded-lg border border-lightGray p-5 pb-1.5 shadow-[0_8px_18px_rgba(0,0,0,0.08),0_0px_1px_rgba(0,0,0,0.05)]'>
				<h3 className='font-sans text-base font-normal uppercase leading-[150%] text-gray'>
					Natječaj
				</h3>
				<h2 className='text-2xl font-normal uppercase text-primaryBlack'>
					{round.title}
				</h2>
				<ProjectsSidebarFinish round={round} />
				<ProjectsSidebarPhases round={round} />
			</div>
			<ProjectsSidebarsUserDonations />
		</div>
	);
}

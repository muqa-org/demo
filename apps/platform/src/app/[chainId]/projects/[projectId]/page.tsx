
import ProjectsSidebar from '@/app/components/projects/ProjectsSidebar';
import ProjectDetails from '@/app/components/project/ProjectDetails';

import { RoundData } from '@/app/types/round';



const roundData: RoundData = {
	title:
		'NATJEČAJ ZA KAZALIŠNU, GLAZBENO-SCENSKU I KONCERTNU DJELATNOST ZA 2025. GODINU',
	endDate: '2024-09-08T13:00:00.000Z',
};

export default function ProjectPage({
  params: { chainId = 0, projectId = '' },
}) {
  return (
    <section className='py-4'>
			<div className='mx-auto flex gap-10 justify-between px-5 py-5 mb-6 xl:max-w-7xl xl:px-0 2xl:max-w-[1440px] 2xl:px-0'>
				<ProjectsSidebar round={roundData} />
				<ProjectDetails />
			</div>
		</section>
  );
}

// import { ProjectDetails } from '@allo/kit';

// export default function ProjectPage({
//   params: { chainId = 0, projectId = '' },
// }) {
//   return (
//     <section className="space-y-8">
//       <ProjectDetails id={projectId} opts={{ chainId }} />
//     </section>
//   );
// }

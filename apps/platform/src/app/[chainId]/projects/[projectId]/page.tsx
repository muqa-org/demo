import prisma from '@muqa/db';

import Container from '@/app/components/Container';
import ProjectDetails from '@/app/components/project/ProjectDetails';
import ProjectsSidebar from '@/app/components/projects/ProjectsSidebar';
import { RoundData } from '@/app/types/round';

const roundData: RoundData = {
	title:
		'NATJEČAJ ZA KAZALIŠNU, GLAZBENO-SCENSKU I KONCERTNU DJELATNOST ZA 2025. GODINU',
	endDate: '2024-09-08T13:00:00.000Z',
	phases: [],
};

export default async function ProjectPage({
	params: { chainId = 0, projectId = '' },
}) {
	roundData.phases = await prisma.roundPhase.findMany({
		orderBy: {
			startDate: 'asc',
		},
	});

	return (
		<section className='py-4'>
			<Container className='mx-auto flex gap-10 justify-between px-5 py-5 mb-6'>
				<ProjectsSidebar round={roundData} />
				<ProjectDetails />
			</Container>
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

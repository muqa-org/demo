import ProjectCard from '@/app/components/project/ProjectCard';
import Pagination from '@/app/components/Pagination';

export default function ProjectListTable() {
	return (
		<div className='flex flex-col gap-4'>
			<div className='w-3/4'>
				<div className='mt-10 grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
					<ProjectCard className='mb-5' />
					<ProjectCard className='mb-5' />
					<ProjectCard className='mb-5' />
					<ProjectCard className='mb-5' />
					<ProjectCard className='mb-5' />
					<ProjectCard className='mb-5' />
					<ProjectCard className='mb-5' />
					<ProjectCard className='mb-5' />
					<ProjectCard className='mb-5' />
					<ProjectCard className='mb-5' />
					<ProjectCard className='mb-5' />
					<ProjectCard className='mb-5' />
				</div>
				<div>
					<Pagination
						currentPage={2}
						totalPages={10}
						baseLink='/projects'
						maxVisiblePages={5}
					/>
				</div>
			</div>
		</div>
	);
}

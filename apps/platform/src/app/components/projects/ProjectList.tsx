import ProjectCard from '@/app/components/project/ProjectCard';
import Pagination from '@/app/components/Pagination';
import ProjectsSidebar from '@/app/components/projects/ProjectsSidebar';

export default function ProjectListTable() {
	return (
		<div className='mt-2 flex flex-row flex-wrap'>
			<div className='order-2 w-full lg:order-1 lg:w-5/6'>
				<div className='grid w-full grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3'>
					<ProjectCard progressPercentage={20} className='mb-5' />
					<ProjectCard progressPercentage={50} className='mb-5' />
					<ProjectCard progressPercentage={75} className='mb-5' />
					<ProjectCard progressPercentage={10} className='mb-5' />
					<ProjectCard progressPercentage={30} className='mb-5' />
					<ProjectCard progressPercentage={45} className='mb-5' />
					<ProjectCard progressPercentage={88} className='mb-5' />
					<ProjectCard progressPercentage={38} className='mb-5' />
					<ProjectCard progressPercentage={90} className='mb-5' />
					<ProjectCard progressPercentage={85} className='mb-5' />
					<ProjectCard progressPercentage={32} className='mb-5' />
					<ProjectCard progressPercentage={15} className='mb-5' />
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
			<div className='order-1 mb-10 w-full pl-0 lg:order-2 lg:w-1/6 lg:pl-2 xl:pl-16'>
				<ProjectsSidebar />
			</div>
		</div>
	);
}
